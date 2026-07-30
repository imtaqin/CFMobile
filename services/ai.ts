import { Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * All AI calls go through our own Hono worker on Cloudflare, never straight to
 * an LLM provider: the provider key stays server-side and the worker enforces
 * the monthly quota tied to the user's Play subscription.
 */
const BASE_URL =
  (Constants.expoConfig?.extra as any)?.aiBaseUrl ?? 'https://cfmobile-ai.imtaqin.workers.dev';

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

/** Anonymous, stable per-install id so the worker can meter usage. */
async function installId(): Promise<string> {
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
  return v;
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
    throw new AiError('network', e?.message ?? 'Network error');
  }

  if (res.status === 402 || res.status === 429) {
    throw new AiError('quota', 'AI quota exhausted for this month');
  }
  if (res.status === 401 || res.status === 403) {
    throw new AiError('auth', 'Subscription required');
  }
  if (!res.ok) {
    throw new AiError('server', `AI service error (${res.status})`);
  }
  return (await res.json()) as T;
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
