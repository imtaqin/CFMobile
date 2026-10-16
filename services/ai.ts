import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { logError } from './error-log';

/**
 * All AI calls go through our own Hono worker on Cloudflare, never straight to
 * an LLM provider: the provider key stays server-side and the worker enforces
 * the monthly quota tied to the user's Play subscription.
 */
const BASE_URL =
  (Constants.expoConfig?.extra as any)?.aiBaseUrl ?? 'https://cfmobile-ai.imtaqin.id';

export interface AiQuota {
  used: number;
  limit: number;
  resetsAt: string | null;
  tier: 'free' | 'pro';
}

export interface AuditFinding {
  severity: 'critical' | 'warning' | 'info' | 'ok';
  title: string;
  detail: string;
  action: string;
  /** One zone setting that resolves this finding, when the worker could name one. */
  fix?: { setting: string; value: string } | null;
}

export interface AuditResult {
  score: number;
  summary: string;
  findings: AuditFinding[];
}

export interface TrafficInsight {
  summary: string;
  observations: string[];
  recommendations: string[];
}

export class AiError extends Error {
  code: 'quota' | 'auth' | 'network' | 'server';
  constructor(code: AiError['code'], message: string) {
    super(message);
    this.code = code;
  }
}

/**
 * Anonymous, stable per-install id so the worker can meter usage. Exported so
 * rewarded ads can name the install in their AdMob verification callback.
 */
export async function installId(): Promise<string> {
  const KEY = 'cf_install_id';
  if (Platform.OS === 'web') {
    let v = localStorage.getItem(KEY);
    if (!v) {
      v = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(KEY, v);
    }
    return v;
  }
  const SecureStore = require('expo-secure-store');
  let v = await SecureStore.getItemAsync(KEY);
  if (!v) {
    v = Math.random().toString(36).slice(2) + Date.now().toString(36);
    await SecureStore.setItemAsync(KEY, v);
  }
  // Development only: the worker can allow-list this id so AI calls are not
  // metered while working on the app. Never printed in a release build.
  if (__DEV__ && !loggedInstallId) {
    loggedInstallId = true;
    console.log('[CF] AI install id:', v);
  }
  return v;
}

let loggedInstallId = false;

type UsageListener = () => void;
const usageListeners = new Set<UsageListener>();

/**
 * Fires whenever a request may have moved the server-side counter. The quota
 * store subscribes to this so the numbers on screen follow the worker instead
 * of going stale until the next app launch.
 */
export function onUsageChanged(fn: UsageListener): () => void {
  usageListeners.add(fn);
  return () => { usageListeners.delete(fn); };
}

function usageChanged() {
  for (const fn of usageListeners) {
    try {
      fn();
    } catch {
      // a bad listener must never break an AI call
    }
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Install-Id': await installId(),
      },
      body: JSON.stringify(body),
    });
  } catch (e: any) {
    logError('ai', e?.message ?? 'Network error', `POST ${path}`);
    throw new AiError('network', e?.message ?? 'Network error');
  }

  if (res.status === 402 || res.status === 429) {
    usageChanged();
    throw new AiError('quota', 'AI quota exhausted for this month');
  }
  if (res.status === 401 || res.status === 403) {
    throw new AiError('auth', 'Subscription required');
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    logError('ai', detail.slice(0, 300) || 'no response body', `POST ${path} -> ${res.status}`);
    throw new AiError('server', `AI service error (${res.status})`);
  }

  const json = (await res.json()) as T;
  usageChanged();
  return json;
}

export async function getQuota(): Promise<AiQuota | null> {
  try {
    const res = await fetch(`${BASE_URL}/quota`, {
      headers: { 'X-Install-Id': await installId() },
    });
    if (!res.ok) return null;
    return (await res.json()) as AiQuota;
  } catch {
    return null;
  }
}

/**
 * Zone security audit. We send only configuration facts — never the API token,
 * never record contents beyond what is needed to judge the setup.
 */
export async function auditZone(input: {
  zoneName: string;
  settings: Record<string, unknown>;
  dnsSummary: { type: string; proxied: boolean; name: string }[];
  hasDmarc: boolean;
  hasSpf: boolean;
  threats24h: number;
  language: string;
}): Promise<AuditResult> {
  return post<AuditResult>('/audit', input);
}

/** Plain-language explanation of the zone's recent traffic pattern. */
export async function explainTraffic(input: {
  zoneName: string;
  timeseries: { date: string; requests: number; cachedRequests: number; threats: number; bytes: number }[];
  language: string;
}): Promise<TrafficInsight> {
  return post<TrafficInsight>('/traffic', input);
}

/** Natural language → DNS record proposal (never applied without confirmation). */
export async function suggestDnsRecord(input: {
  zoneName: string;
  request: string;
  existing: { type: string; name: string; content: string }[];
  language: string;
}): Promise<{
  explanation: string;
  records: { type: string; name: string; content: string; proxied: boolean; ttl: number; priority?: number }[];
}> {
  return post('/dns-suggest', input);
}

/** Explain a worker log line / exception and suggest a fix. */
export async function explainLog(input: { log: string; language: string }): Promise<{ explanation: string; fix: string }> {
  return post('/explain-log', input);
}

export interface WafSuggestion {
  description: string;
  expression: string;
  action: 'block' | 'managed_challenge' | 'js_challenge' | 'challenge' | 'log' | 'skip';
  explanation: string;
}

/** Natural language → one WAF custom rule (never created without confirmation). */
export async function suggestWafRule(input: {
  zoneName: string;
  request: string;
  existing: string[];
  language: string;
}): Promise<WafSuggestion> {
  return post<WafSuggestion>('/waf-suggest', input);
}

export interface AuditLogInsight {
  summary: string;
  highlights: string[];
  concerns: string[];
}

/** Plain-language review of recent account activity. */
export async function explainAuditLogs(input: {
  entries: { when: string; actor: string; ip: string; action: string; ok: boolean; resource: string }[];
  language: string;
}): Promise<AuditLogInsight> {
  return post<AuditLogInsight>('/explain-audit', input);
}

export interface Diagnosis {
  summary: string;
  causes: { title: string; why: string; confidence: 'high' | 'medium' | 'low' }[];
  steps: string[];
}

/** Facts the app can gather about a zone that is misbehaving right now. */
export interface DiagnoseInput {
  zoneName: string;
  status: string;
  paused: boolean;
  sslMode?: string;
  securityLevel?: string;
  developmentMode: boolean;
  hourly: { requests: number; errors: number; threats: number }[];
  lastHourStatuses: { status: number; requests: number }[];
  dns: { type: string; name: string; proxied: boolean }[];
  certDaysLeft: number | null;
  alert?: string;
  language: string;
}

export async function diagnoseZone(input: DiagnoseInput): Promise<Diagnosis> {
  return post<Diagnosis>('/diagnose', input);
}

export interface WeeklyDigest {
  headline: string;
  body: string;
  zones: { name: string; note: string }[];
  tip: string;
}

export interface DigestTotals {
  requests: number;
  cachedRequests: number;
  threats: number;
  bytes: number;
}

export async function weeklyDigest(input: {
  zones: { name: string; thisWeek: DigestTotals; lastWeek: DigestTotals }[];
  language: string;
}): Promise<WeeklyDigest> {
  return post<WeeklyDigest>('/digest', input);
}

// ─── Chat assistant ─────────────────────────────────────────────────────────
//
// The worker is a function-calling agent: it sees the conversation plus a
// snapshot of the current zone/account, and replies with a message and zero
// or more proposed actions. We never execute an action automatically here —
// the worker only ever *proposes*; `services/ai-actions.ts` is the sole place
// that turns a proposal into a real Cloudflare API call.

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/**
 * `kind` must match a key in ACTION_REGISTRY (services/ai-actions.ts) — the
 * worker and the app share this contract. `params` shape depends on `kind`;
 * see the registry for what each one expects.
 */
export interface ActionProposal {
  id: string;
  kind: string;
  label: string;
  destructive: boolean;
  params: Record<string, any>;
}

export interface ChatResult {
  reply: string;
  actions: ActionProposal[];
}

/** Zone/account facts sent alongside the conversation so the assistant can reason about real state. */
export interface ChatContext {
  accountId?: string;
  accountName?: string;
  zoneId?: string;
  zoneName?: string;
  /** Current zone state, so the assistant can answer from facts and reference real record ids. */
  status?: string;
  settings?: Record<string, unknown>;
  dns?: { id: string; type: string; name: string; content: string; proxied: boolean; ttl: number }[];
}

export async function chatAssistant(input: {
  messages: ChatMessage[];
  context: ChatContext;
  language: string;
}): Promise<ChatResult> {
  return post('/chat', input);
}
