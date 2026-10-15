import axios, { AxiosInstance } from 'axios';
import { logError } from './error-log';
import { isExpired, refreshOAuth } from './oauth';
import { updateActiveConfig } from './profiles';
import { Platform } from 'react-native';
import {
  CFResponse, AuthConfig, CFUser, Zone, DNSRecord, DNSRecordInput,
  FirewallRule, PageRule, WorkerScript, KVNamespace, R2Bucket, PagesProject,
  ZoneAnalyticsDashboard, ZoneSetting, AccountMember,
} from './types';

const API_BASE = 'https://api.cloudflare.com/client/v4';
const AUTH_KEY = 'cf_auth_config';

// Platform-safe storage: SecureStore on native, localStorage on web
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    const SecureStore = require('expo-secure-store');
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    const SecureStore = require('expo-secure-store');
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    const SecureStore = require('expo-secure-store');
    return SecureStore.deleteItemAsync(key);
  },
};

let authConfig: AuthConfig | null = null;
let client: AxiosInstance | null = null;
let refreshing: Promise<void> | null = null;

/** Swap an expired OAuth access token for a new one. Concurrent requests share one refresh. */
async function ensureFreshToken(): Promise<void> {
  if (!authConfig || !authConfig.refreshToken || !isExpired(authConfig)) return;
  refreshing ??= (async () => {
    try {
      const next = await refreshOAuth(authConfig!);
      authConfig = next;
      await storage.setItem(AUTH_KEY, JSON.stringify(next));
      await updateActiveConfig(next);
    } catch (e: any) {
      // Let the request go out with the old token; Cloudflare answers 401 and the app asks to sign in again.
      logError('auth', e?.message ?? 'token refresh failed');
    } finally {
      refreshing = null;
    }
  })();
  await refreshing;
}

function createClient(config: AuthConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(async (req) => {
    // Development only: answer from fixtures when demo data is switched on.
    if (__DEV__) {
      const demo = require('./demo');
      if (demo.isDemoMode()) req.adapter = demo.demoAdapter;
    }
    if (config.method === 'oauth') {
      await ensureFreshToken();
      const token = authConfig?.apiToken ?? config.apiToken;
      if (token) req.headers.Authorization = `Bearer ${token}`;
    } else if (config.method === 'token' && config.apiToken) {
      req.headers.Authorization = `Bearer ${config.apiToken.replace(/\s+/g, '')}`;
    } else if (config.method === 'global_key' && config.globalKey && config.email) {
      req.headers['X-Auth-Email'] = config.email.replace(/\s+/g, '');
      req.headers['X-Auth-Key'] = config.globalKey.replace(/\s+/g, '');
    }
    return req;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      // Method, path and Cloudflare's own message only — never headers or bodies.
      const cfMessage = error.response?.data?.errors?.[0]?.message;
      // 403/404 are routine with scoped tokens (permission probing), so they are not worth reporting.
      const status = error.response?.status;
      if (status !== 403 && status !== 404) logError(
        'api',
        cfMessage ?? error.message ?? 'request failed',
        `${String(error.config?.method ?? 'get').toUpperCase()} ${String(error.config?.url ?? '').split('?')[0]} -> ${error.response?.status ?? 'no response'}`
      );
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        error.retryAfter = retryAfter ? parseInt(retryAfter, 10) : 60;
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function saveAuth(config: AuthConfig): Promise<void> {
  if (__DEV__) await require('./demo').loadDemoMode();
  await storage.setItem(AUTH_KEY, JSON.stringify(config));
  authConfig = config;
  client = createClient(config);
}

export async function loadAuth(): Promise<AuthConfig | null> {
  if (__DEV__) await require('./demo').loadDemoMode();
  if (authConfig) return authConfig;
  const raw = await storage.getItem(AUTH_KEY);
  if (!raw) return null;
  authConfig = JSON.parse(raw) as AuthConfig;
  client = createClient(authConfig);
  return authConfig;
}

export async function clearAuth(): Promise<void> {
  await storage.removeItem(AUTH_KEY);
  authConfig = null;
  client = null;
}

export function getClient(): AxiosInstance {
  if (!client) throw new Error('Not authenticated');
  return client;
}

// ─── Helper ──────────────────────────────────────────────────────────────────

async function get<T>(path: string, params?: Record<string, any>): Promise<CFResponse<T>> {
  const res = await getClient().get<CFResponse<T>>(path, { params });
  return res.data;
}

async function post<T>(path: string, data?: any): Promise<CFResponse<T>> {
  const res = await getClient().post<CFResponse<T>>(path, data);
  return res.data;
}

async function put<T>(path: string, data?: any): Promise<CFResponse<T>> {
  const res = await getClient().put<CFResponse<T>>(path, data);
  return res.data;
}

async function patch<T>(path: string, data?: any): Promise<CFResponse<T>> {
  const res = await getClient().patch<CFResponse<T>>(path, data);
  return res.data;
}

async function del<T>(path: string): Promise<CFResponse<T>> {
  const res = await getClient().delete<CFResponse<T>>(path);
  return res.data;
}

// ─── Token Verification ─────────────────────────────────────────────────────

export async function verifyToken(): Promise<CFResponse<{ id: string; status: string }>> {
  return get('/user/tokens/verify');
}

// ─── Permission Probing ─────────────────────────────────────────────────────

export interface Permissions {
  user: boolean;
  accounts: boolean;
  zones: boolean;
  dns: boolean;
  ssl: boolean;
  firewall: boolean;
  cache: boolean;
  analytics: boolean;
  pageRules: boolean;
  workers: boolean;
  kv: boolean;
  r2: boolean;
  pages: boolean;
  d1: boolean;
}

async function probe(req: () => Promise<any>): Promise<boolean> {
  try {
    await req();
    return true;
  } catch {
    return false;
  }
}

export async function probePermissions(zoneId?: string, accountId?: string): Promise<Permissions> {
  const checks: Promise<[keyof Permissions, boolean]>[] = [
    probe(() => get('/user')).then((v) => ['user', v] as [keyof Permissions, boolean]),
    probe(() => get('/accounts', { per_page: 1 })).then((v) => ['accounts', v] as [keyof Permissions, boolean]),
    probe(() => get('/zones', { per_page: 1 })).then((v) => ['zones', v] as [keyof Permissions, boolean]),
  ];

  if (zoneId) {
    checks.push(
      probe(() => get(`/zones/${zoneId}/dns_records`, { per_page: 1 })).then((v) => ['dns', v] as [keyof Permissions, boolean]),
      probe(() => get(`/zones/${zoneId}/settings/ssl`)).then((v) => ['ssl', v] as [keyof Permissions, boolean]),
      probe(() => get(`/zones/${zoneId}/firewall/rules`, { per_page: 1 })).then((v) => ['firewall', v] as [keyof Permissions, boolean]),
      probe(() => get(`/zones/${zoneId}/settings/cache_level`)).then((v) => ['cache', v] as [keyof Permissions, boolean]),
      probe(async () => {
        const res = await getClient().post('https://api.cloudflare.com/client/v4/graphql', {
          query: `{ viewer { zones(filter: { zoneTag: "${zoneId}" }) { zoneTag } } }`,
        });
        if (res.data?.errors?.length) throw new Error('analytics denied');
      }).then((v) => ['analytics', v] as [keyof Permissions, boolean]),
      probe(() => get(`/zones/${zoneId}/pagerules`)).then((v) => ['pageRules', v] as [keyof Permissions, boolean]),
    );
  }

  if (accountId) {
    checks.push(
      probe(() => get(`/accounts/${accountId}/workers/scripts`)).then((v) => ['workers', v] as [keyof Permissions, boolean]),
      probe(() => get(`/accounts/${accountId}/storage/kv/namespaces`, { per_page: 1 })).then((v) => ['kv', v] as [keyof Permissions, boolean]),
      probe(() => get(`/accounts/${accountId}/r2/buckets`)).then((v) => ['r2', v] as [keyof Permissions, boolean]),
      probe(() => get(`/accounts/${accountId}/pages/projects`)).then((v) => ['pages', v] as [keyof Permissions, boolean]),
      probe(() => get(`/accounts/${accountId}/d1/database`, { per_page: 1 })).then((v) => ['d1', v] as [keyof Permissions, boolean]),
    );
  }

  const results = await Promise.all(checks);
  const perms: Permissions = {
    user: false, accounts: false, zones: false, dns: false, ssl: false,
    firewall: false, cache: false, analytics: false, pageRules: false,
    workers: false, kv: false, r2: false, pages: false, d1: false,
  };
  for (const [key, value] of results) {
    perms[key] = value;
  }
  return perms;
}

// ─── User ────────────────────────────────────────────────────────────────────

export async function getUser(): Promise<CFResponse<CFUser>> {
  return get('/user');
}

// ─── Accounts ────────────────────────────────────────────────────────────────

export async function getAccounts(): Promise<CFResponse<{ id: string; name: string; type: string }[]>> {
  return get('/accounts');
}

export async function getAccountMembers(accountId: string, page = 1): Promise<CFResponse<AccountMember[]>> {
  return get(`/accounts/${accountId}/members`, { page, per_page: 50 });
}

export interface AccountRole {
  id: string;
  name: string;
  description: string;
  permissions: unknown;
}

export async function getAccountRoles(accountId: string): Promise<CFResponse<AccountRole[]>> {
  return get(`/accounts/${accountId}/roles`);
}

/** Invite takes role IDs; the response member reflects the full role objects. */
export async function inviteAccountMember(accountId: string, invite: {
  email: string;
  roles: string[];
  status?: 'accepted' | 'pending';
}): Promise<CFResponse<AccountMember>> {
  return post(`/accounts/${accountId}/members`, invite);
}

/**
 * Update takes full role objects, not just IDs — pass the AccountRole entries
 * the member should have (from getAccountRoles), not a list of strings.
 */
export async function updateAccountMemberRoles(accountId: string, memberId: string, roles: AccountRole[]): Promise<CFResponse<AccountMember>> {
  return put(`/accounts/${accountId}/members/${memberId}`, { roles });
}

export async function removeAccountMember(accountId: string, memberId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/members/${memberId}`);
}

// ─── Zones ───────────────────────────────────────────────────────────────────

export async function getZones(page = 1, search?: string): Promise<CFResponse<Zone[]>> {
  const params: Record<string, any> = { page, per_page: 50, order: 'name', direction: 'asc' };
  if (search) params.name = search;
  return get('/zones', params);
}

export async function getZone(zoneId: string): Promise<CFResponse<Zone>> {
  return get(`/zones/${zoneId}`);
}

export async function createZone(name: string, accountId: string, type = 'full'): Promise<CFResponse<Zone>> {
  return post('/zones', { name, account: { id: accountId }, type });
}

export async function deleteZone(zoneId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}`);
}

export async function purgeAllCache(zoneId: string): Promise<CFResponse<{ id: string }>> {
  return post(`/zones/${zoneId}/purge_cache`, { purge_everything: true });
}

export async function purgeUrls(zoneId: string, files: string[]): Promise<CFResponse<{ id: string }>> {
  return post(`/zones/${zoneId}/purge_cache`, { files });
}

export async function pauseZone(zoneId: string): Promise<CFResponse<Zone>> {
  return patch(`/zones/${zoneId}`, { paused: true });
}

export async function unpauseZone(zoneId: string): Promise<CFResponse<Zone>> {
  return patch(`/zones/${zoneId}`, { paused: false });
}

export async function checkActivation(zoneId: string): Promise<CFResponse<{ id: string }>> {
  return put(`/zones/${zoneId}/activation_check`);
}

export interface ZoneHold {
  hold: boolean;
  hold_after?: string;
  include_subdomains?: boolean;
}

export async function getZoneHold(zoneId: string): Promise<CFResponse<ZoneHold>> {
  return get(`/zones/${zoneId}/hold`);
}

export async function createZoneHold(zoneId: string, include_subdomains?: boolean): Promise<CFResponse<ZoneHold>> {
  const params: Record<string, string> = {};
  if (include_subdomains !== undefined) params.include_subdomains = String(include_subdomains);
  const res = await getClient().post<CFResponse<ZoneHold>>(`/zones/${zoneId}/hold`, undefined, { params });
  return res.data;
}

export async function updateZoneHold(zoneId: string, hold_after?: string, include_subdomains?: boolean): Promise<CFResponse<ZoneHold>> {
  const body: Record<string, any> = {};
  if (hold_after !== undefined) body.hold_after = hold_after;
  if (include_subdomains !== undefined) body.include_subdomains = include_subdomains;
  return patch(`/zones/${zoneId}/hold`, body);
}

export async function deleteZoneHold(zoneId: string): Promise<CFResponse<any>> {
  return del(`/zones/${zoneId}/hold`);
}

export async function toggleDevMode(zoneId: string, value: 'on' | 'off'): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/settings/development_mode`, { value });
}

export async function getZoneSettings(zoneId: string): Promise<CFResponse<ZoneSetting[]>> {
  return get(`/zones/${zoneId}/settings`);
}

export async function getZoneSetting(zoneId: string, settingId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/settings/${settingId}`);
}

export async function updateZoneSetting(zoneId: string, settingId: string, value: any): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/settings/${settingId}`, { value });
}

// ─── DNS Records ─────────────────────────────────────────────────────────────

export async function getDnsRecords(zoneId: string, page = 1, type?: string, search?: string): Promise<CFResponse<DNSRecord[]>> {
  const params: Record<string, any> = { page, per_page: 100 };
  if (type) params.type = type;
  if (search) params.name = search;
  return get(`/zones/${zoneId}/dns_records`, params);
}

export async function getDnsRecord(zoneId: string, recordId: string): Promise<CFResponse<DNSRecord>> {
  return get(`/zones/${zoneId}/dns_records/${recordId}`);
}

export async function createDnsRecord(zoneId: string, record: DNSRecordInput): Promise<CFResponse<DNSRecord>> {
  return post(`/zones/${zoneId}/dns_records`, record);
}

export async function updateDnsRecord(zoneId: string, recordId: string, record: DNSRecordInput): Promise<CFResponse<DNSRecord>> {
  return put(`/zones/${zoneId}/dns_records/${recordId}`, record);
}

export async function deleteDnsRecord(zoneId: string, recordId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/dns_records/${recordId}`);
}

export async function exportDnsRecords(zoneId: string): Promise<string> {
  const res = await getClient().get(`/zones/${zoneId}/dns_records/export`);
  return res.data;
}

export interface DnsZoneSettings {
  flatten_all_cnames: boolean;
  foundation_dns: boolean;
  internal_dns: { reference_zone_id: string };
  multi_provider: boolean;
  ns_ttl: number;
  secondary_overrides: boolean;
  soa: {
    expire: number;
    min_ttl: number;
    mname: string | null;
    refresh: number;
    retry: number;
    rname: string;
    ttl: number;
  };
  zone_mode: 'standard' | 'cdn_only' | 'dns_only';
  nameservers: {
    ns_set: number | null;
    type: string;
  };
}

export async function getDnsSettings(zoneId: string): Promise<CFResponse<DnsZoneSettings>> {
  return get(`/zones/${zoneId}/dns_settings`);
}

export async function updateDnsSettings(zoneId: string, settings: Partial<DnsZoneSettings>): Promise<CFResponse<DnsZoneSettings>> {
  return patch(`/zones/${zoneId}/dns_settings`, settings);
}

export interface DnsRecordUsage {
  record_quota: number | null;
  record_usage: number;
}

export async function getDnsRecordUsage(zoneId: string): Promise<CFResponse<DnsRecordUsage>> {
  return get(`/zones/${zoneId}/dns_records/usage`);
}

export async function scanDnsRecords(zoneId: string): Promise<CFResponse<{ recs_added: number; total_records_parsed: number }>> {
  return post(`/zones/${zoneId}/dns_records/scan`);
}

export async function triggerDnsScan(zoneId: string): Promise<CFResponse<any>> {
  return post(`/zones/${zoneId}/dns_records/scan/trigger`);
}

export async function reviewDnsScan(zoneId: string): Promise<CFResponse<DNSRecord[]>> {
  return get(`/zones/${zoneId}/dns_records/scan/review`);
}

export async function applyDnsScanResults(zoneId: string, accepts: any[], rejects: string[]): Promise<CFResponse<any>> {
  return post(`/zones/${zoneId}/dns_records/scan/review`, { accepts, rejects });
}

export interface DnsBatchResult {
  deletes: any[];
  patches: any[];
  posts: any[];
  puts: any[];
}

export async function batchDnsRecords(zoneId: string, batch: { deletes?: { id: string }[]; posts?: DNSRecordInput[]; patches?: (Partial<DNSRecordInput> & { id: string })[]; puts?: DNSRecordInput[] }): Promise<CFResponse<DnsBatchResult>> {
  return post(`/zones/${zoneId}/dns_records/batch`, batch);
}

export interface SecondaryDnsZone {
  id: string;
  name: string;
  peers: string[];
  soa_serial: number | null;
  checked_time: string | null;
  created_time: string | null;
  last_transferred_time: string | null;
}

export async function getSecondaryDnsOutgoing(zoneId: string): Promise<CFResponse<SecondaryDnsZone>> {
  return get(`/zones/${zoneId}/secondary_dns/outgoing`);
}

export async function createSecondaryDnsOutgoing(zoneId: string, config: { id: string; name: string; peers: string[] }): Promise<CFResponse<SecondaryDnsZone>> {
  return post(`/zones/${zoneId}/secondary_dns/outgoing`, config);
}

export async function updateSecondaryDnsOutgoing(zoneId: string, config: { id: string; name: string; peers: string[] }): Promise<CFResponse<SecondaryDnsZone>> {
  return put(`/zones/${zoneId}/secondary_dns/outgoing`, config);
}

export async function deleteSecondaryDnsOutgoing(zoneId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/secondary_dns/outgoing`);
}

export async function enableSecondaryDnsOutgoing(zoneId: string): Promise<CFResponse<string>> {
  return post(`/zones/${zoneId}/secondary_dns/outgoing/enable`);
}

export async function disableSecondaryDnsOutgoing(zoneId: string): Promise<CFResponse<string>> {
  return post(`/zones/${zoneId}/secondary_dns/outgoing/disable`);
}

export async function forceSecondaryDnsNotify(zoneId: string): Promise<CFResponse<string>> {
  return post(`/zones/${zoneId}/secondary_dns/outgoing/force_notify`);
}

export async function getSecondaryDnsOutgoingStatus(zoneId: string): Promise<CFResponse<string>> {
  return get(`/zones/${zoneId}/secondary_dns/outgoing/status`);
}

// ─── SSL/TLS ─────────────────────────────────────────────────────────────────

export async function getSSLSetting(zoneId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/settings/ssl`);
}

export async function updateSSLSetting(zoneId: string, value: string): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/settings/ssl`, { value });
}

export async function getSSLVerification(zoneId: string): Promise<CFResponse<any[]>> {
  return get(`/zones/${zoneId}/ssl/verification`);
}

export async function getAlwaysUseHTTPS(zoneId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/settings/always_use_https`);
}

export async function updateAlwaysUseHTTPS(zoneId: string, value: 'on' | 'off'): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/settings/always_use_https`, { value });
}

export async function getMinTLSVersion(zoneId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/settings/min_tls_version`);
}

export async function updateMinTLSVersion(zoneId: string, value: string): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/settings/min_tls_version`, { value });
}

// ─── Firewall ────────────────────────────────────────────────────────────────

export async function getFirewallRules(zoneId: string, page = 1): Promise<CFResponse<FirewallRule[]>> {
  return get(`/zones/${zoneId}/firewall/rules`, { page, per_page: 50 });
}

export async function updateFirewallRule(zoneId: string, ruleId: string, data: Partial<FirewallRule>): Promise<CFResponse<FirewallRule>> {
  return put(`/zones/${zoneId}/firewall/rules/${ruleId}`, data);
}

export async function deleteFirewallRule(zoneId: string, ruleId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/firewall/rules/${ruleId}`);
}

export type IPAccessMode = 'block' | 'challenge' | 'whitelist' | 'js_challenge' | 'managed_challenge';

export interface IPAccessRule {
  id: string;
  mode: IPAccessMode;
  notes?: string;
  configuration: { target: string; value: string };
  created_on?: string;
}

export async function getIPAccessRules(zoneId: string, page = 1): Promise<CFResponse<IPAccessRule[]>> {
  return get(`/zones/${zoneId}/firewall/access_rules/rules`, { page, per_page: 50 });
}

export async function createIPAccessRule(zoneId: string, rule: {
  mode: IPAccessMode;
  configuration: { target: string; value: string };
  notes?: string;
}): Promise<CFResponse<IPAccessRule>> {
  return post(`/zones/${zoneId}/firewall/access_rules/rules`, rule);
}

export async function updateIPAccessRule(zoneId: string, ruleId: string, data: {
  mode?: IPAccessMode;
  notes?: string;
}): Promise<CFResponse<IPAccessRule>> {
  return patch(`/zones/${zoneId}/firewall/access_rules/rules/${ruleId}`, data);
}

export async function deleteIPAccessRule(zoneId: string, ruleId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/firewall/access_rules/rules/${ruleId}`);
}

// ─── WAF Custom Rules (Rulesets API) ─────────────────────────────────────────

export const WAF_CUSTOM_PHASE = 'http_request_firewall_custom';

export type RulesetAction =
  | 'block' | 'challenge' | 'js_challenge' | 'managed_challenge' | 'log' | 'skip';

export interface RulesetRule {
  id: string;
  version?: string;
  action: RulesetAction;
  expression: string;
  description?: string;
  enabled: boolean;
  ref?: string;
}

export interface Ruleset {
  id: string;
  name: string;
  phase: string;
  kind: string;
  rules?: RulesetRule[];
}

export async function getWAFCustomRules(zoneId: string): Promise<CFResponse<Ruleset>> {
  return get(`/zones/${zoneId}/rulesets/phases/${WAF_CUSTOM_PHASE}/entrypoint`);
}

export async function getZoneRulesets(zoneId: string): Promise<CFResponse<Ruleset[]>> {
  return get(`/zones/${zoneId}/rulesets`);
}

export async function getZoneRuleset(zoneId: string, rulesetId: string): Promise<CFResponse<Ruleset>> {
  return get(`/zones/${zoneId}/rulesets/${rulesetId}`);
}

export async function createRulesetRule(zoneId: string, rulesetId: string, rule: {
  action: RulesetAction;
  expression: string;
  description?: string;
  enabled?: boolean;
}): Promise<CFResponse<Ruleset>> {
  return post(`/zones/${zoneId}/rulesets/${rulesetId}/rules`, rule);
}

export async function updateRulesetRule(zoneId: string, rulesetId: string, ruleId: string, rule: {
  action?: RulesetAction;
  expression?: string;
  description?: string;
  enabled?: boolean;
}): Promise<CFResponse<Ruleset>> {
  return patch(`/zones/${zoneId}/rulesets/${rulesetId}/rules/${ruleId}`, rule);
}

export async function deleteRulesetRule(zoneId: string, rulesetId: string, ruleId: string): Promise<CFResponse<Ruleset>> {
  return del(`/zones/${zoneId}/rulesets/${rulesetId}/rules/${ruleId}`);
}

/**
 * A zone that has never had a custom rule has no entrypoint ruleset, and the
 * rules endpoint 404s until one exists. Writing the phase entrypoint creates it.
 */
export async function createWAFEntrypoint(zoneId: string): Promise<CFResponse<Ruleset>> {
  return put(`/zones/${zoneId}/rulesets/phases/${WAF_CUSTOM_PHASE}/entrypoint`, {
    name: 'Custom rules',
    kind: 'zone',
    phase: WAF_CUSTOM_PHASE,
    rules: [],
  });
}

// ─── Transform, Redirect, and Cache Rules ────────────────────────────────────

export type TransformPhase = 'http_request_transform' | 'http_request_dynamic_redirect' | 'http_request_cache_settings';

export interface TransformRule {
  id?: string;
  version?: string;
  action: 'rewrite' | 'redirect' | 'set_cache_settings';
  expression: string;
  description?: string;
  enabled: boolean;
  ref?: string;
  action_parameters?: {
    from_expression?: string;
    headers?: Record<string, { value: string }>;
    uri?: {
      path?: { value: string };
      query?: { value: string };
    };
    status_code?: number;
    from?: string;
    to?: string;
    preserve_query_string?: boolean;
    automatic_https_rewrites?: boolean;
    minify?: { css: boolean; js: boolean; html: boolean };
    mirage?: boolean;
    rocket_loader?: boolean;
    security_level?: string;
    ssl?: string;
    browser_ttl?: { mode: string; default: number };
    edge_cache_ttl?: number;
    cache?: boolean;
    cache_key?: {
      ignore_query_strings_order?: boolean;
      cache_deception_armor?: boolean;
    };
  };
}

export interface TransformRuleset {
  id: string;
  name: string;
  description: string;
  kind: string;
  version?: string;
  last_updated?: string;
  phase: TransformPhase;
  rules: TransformRule[];
}

export async function getTransformRules(zoneId: string): Promise<CFResponse<TransformRuleset>> {
  return get(`/zones/${zoneId}/rulesets/phases/http_request_transform/entrypoint`);
}

export async function getRedirectRules(zoneId: string): Promise<CFResponse<TransformRuleset>> {
  return get(`/zones/${zoneId}/rulesets/phases/http_request_dynamic_redirect/entrypoint`);
}

export async function getCacheRules(zoneId: string): Promise<CFResponse<TransformRuleset>> {
  return get(`/zones/${zoneId}/rulesets/phases/http_request_cache_settings/entrypoint`);
}

export async function updateTransformRules(zoneId: string, ruleset: Partial<TransformRuleset>): Promise<CFResponse<TransformRuleset>> {
  return put(`/zones/${zoneId}/rulesets/phases/http_request_transform/entrypoint`, ruleset);
}

export async function updateRedirectRules(zoneId: string, ruleset: Partial<TransformRuleset>): Promise<CFResponse<TransformRuleset>> {
  return put(`/zones/${zoneId}/rulesets/phases/http_request_dynamic_redirect/entrypoint`, ruleset);
}

export async function updateCacheRules(zoneId: string, ruleset: Partial<TransformRuleset>): Promise<CFResponse<TransformRuleset>> {
  return put(`/zones/${zoneId}/rulesets/phases/http_request_cache_settings/entrypoint`, ruleset);
}

// ─── Page Rules ──────────────────────────────────────────────────────────────

export async function getPageRules(zoneId: string): Promise<CFResponse<PageRule[]>> {
  return get(`/zones/${zoneId}/pagerules`);
}

export async function deletePageRule(zoneId: string, ruleId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/pagerules/${ruleId}`);
}

// ─── Zone Lifecycle ──────────────────────────────────────────────────────────

export interface ZonePlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  frequency: string;
  legacy_id: string;
  is_subscribed: boolean;
  can_subscribe: boolean;
}

export async function getAvailablePlans(zoneId: string): Promise<CFResponse<ZonePlan[]>> {
  return get('/zones/' + zoneId + '/available_plans');
}

export async function getAvailablePlan(zoneId: string, planIdentifier: string): Promise<CFResponse<ZonePlan>> {
  return get('/zones/' + zoneId + '/available_plans/' + planIdentifier);
}

export async function changeZonePausedStatus(zoneId: string, paused: boolean): Promise<CFResponse<any>> {
  return patch('/zones/' + zoneId, { paused });
}

export async function rerunActivationCheck(zoneId: string): Promise<CFResponse<any>> {
  return put('/zones/' + zoneId + '/activation_check');
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface GraphQLAnalytics {
  totals: {
    requests: { all: number; cached: number; uncached: number };
    bandwidth: { all: number; cached: number; uncached: number };
    threats: { all: number };
    pageviews: { all: number };
    uniques: { all: number };
  };
  timeseries: {
    date: string;
    requests: number;
    cachedRequests: number;
    bytes: number;
    cachedBytes: number;
    threats: number;
    pageViews: number;
    uniques: number;
  }[];
}

export async function getZoneAnalytics(
  zoneId: string,
  dateStart: string,
  dateEnd: string,
): Promise<GraphQLAnalytics> {
  const query = `{
    viewer {
      zones(filter: { zoneTag: "${zoneId}" }) {
        httpRequests1dGroups(
          limit: 31
          filter: { date_geq: "${dateStart}", date_leq: "${dateEnd}" }
          orderBy: [date_ASC]
        ) {
          dimensions { date }
          sum {
            requests
            cachedRequests
            bytes
            cachedBytes
            pageViews
            threats
          }
          uniq { uniques }
        }
      }
    }
  }`;

  const res = await getClient().post('https://api.cloudflare.com/client/v4/graphql', { query });
  const groups = res.data?.data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];

  // Aggregate totals from all groups
  let totalReqs = 0, cachedReqs = 0, totalBytes = 0, cachedBytes = 0;
  let totalThreats = 0, totalPageviews = 0, totalUniques = 0;

  const timeseries = groups.map((g: any) => {
    const s = g.sum;
    const u = g.uniq;
    totalReqs += s.requests;
    cachedReqs += s.cachedRequests;
    totalBytes += s.bytes;
    cachedBytes += s.cachedBytes;
    totalThreats += s.threats;
    totalPageviews += s.pageViews;
    totalUniques += u.uniques;
    return {
      date: g.dimensions.date,
      requests: s.requests,
      cachedRequests: s.cachedRequests,
      bytes: s.bytes,
      cachedBytes: s.cachedBytes,
      threats: s.threats,
      pageViews: s.pageViews,
      uniques: u.uniques,
    };
  });

  return {
    totals: {
      requests: { all: totalReqs, cached: cachedReqs, uncached: totalReqs - cachedReqs },
      bandwidth: { all: totalBytes, cached: cachedBytes, uncached: totalBytes - cachedBytes },
      threats: { all: totalThreats },
      pageviews: { all: totalPageviews },
      uniques: { all: totalUniques },
    },
    timeseries,
  };
}

// ─── Workers ─────────────────────────────────────────────────────────────────

export interface WorkerSecret {
  name: string;
  type: string;
}

export interface WorkerSchedule {
  cron: string;
  created_on?: string;
  modified_on?: string;
}

export interface WorkerDeployment {
  id: string;
  source?: string;
  strategy?: string;
  created_on?: string;
  author_email?: string;
  versions?: { version_id: string; percentage: number }[];
  annotations?: { 'workers/message'?: string; 'workers/triggered_by'?: string };
}

export interface WorkerVersion {
  id: string;
  number?: number;
  metadata?: { created_on?: string; author_email?: string; source?: string };
  annotations?: Record<string, string>;
}

export interface WorkerBinding {
  name: string;
  type: string;
  [k: string]: unknown;
}

export interface WorkerSettings {
  bindings?: WorkerBinding[];
  compatibility_date?: string;
  compatibility_flags?: string[];
  usage_model?: string;
  observability?: { enabled?: boolean; head_sampling_rate?: number };
}

export interface WorkerSubdomain {
  enabled: boolean;
  previews_enabled?: boolean;
}

export interface WorkerRoute {
  id: string;
  pattern: string;
  script?: string;
}

export async function getWorkerScripts(accountId: string): Promise<CFResponse<WorkerScript[]>> {
  return get(`/accounts/${accountId}/workers/scripts`);
}

export async function deleteWorkerScript(accountId: string, scriptName: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/workers/scripts/${scriptName}`);
}

/**
 * Script source. Cloudflare returns the modules as a multipart body rather than
 * the usual JSON envelope, so this reads the raw text and lets the caller split
 * it — a single-module Worker is just the file itself.
 */
export async function getWorkerContent(accountId: string, scriptName: string): Promise<string> {
  const res = await getClient().get<string>(
    `/accounts/${accountId}/workers/scripts/${scriptName}/content/v2`,
    { responseType: 'text', transformResponse: [(d) => d] }
  );
  return typeof res.data === 'string' ? res.data : String(res.data ?? '');
}

export async function getWorkerSettings(accountId: string, scriptName: string): Promise<CFResponse<WorkerSettings>> {
  return get(`/accounts/${accountId}/workers/scripts/${scriptName}/settings`);
}

export async function getWorkerSecrets(accountId: string, scriptName: string): Promise<CFResponse<WorkerSecret[]>> {
  return get(`/accounts/${accountId}/workers/scripts/${scriptName}/secrets`);
}

/** Creating and overwriting a secret are the same call. */
export async function putWorkerSecret(accountId: string, scriptName: string, secret: {
  name: string;
  text: string;
}): Promise<CFResponse<WorkerSecret>> {
  return put(`/accounts/${accountId}/workers/scripts/${scriptName}/secrets`, {
    name: secret.name,
    text: secret.text,
    type: 'secret_text',
  });
}

export async function deleteWorkerSecret(accountId: string, scriptName: string, name: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/workers/scripts/${scriptName}/secrets/${name}`);
}

export async function getWorkerSchedules(accountId: string, scriptName: string): Promise<CFResponse<{ schedules: WorkerSchedule[] }>> {
  return get(`/accounts/${accountId}/workers/scripts/${scriptName}/schedules`);
}

/** The whole cron list is replaced on every write; there is no per-entry API. */
export async function putWorkerSchedules(accountId: string, scriptName: string, crons: string[]): Promise<CFResponse<{ schedules: WorkerSchedule[] }>> {
  return put(
    `/accounts/${accountId}/workers/scripts/${scriptName}/schedules`,
    crons.map((cron) => ({ cron }))
  );
}

export async function getWorkerDeployments(accountId: string, scriptName: string): Promise<CFResponse<{ deployments: WorkerDeployment[] }>> {
  return get(`/accounts/${accountId}/workers/scripts/${scriptName}/deployments`);
}

export async function getWorkerVersions(accountId: string, scriptName: string): Promise<CFResponse<{ items: WorkerVersion[] }>> {
  return get(`/accounts/${accountId}/workers/scripts/${scriptName}/versions`);
}

/** Roll back (or forward) by pointing 100% of traffic at one version. */
export async function createWorkerDeployment(accountId: string, scriptName: string, versionId: string): Promise<CFResponse<WorkerDeployment>> {
  return post(`/accounts/${accountId}/workers/scripts/${scriptName}/deployments`, {
    strategy: 'percentage',
    versions: [{ version_id: versionId, percentage: 100 }],
  });
}

export async function getWorkerSubdomain(accountId: string, scriptName: string): Promise<CFResponse<WorkerSubdomain>> {
  return get(`/accounts/${accountId}/workers/scripts/${scriptName}/subdomain`);
}

export async function setWorkerSubdomain(accountId: string, scriptName: string, enabled: boolean): Promise<CFResponse<WorkerSubdomain>> {
  return post(`/accounts/${accountId}/workers/scripts/${scriptName}/subdomain`, {
    enabled,
    previews_enabled: enabled,
  });
}

// ─── Worker routes (zone level) ──────────────────────────────────────────────

export async function getWorkerRoutes(zoneId: string): Promise<CFResponse<WorkerRoute[]>> {
  return get(`/zones/${zoneId}/workers/routes`);
}

export async function createWorkerRoute(zoneId: string, route: {
  pattern: string;
  script?: string;
}): Promise<CFResponse<WorkerRoute>> {
  return post(`/zones/${zoneId}/workers/routes`, route);
}

export async function updateWorkerRoute(zoneId: string, routeId: string, route: {
  pattern: string;
  script?: string;
}): Promise<CFResponse<WorkerRoute>> {
  return put(`/zones/${zoneId}/workers/routes/${routeId}`, route);
}

export async function deleteWorkerRoute(zoneId: string, routeId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/workers/routes/${routeId}`);
}

// ─── KV ──────────────────────────────────────────────────────────────────────

export async function getKVNamespaces(accountId: string, page = 1): Promise<CFResponse<KVNamespace[]>> {
  return get(`/accounts/${accountId}/storage/kv/namespaces`, { page, per_page: 50 });
}

export async function createKVNamespace(accountId: string, title: string): Promise<CFResponse<KVNamespace>> {
  return post(`/accounts/${accountId}/storage/kv/namespaces`, { title });
}

export async function deleteKVNamespace(accountId: string, nsId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/storage/kv/namespaces/${nsId}`);
}

export async function getKVKeys(accountId: string, nsId: string, page = 1): Promise<CFResponse<{ name: string; expiration?: number }[]>> {
  return get(`/accounts/${accountId}/storage/kv/namespaces/${nsId}/keys`, { page, per_page: 100 });
}

export async function getKVValue(accountId: string, nsId: string, key: string): Promise<string> {
  const res = await getClient().get(
    `/accounts/${accountId}/storage/kv/namespaces/${nsId}/values/${encodeURIComponent(key)}`,
    { transformResponse: [(d) => d] } // keep raw text; values are not always JSON
  );
  return typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
}

export async function putKVValue(accountId: string, nsId: string, key: string, value: string): Promise<void> {
  const form = new FormData();
  form.append('value', value);
  form.append('metadata', '{}');
  await getClient().put(
    `/accounts/${accountId}/storage/kv/namespaces/${nsId}/values/${encodeURIComponent(key)}`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
}

export async function deleteKVValue(accountId: string, nsId: string, key: string): Promise<void> {
  await getClient().delete(`/accounts/${accountId}/storage/kv/namespaces/${nsId}/values/${encodeURIComponent(key)}`);
}

// ─── D1 ──────────────────────────────────────────────────────────────────────

export interface D1Database {
  uuid: string;
  name: string;
  version?: string;
  num_tables?: number;
  file_size?: number;
  created_at?: string;
}

export interface D1QueryResult {
  results: Record<string, unknown>[];
  success: boolean;
  meta?: {
    duration?: number;
    rows_read?: number;
    rows_written?: number;
    changes?: number;
    last_row_id?: number;
  };
}

export async function getD1Databases(accountId: string): Promise<CFResponse<D1Database[]>> {
  return get(`/accounts/${accountId}/d1/database`, { per_page: 100 });
}

export async function getD1Database(accountId: string, dbId: string): Promise<CFResponse<D1Database>> {
  return get(`/accounts/${accountId}/d1/database/${dbId}`);
}

/** Run SQL against a D1 database. `params` are bound positionally to `?`. */
export async function queryD1(
  accountId: string,
  dbId: string,
  sql: string,
  params: string[] = []
): Promise<D1QueryResult> {
  const res = await post<D1QueryResult[]>(`/accounts/${accountId}/d1/database/${dbId}/query`, { sql, params });
  const first = Array.isArray(res.result) ? res.result[0] : (res.result as unknown as D1QueryResult);
  return first ?? { results: [], success: true };
}

export interface D1TableInfo {
  name: string;
  rowCount: number | null;
}

/** User tables in a D1 database, with row counts (internal cf tables hidden). */
export async function getD1Tables(accountId: string, dbId: string): Promise<D1TableInfo[]> {
  const res = await queryD1(
    accountId,
    dbId,
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%' ORDER BY name"
  );
  const names = (res.results ?? []).map((r) => String((r as any).name));

  const tables: D1TableInfo[] = [];
  for (const name of names) {
    let rowCount: number | null = null;
    try {
      // table names can't be bound as parameters; they come from sqlite_master so they are safe
      const c = await queryD1(accountId, dbId, `SELECT COUNT(*) AS n FROM "${name.replace(/"/g, '""')}"`);
      rowCount = Number((c.results?.[0] as any)?.n ?? 0);
    } catch {
      // view or permission issue — show the table without a count
    }
    tables.push({ name, rowCount });
  }
  return tables;
}

export async function getD1TableRows(
  accountId: string,
  dbId: string,
  table: string,
  limit = 50,
  offset = 0
): Promise<D1QueryResult> {
  const safe = table.replace(/"/g, '""');
  return queryD1(accountId, dbId, `SELECT * FROM "${safe}" LIMIT ${limit} OFFSET ${offset}`);
}

// ─── R2 ──────────────────────────────────────────────────────────────────────

export async function getR2Buckets(accountId: string): Promise<CFResponse<R2Bucket[]>> {
  const res = await getClient().get<{ success: boolean; errors: any[]; result: { buckets: R2Bucket[] } }>(
    `/accounts/${accountId}/r2/buckets`
  );
  // R2 API wraps result in { buckets: [...] }
  return {
    success: res.data.success,
    errors: res.data.errors,
    messages: [],
    result: res.data.result?.buckets ?? [],
  };
}

export async function createR2Bucket(accountId: string, name: string): Promise<CFResponse<R2Bucket>> {
  return post(`/accounts/${accountId}/r2/buckets`, { name });
}

export async function deleteR2Bucket(accountId: string, name: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/r2/buckets/${name}`);
}

export interface R2CorsRule {
  allowed: { headers?: string[]; methods: string[]; origins: string[] };
  exposeHeaders?: string[];
  id?: string;
  maxAgeSeconds?: number;
}

export async function getR2Cors(accountId: string, bucket: string): Promise<CFResponse<R2CorsRule[]>> {
  const res = await getClient().get(`/accounts/${accountId}/r2/buckets/${bucket}/cors`);
  return { success: res.data.success, errors: res.data.errors, messages: [], result: res.data.result?.rules ?? [] };
}

export async function putR2Cors(accountId: string, bucket: string, rules: R2CorsRule[]): Promise<CFResponse<any>> {
  return put(`/accounts/${accountId}/r2/buckets/${bucket}/cors`, { rules });
}

export async function deleteR2Cors(accountId: string, bucket: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/r2/buckets/${bucket}/cors`);
}

export interface R2LifecycleRule {
  id: string;
  enabled: boolean;
  conditions: { prefix: string };
  deleteObjectsTransition?: { condition: any };
  abortMultipartUploadsTransition?: { condition: any };
  storageClassTransitions?: { condition: any; storageClass: string }[];
}

export async function getR2Lifecycle(accountId: string, bucket: string): Promise<CFResponse<R2LifecycleRule[]>> {
  const res = await getClient().get(`/accounts/${accountId}/r2/buckets/${bucket}/lifecycle`);
  return { success: res.data.success, errors: res.data.errors, messages: [], result: res.data.result?.rules ?? [] };
}

export async function putR2Lifecycle(accountId: string, bucket: string, rules: R2LifecycleRule[]): Promise<CFResponse<any>> {
  return put(`/accounts/${accountId}/r2/buckets/${bucket}/lifecycle`, { rules });
}

export interface R2CustomDomain {
  domain: string;
  enabled: boolean;
  zoneId: string;
  minTLS?: string;
  status?: { ownership: string; ssl: string };
}

export async function getR2CustomDomains(accountId: string, bucket: string): Promise<CFResponse<R2CustomDomain[]>> {
  const res = await getClient().get(`/accounts/${accountId}/r2/buckets/${bucket}/domains/custom`);
  return { success: res.data.success, errors: res.data.errors, messages: [], result: res.data.result?.domains ?? [] };
}

export async function addR2CustomDomain(accountId: string, bucket: string, domain: string, zoneId: string): Promise<CFResponse<any>> {
  return post(`/accounts/${accountId}/r2/buckets/${bucket}/domains/custom`, { domain, zoneId, enabled: true });
}

export async function deleteR2CustomDomain(accountId: string, bucket: string, domain: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/r2/buckets/${bucket}/domains/custom/${domain}`);
}

export interface R2PublicAccess { enabled: boolean }

export async function getR2PublicAccess(accountId: string, bucket: string): Promise<CFResponse<R2PublicAccess>> {
  return get(`/accounts/${accountId}/r2/buckets/${bucket}/domains/managed`);
}

export async function putR2PublicAccess(accountId: string, bucket: string, enabled: boolean): Promise<CFResponse<any>> {
  return put(`/accounts/${accountId}/r2/buckets/${bucket}/domains/managed`, { enabled });
}

export interface R2BucketLockRule {
  id: string;
  enabled: boolean;
  prefix?: string;
  condition: any;
}

export async function getR2BucketLocks(accountId: string, bucket: string): Promise<CFResponse<R2BucketLockRule[]>> {
  const res = await getClient().get(`/accounts/${accountId}/r2/buckets/${bucket}/lock`);
  return { success: res.data.success, errors: res.data.errors, messages: [], result: res.data.result?.rules ?? [] };
}

export async function putR2BucketLocks(accountId: string, bucket: string, rules: R2BucketLockRule[]): Promise<CFResponse<any>> {
  return put(`/accounts/${accountId}/r2/buckets/${bucket}/lock`, { rules });
}

// ─── Pages ───────────────────────────────────────────────────────────────────

export async function getPagesProjects(accountId: string): Promise<CFResponse<PagesProject[]>> {
  return get(`/accounts/${accountId}/pages/projects`);
}

export async function getPagesProject(accountId: string, projectName: string): Promise<CFResponse<PagesProject>> {
  return get(`/accounts/${accountId}/pages/projects/${projectName}`);
}

export async function deletePagesProject(accountId: string, projectName: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/pages/projects/${projectName}`);
}

// ─── DNSSEC ──────────────────────────────────────────────────────────────────

export async function getDNSSEC(zoneId: string): Promise<CFResponse<any>> {
  return get(`/zones/${zoneId}/dnssec`);
}

export async function updateDNSSEC(zoneId: string, status: 'active' | 'disabled'): Promise<CFResponse<any>> {
  return patch(`/zones/${zoneId}/dnssec`, { status });
}

// ─── Security Level / Under Attack ──────────────────────────────────────────

export async function getSecurityLevel(zoneId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/settings/security_level`);
}

export async function updateSecurityLevel(zoneId: string, value: string): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/settings/security_level`, { value });
}

// ─── DNS Import (BIND zone file) ─────────────────────────────────────────────

export async function importDnsRecords(zoneId: string, fileUri: string, proxied = false): Promise<CFResponse<{ recs_added: number; total_records_parsed: number }>> {
  const form = new FormData();
  form.append('file', {
    uri: fileUri,
    name: 'records.txt',
    type: 'text/plain',
  } as any);
  form.append('proxied', String(proxied));
  const res = await getClient().post<CFResponse<{ recs_added: number; total_records_parsed: number }>>(
    `/zones/${zoneId}/dns_records/import`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return res.data;
}

// ─── Email Routing ───────────────────────────────────────────────────────────

export interface EmailRoutingSettings {
  id: string;
  enabled: boolean;
  name: string;
  status: string;
}

/** Cloudflare only matches on the recipient, so `field` is always "to". */
export type EmailMatcher = { type: 'all' | 'literal'; field?: 'to'; value?: string };
/** forward → value is a list of verified destinations, worker → script names. */
export type EmailActionType = 'forward' | 'worker' | 'drop';
export type EmailAction = { type: EmailActionType; value?: string[] };

export interface EmailRoutingRule {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
  matchers: EmailMatcher[];
  actions: EmailAction[];
}

export interface DestinationAddress {
  id: string;
  email: string;
  verified: string | null;
}

/** One MX/TXT record Cloudflare needs in the zone for routing to work. */
export interface EmailRoutingDnsRecord {
  type: string;
  name: string;
  content: string;
  priority?: number;
  ttl?: number;
}

export async function getEmailRoutingSettings(zoneId: string): Promise<CFResponse<EmailRoutingSettings>> {
  return get(`/zones/${zoneId}/email/routing`);
}

export async function enableEmailRouting(zoneId: string): Promise<CFResponse<EmailRoutingSettings>> {
  return post(`/zones/${zoneId}/email/routing/enable`);
}

/** Also strips the MX records Cloudflare added when routing was turned on. */
export async function disableEmailRouting(zoneId: string): Promise<CFResponse<EmailRoutingSettings>> {
  return post(`/zones/${zoneId}/email/routing/disable`);
}

/** The MX/TXT records the zone needs before routing can deliver anything. */
export async function getEmailRoutingDns(zoneId: string): Promise<CFResponse<EmailRoutingDnsRecord[]>> {
  return get(`/zones/${zoneId}/email/routing/dns`);
}

export async function getEmailRoutingRules(zoneId: string, page = 1): Promise<CFResponse<EmailRoutingRule[]>> {
  return get(`/zones/${zoneId}/email/routing/rules`, { page, per_page: 50 });
}

export async function createEmailRoutingRule(zoneId: string, rule: {
  name: string;
  enabled: boolean;
  matchers: EmailMatcher[];
  actions: EmailAction[];
  priority?: number;
}): Promise<CFResponse<EmailRoutingRule>> {
  return post(`/zones/${zoneId}/email/routing/rules`, rule);
}

export async function updateEmailRoutingRule(zoneId: string, ruleId: string, rule: Partial<EmailRoutingRule>): Promise<CFResponse<EmailRoutingRule>> {
  return put(`/zones/${zoneId}/email/routing/rules/${ruleId}`, rule);
}

export async function deleteEmailRoutingRule(zoneId: string, ruleId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/email/routing/rules/${ruleId}`);
}

export async function getEmailCatchAll(zoneId: string): Promise<CFResponse<EmailRoutingRule>> {
  return get(`/zones/${zoneId}/email/routing/rules/catch_all`);
}

export async function updateEmailCatchAll(zoneId: string, rule: {
  enabled: boolean;
  matchers: EmailMatcher[];
  actions: EmailAction[];
}): Promise<CFResponse<EmailRoutingRule>> {
  return put(`/zones/${zoneId}/email/routing/rules/catch_all`, rule);
}

export async function getDestinationAddresses(accountId: string, page = 1): Promise<CFResponse<DestinationAddress[]>> {
  return get(`/accounts/${accountId}/email/routing/addresses`, { page, per_page: 50 });
}

export async function createDestinationAddress(accountId: string, email: string): Promise<CFResponse<DestinationAddress>> {
  return post(`/accounts/${accountId}/email/routing/addresses`, { email });
}

export async function deleteDestinationAddress(accountId: string, addressId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/email/routing/addresses/${addressId}`);
}

// ─── Audit Logs ──────────────────────────────────────────────────────────────

export interface AuditLogEntry {
  id: string;
  action: { type: string; result: boolean };
  actor: { email: string; type: string; ip: string };
  resource: { type: string; id: string };
  when: string;
  newValue?: string;
  oldValue?: string;
  metadata?: Record<string, any>;
}

export async function getAuditLogs(accountId: string, page = 1, filters?: { actionType?: string; actorEmail?: string; actorIp?: string; since?: string; before?: string }): Promise<CFResponse<AuditLogEntry[]>> {
  const params: Record<string, any> = { page, per_page: 50, direction: 'desc' };
  if (filters?.actionType) params['action.type'] = filters.actionType;
  if (filters?.actorEmail) params['actor.email'] = filters.actorEmail;
  if (filters?.actorIp) params['actor.ip'] = filters.actorIp;
  if (filters?.since) params.since = filters.since;
  if (filters?.before) params.before = filters.before;
  return get(`/accounts/${accountId}/audit_logs`, params);
}

export async function getUserAuditLogs(page = 1): Promise<CFResponse<AuditLogEntry[]>> {
  return get('/user/audit_logs', { page, per_page: 50, direction: 'desc' });
}

// ─── R2 Objects ──────────────────────────────────────────────────────────────

export interface R2Object {
  key: string;
  size: number;
  etag: string;
  last_modified: string;
  http_metadata?: { contentType?: string };
}

export async function getR2Objects(accountId: string, bucket: string, cursor?: string, prefix?: string): Promise<{
  objects: R2Object[];
  cursor?: string;
  isTruncated: boolean;
}> {
  const params: Record<string, any> = { per_page: 100 };
  if (cursor) params.cursor = cursor;
  if (prefix) params.prefix = prefix;
  const res = await getClient().get(`/accounts/${accountId}/r2/buckets/${bucket}/objects`, { params });
  return {
    objects: res.data?.result ?? [],
    cursor: res.data?.result_info?.cursor,
    isTruncated: res.data?.result_info?.is_truncated ?? false,
  };
}

export async function deleteR2Object(accountId: string, bucket: string, key: string): Promise<void> {
  await getClient().delete(`/accounts/${accountId}/r2/buckets/${bucket}/objects/${encodeURIComponent(key)}`);
}

export async function uploadR2Object(accountId: string, bucket: string, key: string, body: Blob | string, contentType: string): Promise<void> {
  await getClient().put(`/accounts/${accountId}/r2/buckets/${bucket}/objects/${encodeURIComponent(key)}`, body, {
    headers: { 'Content-Type': contentType },
  });
}

export function getR2ObjectUrl(accountId: string, bucket: string, key: string): string {
  return `${API_BASE}/accounts/${accountId}/r2/buckets/${bucket}/objects/${encodeURIComponent(key)}`;
}

export function getAuthHeaders(): Record<string, string> {
  if (!authConfig) return {};
  if ((authConfig.method === 'token' || authConfig.method === 'oauth') && authConfig.apiToken) {
    return { Authorization: `Bearer ${authConfig.apiToken.replace(/\s+/g, '')}` };
  }
  if (authConfig.method === 'global_key' && authConfig.globalKey && authConfig.email) {
    return {
      'X-Auth-Email': authConfig.email.replace(/\s+/g, ''),
      'X-Auth-Key': authConfig.globalKey.replace(/\s+/g, ''),
    };
  }
  return {};
}

// ─── Workers Tail (live logs) ────────────────────────────────────────────────

export interface WorkerTail {
  id: string;
  url: string;
  expires_at: string;
}

export async function createWorkerTail(accountId: string, scriptName: string): Promise<CFResponse<WorkerTail>> {
  return post(`/accounts/${accountId}/workers/scripts/${scriptName}/tails`);
}

export async function deleteWorkerTail(accountId: string, scriptName: string, tailId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/workers/scripts/${scriptName}/tails/${tailId}`);
}

// ─── Argo ────────────────────────────────────────────────────────────────────

export async function getArgoSmartRouting(zoneId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/argo/smart_routing`);
}

export async function updateArgoSmartRouting(zoneId: string, value: 'on' | 'off'): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/argo/smart_routing`, { value });
}

// ─── Health Checks ────────────────────────────────────────────────────────────

export type HealthCheckType = 'HTTP' | 'HTTPS' | 'TCP';
export type HealthCheckStatus = 'unknown' | 'healthy' | 'unhealthy' | 'suspended';

export interface HealthCheckHttpConfig {
  allow_insecure?: boolean;
  expected_body?: string;
  expected_codes?: string[];
  follow_redirects?: boolean;
  header?: Record<string, string[]>;
  method?: 'GET' | 'HEAD';
  path?: string;
  port?: number;
}

export interface HealthCheckTcpConfig {
  method?: 'connection_established';
  port?: number;
}

export interface HealthCheck {
  id: string;
  name: string;
  address: string;
  type: HealthCheckType;
  description?: string;
  status: HealthCheckStatus;
  failure_reason?: string;
  suspended: boolean;
  interval: number;
  retries: number;
  timeout: number;
  consecutive_fails: number;
  consecutive_successes: number;
  check_regions?: string[];
  http_config?: HealthCheckHttpConfig;
  tcp_config?: HealthCheckTcpConfig;
  created_on?: string;
  modified_on?: string;
}

export interface HealthCheckInput {
  name: string;
  address: string;
  type?: HealthCheckType;
  description?: string;
  suspended?: boolean;
  interval?: number;
  retries?: number;
  timeout?: number;
  consecutive_fails?: number;
  consecutive_successes?: number;
  check_regions?: string[];
  http_config?: HealthCheckHttpConfig;
  tcp_config?: HealthCheckTcpConfig;
}

export async function getHealthChecks(zoneId: string): Promise<CFResponse<HealthCheck[]>> {
  return get(`/zones/${zoneId}/healthchecks`);
}

export async function getHealthCheck(zoneId: string, id: string): Promise<CFResponse<HealthCheck>> {
  return get(`/zones/${zoneId}/healthchecks/${id}`);
}

export async function createHealthCheck(zoneId: string, check: HealthCheckInput): Promise<CFResponse<HealthCheck>> {
  return post(`/zones/${zoneId}/healthchecks`, check);
}

export async function updateHealthCheck(zoneId: string, id: string, check: Partial<HealthCheckInput>): Promise<CFResponse<HealthCheck>> {
  return patch(`/zones/${zoneId}/healthchecks/${id}`, check);
}

export async function deleteHealthCheck(zoneId: string, id: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/healthchecks/${id}`);
}

// ─── Lists ────────────────────────────────────────────────────────────────────

export type ListKind = 'ip' | 'redirect' | 'hostname' | 'asn';

export interface CFList {
  id: string;
  name: string;
  kind: ListKind;
  description?: string;
  num_items: number;
  num_referencing_filters: number;
  created_on: string;
  modified_on: string;
}

export interface ListRedirect {
  source_url: string;
  target_url: string;
  status_code?: 301 | 302 | 307 | 308;
  include_subdomains?: boolean;
  subpath_matching?: boolean;
  preserve_query_string?: boolean;
  preserve_path_suffix?: boolean;
}

export interface ListHostname {
  url_hostname: string;
  exclude_exact_hostname?: boolean;
}

/** Exactly one of these is set, matching the list's `kind`. */
export interface ListItemInput {
  ip?: string;
  asn?: number;
  hostname?: ListHostname;
  redirect?: ListRedirect;
  comment?: string;
}

export interface ListItem extends ListItemInput {
  id: string;
  created_on: string;
  modified_on: string;
}

export interface ListBulkOperation {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error?: string;
}

export async function getLists(accountId: string): Promise<CFResponse<CFList[]>> {
  return get(`/accounts/${accountId}/rules/lists`);
}

export async function createList(accountId: string, list: {
  name: string;
  kind: ListKind;
  description?: string;
}): Promise<CFResponse<CFList>> {
  return post(`/accounts/${accountId}/rules/lists`, list);
}

export async function updateList(accountId: string, listId: string, description: string): Promise<CFResponse<CFList>> {
  return put(`/accounts/${accountId}/rules/lists/${listId}`, { description });
}

export async function deleteList(accountId: string, listId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/rules/lists/${listId}`);
}

export async function getListItems(accountId: string, listId: string, cursor?: string): Promise<CFResponse<ListItem[]>> {
  return get(`/accounts/${accountId}/rules/lists/${listId}/items`, cursor ? { cursor, per_page: 100 } : { per_page: 100 });
}

/** Appends items. Asynchronous — returns an operation id to poll, not the items. */
export async function createListItems(accountId: string, listId: string, items: ListItemInput[]): Promise<CFResponse<{ operation_id: string }>> {
  return post(`/accounts/${accountId}/rules/lists/${listId}/items`, items);
}

/** Deleting nothing (`items: []`) clears the whole list. DELETE with a body isn't covered by the shared `del` helper, so this calls the client directly. */
export async function deleteListItems(accountId: string, listId: string, itemIds: string[]): Promise<CFResponse<{ operation_id: string }>> {
  const res = await getClient().delete(
    `/accounts/${accountId}/rules/lists/${listId}/items`,
    { data: { items: itemIds.map((id) => ({ id })) } } as any,
  );
  return res.data;
}

export async function getListBulkOperation(accountId: string, operationId: string): Promise<CFResponse<ListBulkOperation>> {
  return get(`/accounts/${accountId}/rules/lists/bulk_operations/${operationId}`);
}

// ─── Registrar ────────────────────────────────────────────────────────────────

export interface RegistrarTransferIn {
  accept_foa?: 'needed' | 'ok';
  approve_transfer?: 'needed' | 'ok' | 'pending' | 'trying' | 'rejected' | 'unknown';
  can_cancel_transfer?: boolean;
  disable_privacy?: 'needed' | 'ok' | 'unknown';
  enter_auth_code?: 'needed' | 'ok' | 'pending' | 'trying' | 'rejected';
  unlock_domain?: 'needed' | 'ok' | 'pending' | 'trying' | 'unknown';
}

export interface RegistrarDomain {
  id: string;
  available: boolean;
  can_register: boolean;
  current_registrar?: string;
  created_at?: string;
  updated_at?: string;
  expires_at?: string;
  locked: boolean;
  registry_statuses?: string;
  supported_tld: boolean;
  transfer_in?: RegistrarTransferIn;
  // The update endpoint accepts these but the list/get schema in the OpenAPI
  // spec only strongly types them as generic "object" — present when the
  // domain has them set, absent otherwise.
  auto_renew?: boolean;
  privacy?: boolean;
}

export async function getRegistrarDomains(accountId: string): Promise<CFResponse<RegistrarDomain[]>> {
  return get(`/accounts/${accountId}/registrar/domains`);
}

export async function getRegistrarDomain(accountId: string, domainName: string): Promise<CFResponse<RegistrarDomain>> {
  return get(`/accounts/${accountId}/registrar/domains/${domainName}`);
}

export async function updateRegistrarDomain(accountId: string, domainName: string, update: {
  auto_renew?: boolean;
  locked?: boolean;
  privacy?: boolean;
}): Promise<CFResponse<RegistrarDomain>> {
  return put(`/accounts/${accountId}/registrar/domains/${domainName}`, update);
}

// ─── Turnstile ────────────────────────────────────────────────────────────────

export type TurnstileMode = 'non-interactive' | 'invisible' | 'managed';
export type TurnstileClearanceLevel = 'no_clearance' | 'jschallenge' | 'managed' | 'interactive';

export interface TurnstileWidget {
  sitekey: string;
  secret?: string; // only present right after create/rotate, never on list/get
  name: string;
  domains: string[];
  mode: TurnstileMode;
  bot_fight_mode: boolean;
  clearance_level: TurnstileClearanceLevel;
  ephemeral_id: boolean;
  offlabel: boolean;
  region: 'world' | 'china';
  created_on: string;
  modified_on: string;
}

export async function getTurnstileWidgets(accountId: string): Promise<CFResponse<TurnstileWidget[]>> {
  return get(`/accounts/${accountId}/challenges/widgets`);
}

export async function getTurnstileWidget(accountId: string, sitekey: string): Promise<CFResponse<TurnstileWidget>> {
  return get(`/accounts/${accountId}/challenges/widgets/${sitekey}`);
}

export async function createTurnstileWidget(accountId: string, widget: {
  name: string;
  domains: string[];
  mode: TurnstileMode;
  bot_fight_mode?: boolean;
}): Promise<CFResponse<TurnstileWidget>> {
  return post(`/accounts/${accountId}/challenges/widgets`, widget);
}

export async function updateTurnstileWidget(accountId: string, sitekey: string, widget: {
  name: string;
  domains: string[];
  mode: TurnstileMode;
  bot_fight_mode?: boolean;
}): Promise<CFResponse<TurnstileWidget>> {
  return put(`/accounts/${accountId}/challenges/widgets/${sitekey}`, widget);
}

export async function deleteTurnstileWidget(accountId: string, sitekey: string): Promise<CFResponse<TurnstileWidget>> {
  return del(`/accounts/${accountId}/challenges/widgets/${sitekey}`);
}

/** Returns the new secret once; it is never shown again after this call. */
export async function rotateTurnstileSecret(accountId: string, sitekey: string, invalidateImmediately: boolean): Promise<CFResponse<TurnstileWidget>> {
  return post(`/accounts/${accountId}/challenges/widgets/${sitekey}/rotate_secret`, { invalidate_immediately: invalidateImmediately });
}

// ─── API Tokens (user-owned) ──────────────────────────────────────────────────
//
// Scoped to existing tokens: list, view, enable/disable, roll (regenerate the
// secret value), delete. Creating a brand-new token needs a permission-group
// picker (hundreds of groups, resource-scoped policies) that doesn't fit a
// phone screen well — left out, same call as batch 15's registrar scoping.

export interface APITokenPolicy {
  id: string;
  effect: 'allow' | 'deny';
  permission_groups: { id: string; name?: string }[];
  resources: Record<string, string>;
}

export interface APITokenCondition {
  request_ip?: { in?: string[]; not_in?: string[] };
}

export type APITokenStatus = 'active' | 'disabled' | 'expired';

export interface APIToken {
  id: string;
  name: string;
  status: APITokenStatus;
  policies: APITokenPolicy[];
  condition?: APITokenCondition;
  issued_on?: string;
  modified_on?: string;
  last_used_on?: string;
  expires_on?: string;
  not_before?: string;
  value?: string; // only present in the create response
}

export async function getAPITokens(): Promise<CFResponse<APIToken[]>> {
  return get('/user/tokens');
}

export async function getAPIToken(tokenId: string): Promise<CFResponse<APIToken>> {
  return get(`/user/tokens/${tokenId}`);
}

/**
 * PUT replaces the token, so this sends every field the token already has
 * (fetched by the caller) with just `status` changed — a partial body risks
 * the API dropping policies it wasn't told to keep.
 */
export async function updateAPIToken(tokenId: string, token: APIToken): Promise<CFResponse<APIToken>> {
  return put(`/user/tokens/${tokenId}`, token);
}

export async function deleteAPIToken(tokenId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/user/tokens/${tokenId}`);
}

/** Regenerates the secret value. Returns it once; it is never shown again. */
export async function rollAPIToken(tokenId: string): Promise<CFResponse<string>> {
  const res = await getClient().put<CFResponse<string>>(`/user/tokens/${tokenId}/value`, {});
  return res.data;
}

// ─── Pages Deployments ────────────────────────────────────────────────────────

export type PagesDeployStage = 'queued' | 'initialize' | 'clone_repo' | 'build' | 'deploy';
export type PagesDeployStageStatus = 'success' | 'idle' | 'active' | 'failure' | 'canceled';

export interface PagesDeploymentStage {
  name: PagesDeployStage;
  status: PagesDeployStageStatus;
  started_on?: string;
  ended_on?: string;
}

export interface PagesDeployment {
  id: string;
  short_id: string;
  project_id: string;
  project_name: string;
  environment: 'preview' | 'production';
  url: string;
  created_on: string;
  modified_on: string;
  is_skipped: boolean;
  skip_reason?: string;
  latest_stage: PagesDeploymentStage;
  stages: PagesDeploymentStage[];
  deployment_trigger: {
    type: 'github:push' | 'ad_hoc' | 'deploy_hook';
    metadata?: { branch?: string; commit_hash?: string; commit_message?: string; commit_dirty?: boolean };
  };
  aliases?: string[];
}

export async function getPagesDeployments(accountId: string, projectName: string): Promise<CFResponse<PagesDeployment[]>> {
  return get(`/accounts/${accountId}/pages/projects/${projectName}/deployments`);
}

export async function getPagesDeployment(accountId: string, projectName: string, deploymentId: string): Promise<CFResponse<PagesDeployment>> {
  return get(`/accounts/${accountId}/pages/projects/${projectName}/deployments/${deploymentId}`);
}

export async function deletePagesDeployment(accountId: string, projectName: string, deploymentId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/pages/projects/${projectName}/deployments/${deploymentId}`);
}

export async function retryPagesDeployment(accountId: string, projectName: string, deploymentId: string): Promise<CFResponse<PagesDeployment>> {
  return post(`/accounts/${accountId}/pages/projects/${projectName}/deployments/${deploymentId}/retry`);
}

/** Creates a new deployment that re-serves an earlier one's build output. */
export async function rollbackPagesDeployment(accountId: string, projectName: string, deploymentId: string): Promise<CFResponse<PagesDeployment>> {
  return post(`/accounts/${accountId}/pages/projects/${projectName}/deployments/${deploymentId}/rollback`);
}

export async function getPagesDeploymentLogs(accountId: string, projectName: string, deploymentId: string): Promise<CFResponse<{ data: string[] }>> {
  return get(`/accounts/${accountId}/pages/projects/${projectName}/deployments/${deploymentId}/history/logs`);
}

// ─── Pages Custom Domains ─────────────────────────────────────────────────────

export type PagesDomainStatus = 'initializing' | 'pending' | 'active' | 'deactivated' | 'blocked' | 'error';

export interface PagesDomain {
  id: string;
  domain_id: string;
  name: string;
  status: PagesDomainStatus;
  certificate_authority: 'google' | 'lets_encrypt';
  zone_tag: string;
  created_on: string;
  validation_data: {
    method: 'http' | 'txt';
    status: string;
    txt_name?: string;
    txt_value?: string;
    error_message?: string;
  };
  verification_data: { status: string; error_message?: string };
}

export async function getPagesDomains(accountId: string, projectName: string): Promise<CFResponse<PagesDomain[]>> {
  return get(`/accounts/${accountId}/pages/projects/${projectName}/domains`);
}

export async function addPagesDomain(accountId: string, projectName: string, name: string): Promise<CFResponse<PagesDomain>> {
  return post(`/accounts/${accountId}/pages/projects/${projectName}/domains`, { name });
}

export async function deletePagesDomain(accountId: string, projectName: string, domainName: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/pages/projects/${projectName}/domains/${domainName}`);
}

// ─── Zone Cache Settings ──────────────────────────────────────────────────────
//
// `variants` (per-image-format MIME overrides) is left out — it's a config
// object keyed by 11 image formats that almost no zone customizes; the other
// two settings below cover the actual scope ask (tiered cache, cache reserve).

export interface CacheReserveClearStatus {
  id: 'cache_reserve_clear';
  state: 'In-progress' | 'Completed';
  start_ts: string;
  end_ts?: string;
  modified_on?: string;
}

export async function getCacheReserve(zoneId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/cache/cache_reserve`);
}

export async function updateCacheReserve(zoneId: string, value: 'on' | 'off'): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/cache/cache_reserve`, { value });
}

export async function getCacheReserveClearStatus(zoneId: string): Promise<CFResponse<CacheReserveClearStatus>> {
  return get(`/zones/${zoneId}/cache/cache_reserve_clear`);
}

/** Starts an async job; poll getCacheReserveClearStatus for progress. */
export async function startCacheReserveClear(zoneId: string): Promise<CFResponse<CacheReserveClearStatus>> {
  return post(`/zones/${zoneId}/cache/cache_reserve_clear`);
}

export async function getRegionalTieredCache(zoneId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/cache/regional_tiered_cache`);
}

export async function updateRegionalTieredCache(zoneId: string, value: 'on' | 'off'): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/cache/regional_tiered_cache`, { value });
}

// ─── Notification Policies & Webhooks ────────────────────────────────────────
//
// Scoped to managing existing policies (list, toggle, delete) and webhook
// destinations (full CRUD). Creating a new policy needs an alert-type picker
// backed by a filter shape that differs per alert type — dozens of possible
// filter fields across dozens of alert types — which doesn't fit a mobile
// form well; left out rather than building a picker that only covers a
// handful of the alert types and silently fails on the rest.

export interface NotificationMechanisms {
  email?: { id: string }[];
  webhooks?: { id: string }[];
  pagerduty?: { id: string }[];
}

export interface NotificationPolicy {
  id: string;
  name: string;
  description?: string;
  alert_type: string;
  enabled: boolean;
  mechanisms: NotificationMechanisms;
  filters?: Record<string, unknown>;
  created?: string;
  modified?: string;
}

export async function getNotificationPolicies(accountId: string): Promise<CFResponse<NotificationPolicy[]>> {
  return get(`/accounts/${accountId}/alerting/v3/policies`);
}

/**
 * PUT replaces the policy, so this sends every field the policy already has
 * (fetched by the caller) with just `enabled` changed.
 */
export async function updateNotificationPolicy(accountId: string, policyId: string, policy: NotificationPolicy): Promise<CFResponse<NotificationPolicy>> {
  return put(`/accounts/${accountId}/alerting/v3/policies/${policyId}`, policy);
}

export async function deleteNotificationPolicy(accountId: string, policyId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/alerting/v3/policies/${policyId}`);
}

export type WebhookType = 'datadog' | 'discord' | 'feishu' | 'gchat' | 'generic' | 'opsgenie' | 'slack' | 'splunk';

export interface NotificationWebhook {
  id: string;
  name: string;
  url: string;
  type?: WebhookType;
  secret?: string;
  created_at?: string;
  last_success?: string;
  last_failure?: string;
}

export async function getNotificationWebhooks(accountId: string): Promise<CFResponse<NotificationWebhook[]>> {
  return get(`/accounts/${accountId}/alerting/v3/destinations/webhooks`);
}

export async function createNotificationWebhook(accountId: string, webhook: {
  name: string;
  url: string;
  secret?: string;
}): Promise<CFResponse<{ id: string }>> {
  return post(`/accounts/${accountId}/alerting/v3/destinations/webhooks`, webhook);
}

export async function deleteNotificationWebhook(accountId: string, webhookId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/alerting/v3/destinations/webhooks/${webhookId}`);
}

// ─── Cloudflare Tunnel ───────────────────────────────────────────────────────

export interface CloudflareTunnel {
  id: string;
  account_id: string;
  name: string;
  tunnel_secret?: string;
  created_at: string;
  deleted_at?: string;
  status?: string;
  conns_active?: number;
  conns_never_activated?: boolean;
  connections?: { id: string; client_id: string; client_version: string; opened_at: string; origin_ip: string; city: string; country: string; colo_name: string }[];
}

export interface TunnelIngressRule {
  hostname?: string;
  path?: string;
  service: string;
  originRequest?: Record<string, any>;
}

export interface TunnelConfiguration {
  account_id: string;
  tunnel_id: string;
  source: 'local' | 'cloudflare';
  created_at: string;
  version: number;
  config: {
    ingress: TunnelIngressRule[];
    originRequest?: Record<string, any>;
    'warp-routing'?: { enabled: boolean };
  };
}

export async function getTunnels(accountId: string, page = 1): Promise<CFResponse<CloudflareTunnel[]>> {
  return get(`/accounts/${accountId}/cfd_tunnel`, { page, per_page: 50 });
}

export async function getTunnel(accountId: string, tunnelId: string): Promise<CFResponse<CloudflareTunnel>> {
  return get(`/accounts/${accountId}/cfd_tunnel/${tunnelId}`);
}

export async function createTunnel(accountId: string, name: string, tunnel_secret?: string): Promise<CFResponse<CloudflareTunnel>> {
  const body: Record<string, any> = { name };
  if (tunnel_secret) body.tunnel_secret = tunnel_secret;
  return post(`/accounts/${accountId}/cfd_tunnel`, body);
}

export async function updateTunnel(accountId: string, tunnelId: string, name?: string): Promise<CFResponse<CloudflareTunnel>> {
  return patch(`/accounts/${accountId}/cfd_tunnel/${tunnelId}`, { name });
}

export async function deleteTunnel(accountId: string, tunnelId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/cfd_tunnel/${tunnelId}`);
}

export async function getTunnelConnections(accountId: string, tunnelId: string): Promise<CFResponse<any[]>> {
  return get(`/accounts/${accountId}/cfd_tunnel/${tunnelId}/connections`);
}

export async function getTunnelToken(accountId: string, tunnelId: string): Promise<CFResponse<string>> {
  return get(`/accounts/${accountId}/cfd_tunnel/${tunnelId}/token`);
}

export async function getTunnelConfig(accountId: string, tunnelId: string): Promise<CFResponse<TunnelConfiguration>> {
  return get(`/accounts/${accountId}/cfd_tunnel/${tunnelId}/configurations`);
}

export async function putTunnelConfig(accountId: string, tunnelId: string, config: TunnelConfiguration['config']): Promise<CFResponse<TunnelConfiguration>> {
  return put(`/accounts/${accountId}/cfd_tunnel/${tunnelId}/configurations`, { config });
}

// ─── Custom Hostnames (SaaS) ──────────────────────────────────────────────────
//
// SSL creation options are scoped to the common case (Cloudflare-managed cert,
// DCV method, optional wildcard). `custom_certificate` / `custom_cert_bundle`
// (bring-your-own cert, PEM upload) are a separate oneOf branch in the schema
// and left out — pasting a PEM cert/key pair isn't a great mobile flow.

export type CustomHostnameStatus =
  | 'active' | 'pending' | 'active_redeploying' | 'moved' | 'pending_deletion'
  | 'deleted' | 'pending_blocked' | 'pending_migration';

export type DcvMethod = 'http' | 'txt' | 'email';

export interface CustomHostnameSsl {
  method?: DcvMethod;
  type?: 'dv';
  wildcard?: boolean;
  bundle_method?: 'ubiquitous' | 'optimal' | 'force';
  status?: string;
}

export interface CustomHostname {
  id: string;
  hostname: string;
  status: CustomHostnameStatus;
  custom_origin_server?: string;
  custom_origin_sni?: string;
  ssl?: CustomHostnameSsl;
  ownership_verification?: { type?: string; name?: string; value?: string };
  ownership_verification_http?: { http_url?: string; http_body?: string };
  verification_errors?: string[];
  created_at?: string;
}

export async function getCustomHostnames(zoneId: string): Promise<CFResponse<CustomHostname[]>> {
  return get(`/zones/${zoneId}/custom_hostnames`);
}

export async function getCustomHostname(zoneId: string, id: string): Promise<CFResponse<CustomHostname>> {
  return get(`/zones/${zoneId}/custom_hostnames/${id}`);
}

export async function createCustomHostname(zoneId: string, input: {
  hostname: string;
  custom_origin_server?: string;
  ssl?: CustomHostnameSsl;
}): Promise<CFResponse<CustomHostname>> {
  return post(`/zones/${zoneId}/custom_hostnames`, input);
}

export async function deleteCustomHostname(zoneId: string, id: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/custom_hostnames/${id}`);
}

// ─── Zone Snippets ────────────────────────────────────────────────────────────
//
// Uploading a snippet's code is a multipart/form-data request carrying actual
// JS module files — not something worth building a mobile code editor for.
// Scoped to: list/delete existing snippets, and full management of snippet
// rules (which existing snippet runs for which request, by expression) since
// that only needs a snippet name and an expression string.

export interface ZoneSnippet {
  snippet_name: string;
  created_on: string;
  modified_on: string;
}

export interface SnippetRule {
  id?: string;
  snippet_name: string;
  expression: string;
  description?: string;
  enabled: boolean;
  last_updated?: string;
}

export async function getZoneSnippets(zoneId: string): Promise<CFResponse<ZoneSnippet[]>> {
  return get(`/zones/${zoneId}/snippets`);
}

export async function deleteZoneSnippet(zoneId: string, snippetName: string): Promise<CFResponse<any>> {
  return del(`/zones/${zoneId}/snippets/${snippetName}`);
}

export async function getSnippetRules(zoneId: string): Promise<CFResponse<SnippetRule[]>> {
  return get(`/zones/${zoneId}/snippets/snippet_rules`);
}

/** Replaces the whole rules list — send every rule you want kept, not just the changed one. */
export async function putSnippetRules(zoneId: string, rules: SnippetRule[]): Promise<CFResponse<SnippetRule[]>> {
  return put(`/zones/${zoneId}/snippets/snippet_rules`, { rules });
}

export async function deleteSnippetRules(zoneId: string): Promise<CFResponse<any>> {
  return del(`/zones/${zoneId}/snippets/snippet_rules`);
}

// ─── Page Shield ──────────────────────────────────────────────────────────────
//
// Scoped to settings, connections (read-only monitoring data), cookies
// (read-only monitoring data), and policy CRUD. Single-item GETs
// (connection/cookie/policy by id) are skipped — the list responses already
// carry every field the detail view would show.

export interface PageShieldSettings {
  enabled: boolean;
  use_cloudflare_reporting_endpoint: boolean;
  use_connection_url_path: boolean;
  updated_at?: string;
}

export interface PageShieldConnection {
  id: string;
  host: string;
  url: string;
  first_seen_at: string;
  last_seen_at: string;
  added_at: string;
  url_contains_cdn_cgi_path: boolean;
  url_reported_malicious?: boolean;
  domain_reported_malicious?: boolean;
  malicious_url_categories?: string[];
  malicious_domain_categories?: string[];
  first_page_url?: string;
  page_urls?: string[];
}

export interface PageShieldCookie {
  id: string;
  name: string;
  host: string;
  type: 'first_party' | 'unknown';
  first_seen_at: string;
  last_seen_at: string;
  domain_attribute?: string;
  path_attribute?: string;
  expires_attribute?: string;
  max_age_attribute?: number;
  same_site_attribute?: 'lax' | 'strict' | 'none';
  secure_attribute?: boolean;
  http_only_attribute?: boolean;
  page_urls?: string[];
}

export type PageShieldPolicyAction = 'allow' | 'log' | 'add_reporting_directives';

export interface PageShieldPolicy {
  id: string;
  description: string;
  enabled: boolean;
  expression: string;
  action: PageShieldPolicyAction;
  value: string;
}

export async function getPageShieldSettings(zoneId: string): Promise<CFResponse<PageShieldSettings>> {
  return get(`/zones/${zoneId}/page_shield`);
}

export async function updatePageShieldSettings(zoneId: string, settings: Partial<PageShieldSettings>): Promise<CFResponse<PageShieldSettings>> {
  return put(`/zones/${zoneId}/page_shield`, settings);
}

export async function getPageShieldConnections(zoneId: string): Promise<CFResponse<PageShieldConnection[]>> {
  return get(`/zones/${zoneId}/page_shield/connections`, { per_page: 50 });
}

export async function getPageShieldCookies(zoneId: string): Promise<CFResponse<PageShieldCookie[]>> {
  return get(`/zones/${zoneId}/page_shield/cookies`, { per_page: 50 });
}

export async function getPageShieldPolicies(zoneId: string): Promise<CFResponse<PageShieldPolicy[]>> {
  return get(`/zones/${zoneId}/page_shield/policies`);
}

export async function createPageShieldPolicy(zoneId: string, policy: {
  description: string;
  enabled: boolean;
  expression: string;
  action: PageShieldPolicyAction;
  value: string;
}): Promise<CFResponse<PageShieldPolicy>> {
  return post(`/zones/${zoneId}/page_shield/policies`, policy);
}

export async function updatePageShieldPolicy(zoneId: string, policyId: string, policy: Partial<PageShieldPolicy>): Promise<CFResponse<PageShieldPolicy>> {
  return put(`/zones/${zoneId}/page_shield/policies/${policyId}`, policy);
}

export async function deletePageShieldPolicy(zoneId: string, policyId: string): Promise<CFResponse<any>> {
  return del(`/zones/${zoneId}/page_shield/policies/${policyId}`);
}

// ─── Load Balancers ──────────────────────────────────────────────────────────

export interface LBPool {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  minimum_origins: number;
  monitor: string;
  origins: { name: string; address: string; enabled: boolean; weight: number; header?: { Host: string[] } }[];
  check_regions?: string[];
  latitude?: number;
  longitude?: number;
  notification_email?: string;
  created_on?: string;
  modified_on?: string;
}

export interface LBMonitor {
  id: string;
  type: 'http' | 'https' | 'tcp' | 'udp_icmp' | 'icmp_ping' | 'smtp';
  description: string;
  method: string;
  path: string;
  port: number;
  timeout: number;
  interval: number;
  retries: number;
  expected_codes: string;
  expected_body: string;
  allow_insecure: boolean;
  follow_redirects: boolean;
  consecutive_down: number;
  consecutive_up: number;
  created_on?: string;
  modified_on?: string;
}

export interface LoadBalancer {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  ttl: number;
  fallback_pool: string;
  default_pools: string[];
  steering_policy: string;
  proxied: boolean;
  session_affinity: string;
  created_on?: string;
  modified_on?: string;
}

export async function getLBPools(accountId: string): Promise<CFResponse<LBPool[]>> {
  return get(`/accounts/${accountId}/load_balancers/pools`);
}

export async function getLBPool(accountId: string, poolId: string): Promise<CFResponse<LBPool>> {
  return get(`/accounts/${accountId}/load_balancers/pools/${poolId}`);
}

export async function createLBPool(accountId: string, pool: Partial<LBPool>): Promise<CFResponse<LBPool>> {
  return post(`/accounts/${accountId}/load_balancers/pools`, pool);
}

export async function updateLBPool(accountId: string, poolId: string, pool: Partial<LBPool>): Promise<CFResponse<LBPool>> {
  return put(`/accounts/${accountId}/load_balancers/pools/${poolId}`, pool);
}

export async function deleteLBPool(accountId: string, poolId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/load_balancers/pools/${poolId}`);
}

export async function getLBMonitors(accountId: string): Promise<CFResponse<LBMonitor[]>> {
  return get(`/accounts/${accountId}/load_balancers/monitors`);
}

export async function getLBMonitor(accountId: string, monitorId: string): Promise<CFResponse<LBMonitor>> {
  return get(`/accounts/${accountId}/load_balancers/monitors/${monitorId}`);
}

export async function createLBMonitor(accountId: string, monitor: Partial<LBMonitor>): Promise<CFResponse<LBMonitor>> {
  return post(`/accounts/${accountId}/load_balancers/monitors`, monitor);
}

export async function updateLBMonitor(accountId: string, monitorId: string, monitor: Partial<LBMonitor>): Promise<CFResponse<LBMonitor>> {
  return put(`/accounts/${accountId}/load_balancers/monitors/${monitorId}`, monitor);
}

export async function deleteLBMonitor(accountId: string, monitorId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/load_balancers/monitors/${monitorId}`);
}

export async function getLoadBalancers(accountId: string): Promise<CFResponse<LoadBalancer[]>> {
  return get(`/accounts/${accountId}/load_balancers`);
}

export async function getLoadBalancer(accountId: string, lbId: string): Promise<CFResponse<LoadBalancer>> {
  return get(`/accounts/${accountId}/load_balancers/${lbId}`);
}

export async function createLoadBalancer(accountId: string, lb: Partial<LoadBalancer>): Promise<CFResponse<LoadBalancer>> {
  return post(`/accounts/${accountId}/load_balancers`, lb);
}

export async function updateLoadBalancer(accountId: string, lbId: string, lb: Partial<LoadBalancer>): Promise<CFResponse<LoadBalancer>> {
  return put(`/accounts/${accountId}/load_balancers/${lbId}`, lb);
}

export async function deleteLoadBalancer(accountId: string, lbId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/load_balancers/${lbId}`);
}

// ─── Origin CA Certificates ───────────────────────────────────────────────────
//
// A CSR (Certificate Signing Request) carries no private key material —
// unlike a full cert+key pair, pasting one in is a normal, safe workflow
// (it's what `openssl req` or any cert tool spits out for the user to hand to
// a CA). Full CRUD is in scope for that reason, unlike the PEM-cert-pair
// uploads skipped elsewhere (custom hostnames, mTLS below).

export type OriginCARequestType = 'origin-rsa' | 'origin-ecc' | 'keyless-certificate';
export type OriginCAValidityDays = 7 | 30 | 90 | 365 | 730 | 1095 | 5475;

export interface OriginCACertificate {
  id: string;
  csr: string;
  certificate?: string;
  hostnames: string[];
  request_type: OriginCARequestType;
  requested_validity: OriginCAValidityDays;
  expires_on?: string;
}

/** Origin CA is account-agnostic in the API (no account/zone in the path) — filtered by the `zone_id` query param instead. */
export async function getOriginCACertificates(zoneId: string): Promise<CFResponse<OriginCACertificate[]>> {
  return get(`/certificates`, { zone_id: zoneId });
}

export async function createOriginCACertificate(cert: {
  csr: string;
  hostnames: string[];
  request_type: OriginCARequestType;
  requested_validity?: OriginCAValidityDays;
}): Promise<CFResponse<OriginCACertificate>> {
  return post(`/certificates`, cert);
}

export async function revokeOriginCACertificate(certificateId: string): Promise<CFResponse<{ id: string; revoked_at?: string }>> {
  return del(`/certificates/${certificateId}`);
}

// ─── Certificate Packs (Advanced Certificate Manager) ────────────────────────
//
// View/manage only — ordering a new pack is a paid product (Advanced
// Certificate Manager) with a validation-method + hosts + CA choice form on
// top of a billing decision; out of scope, same reasoning as skipping domain
// registration purchase in batch 15.

export type CertPackStatus =
  | 'initializing' | 'pending_validation' | 'deleted' | 'pending_issuance'
  | 'pending_deployment' | 'pending_deletion' | 'pending_expiration' | 'expired';

export interface CertificatePack {
  id: string;
  type: string;
  status: CertPackStatus;
  hosts: string[];
  certificate_authority?: string;
  validation_method?: 'txt' | 'http' | 'email';
  validity_days?: number;
  validation_errors?: { message: string }[];
}

export async function getCertificatePacks(zoneId: string): Promise<CFResponse<CertificatePack[]>> {
  return get(`/zones/${zoneId}/ssl/certificate_packs`);
}

export async function deleteCertificatePack(zoneId: string, packId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/ssl/certificate_packs/${packId}`);
}

// ─── mTLS Certificates ────────────────────────────────────────────────────────
//
// View/manage only — uploading one needs the actual certificate and
// optionally its private key pasted in, which is a different risk profile
// than a CSR (no private key) and not a flow worth building for mobile.

export interface MtlsCertificate {
  id: string;
  name?: string;
  ca: boolean;
  certificates: string;
  issuer?: string;
  serial_number?: string;
  type: 'custom' | 'gateway_managed' | 'access_managed';
  expires_on?: string;
  uploaded_on?: string;
}

export async function getMtlsCertificates(accountId: string): Promise<CFResponse<MtlsCertificate[]>> {
  return get(`/accounts/${accountId}/mtls_certificates`);
}

export async function deleteMtlsCertificate(accountId: string, certId: string): Promise<CFResponse<MtlsCertificate>> {
  return del(`/accounts/${accountId}/mtls_certificates/${certId}`);
}

// ─── Waiting Room ────────────────────────────────────────────────────────────

export interface WaitingRoom {
  id: string;
  name: string;
  host: string;
  path: string;
  description: string;
  enabled: boolean;
  suspended: boolean;
  queue_all: boolean;
  new_users_per_minute: number;
  total_active_users: number;
  session_duration: number;
  queueing_method: string;
  queueing_status_code: number;
  json_response_enabled: boolean;
  disable_session_renewal: boolean;
  custom_page_html: string;
  created_on?: string;
  modified_on?: string;
}

export interface WaitingRoomStatus {
  status: 'queueing' | 'running';
  estimated_queue_minutes: number;
  estimated_queue_time: string;
  queue_length: number;
}

export async function getWaitingRooms(zoneId: string): Promise<CFResponse<WaitingRoom[]>> {
  return get(`/zones/${zoneId}/waiting_rooms`);
}

export async function getWaitingRoom(zoneId: string, roomId: string): Promise<CFResponse<WaitingRoom>> {
  return get(`/zones/${zoneId}/waiting_rooms/${roomId}`);
}

export async function createWaitingRoom(zoneId: string, room: Partial<WaitingRoom>): Promise<CFResponse<WaitingRoom>> {
  return post(`/zones/${zoneId}/waiting_rooms`, room);
}

export async function updateWaitingRoom(zoneId: string, roomId: string, room: Partial<WaitingRoom>): Promise<CFResponse<WaitingRoom>> {
  return patch(`/zones/${zoneId}/waiting_rooms/${roomId}`, room);
}

export async function deleteWaitingRoom(zoneId: string, roomId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/waiting_rooms/${roomId}`);
}

export async function getWaitingRoomStatus(zoneId: string, roomId: string): Promise<CFResponse<WaitingRoomStatus>> {
  return get(`/zones/${zoneId}/waiting_rooms/${roomId}/status`);
}

// ─── Zaraz ─────────────────────────────────────────────────────────────────────
//
// The full config object is enormous — `tools`/`triggers`/`variables` are
// free-form maps keyed by ID, where each tool's shape differs per the 60+
// tool types Zaraz supports (analytics pixels, ad platforms, custom scripts,
// ...). Building per-tool-type forms for all of them is its own project, not
// one batch. Scoped to a read-only overview, a handful of safe top-level
// flag toggles (each done by fetching the full config, flipping one field,
// and PUTting the whole thing back — the endpoint has no partial-update
// mode), and history list/restore.

export interface ZarazConfig {
  dataLayer: boolean;
  debugKey: string;
  historyChange?: boolean;
  analytics?: { enabled?: boolean; defaultPurpose?: string; sessionExpTime?: number };
  consent?: { enabled: boolean; companyName?: string; cookieName?: string };
  settings: { autoInjectScript: boolean; [k: string]: unknown };
  triggers: Record<string, unknown>;
  variables: Record<string, unknown>;
  tools?: Record<string, unknown>;
  zarazVersion: number;
}

export interface ZarazHistoryEntry {
  id: number;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export async function getZarazConfig(zoneId: string): Promise<CFResponse<ZarazConfig>> {
  return get(`/zones/${zoneId}/settings/zaraz/config`);
}

/** PUT replaces the whole config — send the full object back with only the field(s) you changed. */
export async function updateZarazConfig(zoneId: string, config: ZarazConfig): Promise<CFResponse<ZarazConfig>> {
  return put(`/zones/${zoneId}/settings/zaraz/config`, config);
}

export async function getZarazHistory(zoneId: string): Promise<CFResponse<ZarazHistoryEntry[]>> {
  return get(`/zones/${zoneId}/settings/zaraz/history`, { limit: 20, sortField: 'updatedAt', sortOrder: 'DESC' });
}

export async function restoreZarazHistory(zoneId: string, configId: number): Promise<CFResponse<ZarazConfig>> {
  return put(`/zones/${zoneId}/settings/zaraz/history`, configId);
}

// ─── Logpush (zone-level) ─────────────────────────────────────────────────────
//
// Scoped to managing existing jobs: list, toggle enabled, delete. Creating a
// job needs `destination_conf` — a URI for an S3/GCS/etc bucket with
// credentials embedded — plus an ownership-challenge round trip to prove you
// control that destination. That's a per-provider setup best done once via
// the dashboard or `wrangler`, not a mobile form. Account-level Logpush
// (a separate but identical-shaped 12-endpoint product) is left for a
// follow-up batch rather than doubling this one's scope.

export type LogpushDataset =
  | 'access_requests' | 'audit_logs' | 'audit_logs_v2' | 'biso_user_actions'
  | 'casb_findings' | 'device_posture_results' | 'dex_application_tests'
  | 'dex_device_state_events' | 'http_requests' | 'firewall_events' | 'dns_logs';

export interface LogpushJob {
  id: number;
  name?: string;
  dataset?: LogpushDataset;
  destination_conf: string;
  enabled: boolean;
  error_message?: string;
  last_complete?: string;
  last_error?: string;
  frequency?: 'high' | 'low';
}

export async function getLogpushJobs(zoneId: string): Promise<CFResponse<LogpushJob[]>> {
  return get(`/zones/${zoneId}/logpush/jobs`);
}

export async function getLogpushJob(zoneId: string, jobId: number): Promise<CFResponse<LogpushJob>> {
  return get(`/zones/${zoneId}/logpush/jobs/${jobId}`);
}

export async function updateLogpushJob(zoneId: string, jobId: number, update: { enabled?: boolean }): Promise<CFResponse<LogpushJob>> {
  return put(`/zones/${zoneId}/logpush/jobs/${jobId}`, update);
}

export async function deleteLogpushJob(zoneId: string, jobId: number): Promise<CFResponse<{ id: number }>> {
  return del(`/zones/${zoneId}/logpush/jobs/${jobId}`);
}

// ─── Web Analytics ───────────────────────────────────────────────────────────

export interface WebAnalyticsSite {
  site_tag: string;
  site_token: string;
  snippet: string;
  auto_install: boolean;
  host?: string;
  zone_tag?: string;
  created?: string;
  rules?: WebAnalyticsRule[];
  ruleset?: { id: string; enabled: boolean; zone_tag: string; zone_name: string };
}

export interface WebAnalyticsRule {
  id: string;
  host: string;
  paths: string[];
  inclusive: boolean;
  is_paused: boolean;
  priority: number;
  created?: string;
}

export async function getWebAnalyticsSites(accountId: string, page = 1): Promise<CFResponse<WebAnalyticsSite[]>> {
  return get(`/accounts/${accountId}/rum/site_info/list`, { page, per_page: 50 });
}

export async function getWebAnalyticsSite(accountId: string, siteId: string): Promise<CFResponse<WebAnalyticsSite>> {
  return get(`/accounts/${accountId}/rum/site_info/${siteId}`);
}

export async function createWebAnalyticsSite(accountId: string, site: { host?: string; zone_tag?: string; auto_install?: boolean }): Promise<CFResponse<WebAnalyticsSite>> {
  return post(`/accounts/${accountId}/rum/site_info`, site);
}

export async function updateWebAnalyticsSite(accountId: string, siteId: string, site: { host?: string; zone_tag?: string; auto_install?: boolean; enabled?: boolean; lite?: boolean }): Promise<CFResponse<WebAnalyticsSite>> {
  return put(`/accounts/${accountId}/rum/site_info/${siteId}`, site);
}

export async function deleteWebAnalyticsSite(accountId: string, siteId: string): Promise<CFResponse<{ site_tag: string }>> {
  return del(`/accounts/${accountId}/rum/site_info/${siteId}`);
}

// ─── Log Explorer (zone-level) ────────────────────────────────────────────────
//
// Zone-scoped only — the account-level product (`docs/cf-api/log-explorer-*`
// also has account paths) is the same shape and left for a follow-up rather
// than doubling this batch. Query results are `object[]` with no fixed shape
// in the schema (arbitrary log rows per dataset) — typed loosely on purpose.

export interface LogExplorerField {
  name: string;
  enabled: boolean;
}

export interface LogExplorerDataset {
  dataset_id: string;
  dataset: string;
  object_id: string;
  object_type: 'account' | 'zone';
  enabled: boolean;
  created_at: string;
  updated_at: string;
  fields?: LogExplorerField[];
}

export interface LogExplorerAvailableDataset {
  dataset: string;
  object_type: 'account' | 'zone';
  timestamp_field: string;
  schema: { properties?: Record<string, unknown>; required?: string[] };
}

export async function getLogExplorerDatasets(zoneId: string): Promise<CFResponse<LogExplorerDataset[]>> {
  return get(`/zones/${zoneId}/logs/explorer/datasets`);
}

export async function getAvailableLogExplorerDatasets(zoneId: string): Promise<CFResponse<LogExplorerAvailableDataset[]>> {
  return get(`/zones/${zoneId}/logs/explorer/datasets/available`);
}

export async function createLogExplorerDataset(zoneId: string, dataset: string): Promise<CFResponse<LogExplorerDataset>> {
  return post(`/zones/${zoneId}/logs/explorer/datasets`, { dataset });
}

export async function updateLogExplorerDataset(zoneId: string, datasetId: string, enabled: boolean): Promise<CFResponse<LogExplorerDataset>> {
  return put(`/zones/${zoneId}/logs/explorer/datasets/${datasetId}`, { enabled });
}

/** SQL-like query language over the ingested log data. */
export async function runLogExplorerQuery(zoneId: string, query: string): Promise<CFResponse<Record<string, unknown>[]>> {
  return get(`/zones/${zoneId}/logs/explorer/query/sql`, { query });
}

// ─── Observatory ─────────────────────────────────────────────────────────────

/** Paths take the tested URL as one path segment, so it is always encoded. */
const speedUrl = (url: string) => encodeURIComponent(url);

export interface ObservatoryRegion {
  label: string;
  value: string;
}

export type ObservatoryDevice = 'DESKTOP' | 'MOBILE';
export type ObservatoryFrequency = 'DAILY' | 'WEEKLY';

export interface ObservatoryReport {
  cls?: number;
  fcp?: number;
  lcp?: number;
  si?: number;
  tbt?: number;
  ttfb?: number;
  tti?: number;
  performanceScore?: number;
  state?: 'RUNNING' | 'COMPLETE' | 'FAILED';
  deviceType?: ObservatoryDevice;
  jsonReportUrl?: string;
  error?: {
    code?: 'NOT_REACHABLE' | 'DNS_FAILURE' | 'NOT_HTML' | 'LIGHTHOUSE_TIMEOUT' | 'UNKNOWN';
    detail?: string;
    finalDisplayedUrl?: string;
  };
}

export interface ObservatoryTest {
  id: string;
  date: string;
  url: string;
  region: ObservatoryRegion;
  scheduleFrequency?: ObservatoryFrequency;
  desktopReport?: ObservatoryReport;
  mobileReport?: ObservatoryReport;
}

export interface ObservatoryPage {
  url: string;
  region: ObservatoryRegion;
  scheduleFrequency?: ObservatoryFrequency;
  tests: ObservatoryTest[];
}

export interface ObservatoryAvailability {
  quota?: {
    plan?: string;
    remainingSchedules?: number;
    remainingTests?: number;
  };
  regions?: ObservatoryRegion[];
}

export interface ObservatoryTrend {
  cls?: number[];
  fcp?: number[];
  lcp?: number[];
  performanceScore?: number[];
  si?: number[];
  tbt?: number[];
  ttfb?: number[];
  tti?: number[];
}

export interface ObservatorySchedule {
  frequency: ObservatoryFrequency;
  region: string;
  url: string;
}

export async function getObservatoryAvailabilities(zoneId: string): Promise<CFResponse<ObservatoryAvailability>> {
  return get(`/zones/${zoneId}/speed_api/availabilities`);
}

export async function getObservatoryPages(zoneId: string): Promise<CFResponse<ObservatoryPage[]>> {
  return get(`/zones/${zoneId}/speed_api/pages`);
}

export async function getObservatoryTests(zoneId: string, url: string, params?: {
  page?: number;
  per_page?: number;
  region?: string;
}): Promise<CFResponse<ObservatoryTest[]>> {
  return get(`/zones/${zoneId}/speed_api/pages/${speedUrl(url)}/tests`, params);
}

export async function runObservatoryTest(zoneId: string, url: string, region?: string): Promise<CFResponse<ObservatoryTest>> {
  return post(`/zones/${zoneId}/speed_api/pages/${speedUrl(url)}/tests`, region ? { region } : {});
}

export async function getObservatoryTest(zoneId: string, url: string, testId: string): Promise<CFResponse<ObservatoryTest>> {
  return get(`/zones/${zoneId}/speed_api/pages/${speedUrl(url)}/tests/${testId}`);
}

export async function deleteObservatoryTests(zoneId: string, url: string, region?: string): Promise<CFResponse<{ count: number }>> {
  const query = region ? `?region=${encodeURIComponent(region)}` : '';
  return del(`/zones/${zoneId}/speed_api/pages/${speedUrl(url)}/tests${query}`);
}

export async function getObservatoryTrend(zoneId: string, url: string, params: {
  region: string;
  deviceType: ObservatoryDevice;
  start: string;
  end?: string;
  tz: string;
  metrics: string;
}): Promise<CFResponse<ObservatoryTrend>> {
  return get(`/zones/${zoneId}/speed_api/pages/${speedUrl(url)}/trend`, params);
}

export async function getObservatorySchedule(zoneId: string, url: string, region?: string): Promise<CFResponse<ObservatorySchedule>> {
  return get(`/zones/${zoneId}/speed_api/schedule/${speedUrl(url)}`, region ? { region } : undefined);
}

export async function createObservatorySchedule(zoneId: string, url: string, region: string, frequency: ObservatoryFrequency): Promise<CFResponse<{
  schedule?: ObservatorySchedule;
  test?: ObservatoryTest;
}>> {
  return post(`/zones/${zoneId}/speed_api/schedule/${speedUrl(url)}?region=${encodeURIComponent(region)}&frequency=${frequency}`);
}

export async function deleteObservatorySchedule(zoneId: string, url: string, region?: string): Promise<CFResponse<{ count: number }>> {
  const query = region ? `?region=${encodeURIComponent(region)}` : '';
  return del(`/zones/${zoneId}/speed_api/schedule/${speedUrl(url)}${query}`);
}

// ─── Durable Objects ─────────────────────────────────────────────────────────

export interface DurableObjectNamespace {
  id: string;
  name: string;
  script: string;
  class: string;
  use_sqlite: boolean;
}

export interface DurableObjectItem {
  id: string;
  hasStoredData: boolean;
}

export async function getDurableObjectNamespaces(accountId: string): Promise<CFResponse<DurableObjectNamespace[]>> {
  return get(`/accounts/${accountId}/workers/durable_objects/namespaces`);
}

export async function getDurableObjects(accountId: string, namespaceId: string, cursor?: string): Promise<CFResponse<DurableObjectItem[]>> {
  return get(`/accounts/${accountId}/workers/durable_objects/namespaces/${namespaceId}/objects`, cursor ? { cursor } : undefined);
}

// ─── Queues ──────────────────────────────────────────────────────────────────

export interface Queue {
  queue_id: string;
  queue_name: string;
  created_on: string;
  modified_on: string;
  producers: { script: string; type: string }[];
  producers_total_count: number;
  consumers: { consumer_id: string; script_name: string; queue_name: string; type: string; settings: { batch_size: number; max_concurrency: number | null; max_retries: number; max_wait_time_ms: number; retry_delay: number }; created_on: string }[];
  consumers_total_count: number;
  settings: { delivery_delay: number; delivery_paused: boolean; message_retention_period: number };
}

export async function getQueues(accountId: string): Promise<CFResponse<Queue[]>> {
  return get(`/accounts/${accountId}/queues`);
}

export async function getQueue(accountId: string, queueId: string): Promise<CFResponse<Queue>> {
  return get(`/accounts/${accountId}/queues/${queueId}`);
}

export async function createQueue(accountId: string, queue: { queue_name: string; delivery_delay?: number; message_retention_period?: number }): Promise<CFResponse<Queue>> {
  return post(`/accounts/${accountId}/queues`, queue);
}

export async function updateQueue(accountId: string, queueId: string, update: { queue_name?: string; delivery_delay?: number; delivery_paused?: boolean; message_retention_period?: number }): Promise<CFResponse<Queue>> {
  return patch(`/accounts/${accountId}/queues/${queueId}`, update);
}

export async function deleteQueue(accountId: string, queueId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/queues/${queueId}`);
}

// ─── Hyperdrive ──────────────────────────────────────────────────────────────

export interface HyperdriveConfig {
  id: string;
  name: string;
  origin: {
    scheme?: string;
    host?: string;
    port?: number;
    database?: string;
    user?: string;
  };
  caching?: { disabled?: boolean };
  origin_connection_limit?: number;
  created_on?: string;
  modified_on?: string;
  restarted_on?: string;
}

export async function getHyperdriveConfigs(accountId: string): Promise<CFResponse<HyperdriveConfig[]>> {
  return get(`/accounts/${accountId}/hyperdrive/configs`);
}

export async function getHyperdriveConfig(accountId: string, hyperdriveId: string): Promise<CFResponse<HyperdriveConfig>> {
  return get(`/accounts/${accountId}/hyperdrive/configs/${hyperdriveId}`);
}

export async function deleteHyperdriveConfig(accountId: string, hyperdriveId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/hyperdrive/configs/${hyperdriveId}`);
}

export async function restartHyperdriveConfig(accountId: string, hyperdriveId: string): Promise<CFResponse<HyperdriveConfig>> {
  return post(`/accounts/${accountId}/hyperdrive/configs/${hyperdriveId}/restart`);
}

// ─── Workers AI ──────────────────────────────────────────────────────────────

export interface AIModel {
  id: string;
  name: string;
  description: string;
  task: { id: string; name: string; description: string };
  tags: string[];
  created_at: string;
}

export async function searchAIModels(accountId: string, params?: { task?: string; author?: string; search?: string }): Promise<CFResponse<AIModel[]>> {
  return get(`/accounts/${accountId}/ai/models/search`, params);
}

export async function runAIModel(accountId: string, model: string, input: any): Promise<CFResponse<any>> {
  return post(`/accounts/${accountId}/ai/run/${model}`, input);
}

// ─── Vectorize ───────────────────────────────────────────────────────────────

export interface VectorizeIndex {
  name: string;
  description?: string;
  config?: any;
  created_on?: string;
  modified_on?: string;
}

export interface VectorizeIndexInfo {
  dimensions?: number;
  vectorCount?: number;
  processedUpToDatetime?: string;
  processedUpToMutation?: string;
}

export interface VectorizeMetadataIndex {
  propertyName: string;
  indexType: 'string' | 'number' | 'boolean';
}

export interface VectorizeVector {
  id: string;
  values?: number[];
  metadata?: Record<string, any>;
}

export async function getVectorizeIndexes(accountId: string): Promise<CFResponse<VectorizeIndex[]>> {
  return get(`/accounts/${accountId}/vectorize/v2/indexes`);
}

export async function createVectorizeIndex(accountId: string, index: { name: string; description?: string; config: any }): Promise<CFResponse<VectorizeIndex>> {
  return post(`/accounts/${accountId}/vectorize/v2/indexes`, index);
}

export async function getVectorizeIndex(accountId: string, indexName: string): Promise<CFResponse<VectorizeIndex>> {
  return get(`/accounts/${accountId}/vectorize/v2/indexes/${indexName}`);
}

export async function deleteVectorizeIndex(accountId: string, indexName: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/vectorize/v2/indexes/${indexName}`);
}

export async function getVectorizeIndexInfo(accountId: string, indexName: string): Promise<CFResponse<VectorizeIndexInfo>> {
  return get(`/accounts/${accountId}/vectorize/v2/indexes/${indexName}/info`);
}

export async function getVectorizeMetadataIndexes(accountId: string, indexName: string): Promise<CFResponse<VectorizeMetadataIndex[]>> {
  return get(`/accounts/${accountId}/vectorize/v2/indexes/${indexName}/metadata_index/list`);
}

export async function createVectorizeMetadataIndex(accountId: string, indexName: string, metadataIndex: { propertyName: string; indexType: 'string' | 'number' | 'boolean' }): Promise<CFResponse<any>> {
  return post(`/accounts/${accountId}/vectorize/v2/indexes/${indexName}/metadata_index/create`, metadataIndex);
}

export async function deleteVectorizeMetadataIndex(accountId: string, indexName: string, propertyName: string): Promise<CFResponse<any>> {
  return post(`/accounts/${accountId}/vectorize/v2/indexes/${indexName}/metadata_index/delete`, { propertyName });
}

export async function deleteVectorsByIds(accountId: string, indexName: string, ids: string[]): Promise<CFResponse<any>> {
  return post(`/accounts/${accountId}/vectorize/v2/indexes/${indexName}/delete_by_ids`, { ids });
}

export async function getVectorsByIds(accountId: string, indexName: string, ids: string[]): Promise<CFResponse<VectorizeVector[]>> {
  return post(`/accounts/${accountId}/vectorize/v2/indexes/${indexName}/get_by_ids`, { ids });
}

// ─── AI Gateway ──────────────────────────────────────────────────────────────

export interface AIGateway {
  id: string;
  name?: string;
  cache_ttl: number;
  cache_invalidate_on_update: boolean;
  collect_logs: boolean;
  rate_limiting_interval: number;
  rate_limiting_limit: number;
  rate_limiting_technique: string;
  authentication: boolean;
  log_management: number | null;
  log_management_strategy: string | null;
  created_at: string;
  modified_at: string;
}

export async function getAIGateways(accountId: string): Promise<CFResponse<AIGateway[]>> {
  return get(`/accounts/${accountId}/ai-gateway/gateways`);
}

export async function getAIGateway(accountId: string, gatewayId: string): Promise<CFResponse<AIGateway>> {
  return get(`/accounts/${accountId}/ai-gateway/gateways/${gatewayId}`);
}

export async function createAIGateway(accountId: string, gateway: Partial<AIGateway>): Promise<CFResponse<AIGateway>> {
  return post(`/accounts/${accountId}/ai-gateway/gateways`, gateway);
}

export async function updateAIGateway(accountId: string, gatewayId: string, gateway: Partial<AIGateway>): Promise<CFResponse<AIGateway>> {
  return put(`/accounts/${accountId}/ai-gateway/gateways/${gatewayId}`, gateway);
}

export async function deleteAIGateway(accountId: string, gatewayId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/ai-gateway/gateways/${gatewayId}`);
}

// ─── AI Search (AutoRAG) ─────────────────────────────────────────────────────

export interface AISearchInstance {
  id: string;
  namespace: string;
  status: string;
  paused: boolean;
  source: string;
  type: 'r2' | 'web-crawler' | null;
  last_activity?: string;
  created_at: string;
  modified_at: string;
}

export interface AISearchInstanceStats {
  completed?: number;
  running?: number;
  queued?: number;
  outdated?: number;
  skipped?: number;
  error?: number;
  last_activity?: string;
}

export interface AISearchChunk {
  id: string;
  text: string;
  score: number;
  type: string;
  item?: { key: string; metadata?: Record<string, any>; timestamp?: number };
}

export async function getAISearchInstances(accountId: string): Promise<CFResponse<AISearchInstance[]>> {
  return get(`/accounts/${accountId}/ai-search/instances`);
}

export async function getAISearchInstance(accountId: string, id: string): Promise<CFResponse<AISearchInstance>> {
  return get(`/accounts/${accountId}/ai-search/instances/${id}`);
}

export async function deleteAISearchInstance(accountId: string, id: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/ai-search/instances/${id}`);
}

export async function setAISearchInstancePaused(accountId: string, id: string, paused: boolean): Promise<CFResponse<AISearchInstance>> {
  return put(`/accounts/${accountId}/ai-search/instances/${id}`, { paused });
}

export async function getAISearchInstanceStats(accountId: string, id: string): Promise<CFResponse<AISearchInstanceStats>> {
  return get(`/accounts/${accountId}/ai-search/instances/${id}/stats`);
}

export async function searchAISearchInstance(accountId: string, id: string, query: string): Promise<CFResponse<{ chunks: AISearchChunk[]; query_kind: string; search_query?: string }>> {
  return post(`/accounts/${accountId}/ai-search/instances/${id}/search`, { query });
}

// ─── Workflows ───────────────────────────────────────────────────────────────

export interface Workflow {
  id: string;
  name: string;
  class_name: string;
  script_name: string;
  created_on: string;
  modified_on: string;
  triggered_on: string;
  instances: { complete: number; errored: number; paused: number; queued: number; running: number; terminated: number; waiting: number };
  schedules?: { cron: string; next_instance: string }[];
}

export interface WorkflowInstance {
  id: string;
  workflow_name: string;
  status: string;
  start: string;
  end?: string;
  error?: string;
  version_id: string;
}

export async function getWorkflows(accountId: string): Promise<CFResponse<Workflow[]>> {
  return get(`/accounts/${accountId}/workflows`);
}

export async function getWorkflow(accountId: string, workflowName: string): Promise<CFResponse<Workflow>> {
  return get(`/accounts/${accountId}/workflows/${workflowName}`);
}

export async function deleteWorkflow(accountId: string, workflowName: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/workflows/${workflowName}`);
}

export async function getWorkflowInstances(accountId: string, workflowName: string): Promise<CFResponse<WorkflowInstance[]>> {
  return get(`/accounts/${accountId}/workflows/${workflowName}/instances`);
}

// ─── Secrets Store ───────────────────────────────────────────────────────────

export interface SecretsStoreQuota {
  secrets: { quota: number; usage: number };
}

export interface SecretsStore {
  id: string;
  name: string;
  account_id?: string;
  created: string;
  modified: string;
}

export interface SecretsStoreSecret {
  id: string;
  store_id: string;
  name: string;
  comment?: string;
  scopes?: string[];
  status: 'pending' | 'active' | 'deleted';
  created: string;
  modified: string;
}

export async function getSecretsStoreQuota(accountId: string): Promise<CFResponse<SecretsStoreQuota>> {
  return get(`/accounts/${accountId}/secrets_store/quota`);
}

export async function getSecretsStores(accountId: string): Promise<CFResponse<SecretsStore[]>> {
  return get(`/accounts/${accountId}/secrets_store/stores`);
}

export async function createSecretsStore(accountId: string, name: string): Promise<CFResponse<SecretsStore>> {
  return post(`/accounts/${accountId}/secrets_store/stores`, { name });
}

export async function getSecretsStore(accountId: string, storeId: string): Promise<CFResponse<SecretsStore>> {
  return get(`/accounts/${accountId}/secrets_store/stores/${storeId}`);
}

export async function deleteSecretsStore(accountId: string, storeId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/secrets_store/stores/${storeId}`);
}

export async function getSecretsStoreSecrets(accountId: string, storeId: string): Promise<CFResponse<SecretsStoreSecret[]>> {
  return get(`/accounts/${accountId}/secrets_store/stores/${storeId}/secrets`);
}

export async function createSecretsStoreSecret(accountId: string, storeId: string, secret: { name: string; value: string; scopes: string[]; comment?: string }[]): Promise<CFResponse<SecretsStoreSecret[]>> {
  return post(`/accounts/${accountId}/secrets_store/stores/${storeId}/secrets`, secret);
}

export async function getSecretsStoreSecret(accountId: string, storeId: string, secretId: string): Promise<CFResponse<SecretsStoreSecret>> {
  return get(`/accounts/${accountId}/secrets_store/stores/${storeId}/secrets/${secretId}`);
}

export async function patchSecretsStoreSecret(accountId: string, storeId: string, secretId: string, update: { comment?: string; scopes?: string[]; value?: string }): Promise<CFResponse<SecretsStoreSecret>> {
  return patch(`/accounts/${accountId}/secrets_store/stores/${storeId}/secrets/${secretId}`, update);
}

export async function deleteSecretsStoreSecret(accountId: string, storeId: string, secretId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/secrets_store/stores/${storeId}/secrets/${secretId}`);
}

export async function deleteSecretsStoreSecretsBulk(accountId: string, storeId: string, ids: string[]): Promise<CFResponse<any>> {
  return getClient().delete(`/accounts/${accountId}/secrets_store/stores/${storeId}/secrets`, { data: { ids } }).then((r) => r.data);
}

// ─── Stream ──────────────────────────────────────────────────────────────────

export interface StreamVideo {
  uid: string;
  created: string;
  modified: string;
  duration: number;
  size: number;
  preview: string;
  thumbnail: string;
  readyToStream: boolean;
  status: { state: string; pctComplete: string; errorReasonCode?: string; errorReasonText?: string };
  playback: { hls: string; dash: string };
  meta: Record<string, any>;
  input?: { height: number; width: number };
  requireSignedURLs: boolean;
}

export async function getStreamVideos(accountId: string, limit = 50): Promise<CFResponse<StreamVideo[]>> {
  return get(`/accounts/${accountId}/stream`, { limit });
}

export async function getStreamVideo(accountId: string, uid: string): Promise<CFResponse<StreamVideo>> {
  return get(`/accounts/${accountId}/stream/${uid}`);
}

export async function deleteStreamVideo(accountId: string, uid: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/stream/${uid}`);
}

// ─── Cloudflare Images ───────────────────────────────────────────────────────

export interface CFImage {
  id: string;
  filename: string;
  metadata: Record<string, any>;
  requireSignedURLs: boolean;
  variants: string[];
  uploaded: string;
  modified: string;
  draft: boolean;
}

export async function getCFImages(accountId: string, page = 1): Promise<CFResponse<CFImage[]>> {
  const res = await getClient().get(`/accounts/${accountId}/images/v1`, { params: { page, per_page: 50 } });
  return { success: res.data.success, errors: res.data.errors, messages: [], result: res.data.result?.images ?? [] };
}

export async function deleteCFImage(accountId: string, imageId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/images/v1/${imageId}`);
}

// ─── Spectrum ────────────────────────────────────────────────────────────────

export interface SpectrumApp {
  id: string;
  protocol: string;
  dns: { name: string; type: string };
  origin_direct?: string[];
  origin_port?: any;
  traffic_type: string;
  tls: string;
  ip_firewall: boolean;
  proxy_protocol: string;
  argo_smart_routing: boolean;
  created_on?: string;
  modified_on?: string;
}

export async function getSpectrumApps(zoneId: string): Promise<CFResponse<SpectrumApp[]>> {
  return get(`/zones/${zoneId}/spectrum/apps`);
}

export async function deleteSpectrumApp(zoneId: string, accountId: string, appId: string): Promise<CFResponse<any>> {
  return del(`/zones/${zoneId}/spectrum/apps/${appId}`);
}

// ─── Resource Tagging ────────────────────────────────────────────────────────

export interface ResourceTags {
  type: string;
  id: string;
  name: string;
  tags: Record<string, string>;
  etag: string;
}

export async function getResourceTags(accountId: string, resourceId: string, resourceType: string): Promise<CFResponse<ResourceTags>> {
  return get(`/accounts/${accountId}/tags`, { resource_id: resourceId, resource_type: resourceType });
}

export async function setResourceTags(accountId: string, resourceId: string, resourceType: string, tags: Record<string, string>): Promise<CFResponse<ResourceTags>> {
  return put(`/accounts/${accountId}/tags`, { resource_id: resourceId, resource_type: resourceType, tags });
}

export async function deleteResourceTags(accountId: string, resourceId: string, resourceType: string, tagNames: string[]): Promise<CFResponse<any>> {
  return getClient().delete(`/accounts/${accountId}/tags`, { data: { resource_id: resourceId, resource_type: resourceType, tag_names: tagNames } }).then((r) => r.data);
}

// ─── Pipelines ───────────────────────────────────────────────────────────────

export interface Pipeline {
  id: string;
  name: string;
  endpoint: string;
  created_at: string;
  modified_at: string;
}

export async function getPipelines(accountId: string): Promise<CFResponse<Pipeline[]>> {
  return get(`/accounts/${accountId}/pipelines`);
}

export async function deletePipeline(accountId: string, pipelineId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/pipelines/${pipelineId}`);
}

// ─── Web3 Hostnames ──────────────────────────────────────────────────────────

export interface Web3Hostname {
  id: string;
  name: string;
  target: string;
  status: string;
  created_on?: string;
  modified_on?: string;
}

export async function getWeb3Hostnames(zoneId: string): Promise<CFResponse<Web3Hostname[]>> {
  return get(`/zones/${zoneId}/web3/hostnames`);
}

export async function deleteWeb3Hostname(zoneId: string, hostnameId: string): Promise<CFResponse<any>> {
  return del(`/zones/${zoneId}/web3/hostnames/${hostnameId}`);
}

// ─── DNS Firewall ────────────────────────────────────────────────────────────

export interface DNSFirewallCluster {
  id: string;
  name: string;
  dns_firewall_ips: string[];
  modified_on: string;
}

export async function getDNSFirewallClusters(accountId: string): Promise<CFResponse<DNSFirewallCluster[]>> {
  return get(`/accounts/${accountId}/dns_firewall`);
}

export async function deleteDNSFirewallCluster(accountId: string, clusterId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/dns_firewall/${clusterId}`);
}

// ─── Address Maps / BYOIP ────────────────────────────────────────────────────

export interface AddressMap {
  id: string;
  description: string;
  ips: string[];
  memberships: { identifier: string; kind: string }[];
  can_delete: boolean;
  can_modify: boolean;
  created_at: string;
  modified_at: string;
}

export async function getAddressMaps(accountId: string): Promise<CFResponse<AddressMap[]>> {
  return get(`/accounts/${accountId}/addressing/address_maps`);
}

export async function deleteAddressMap(accountId: string, addressMapId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/addressing/address_maps/${addressMapId}`);
}

// ─── Access Applications ─────────────────────────────────────────────────────

export interface AccessApp {
  id: string;
  name: string;
  domain: string;
  type: string;
  aud: string;
  session_duration: string;
  allowed_idps: string[];
  auto_redirect_to_identity: boolean;
  app_launcher_visible: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getAccessApps(accountId: string): Promise<CFResponse<AccessApp[]>> {
  return get(`/accounts/${accountId}/access/apps`);
}

export async function deleteAccessApp(accountId: string, appId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/access/apps/${appId}`);
}

// ─── Workers for Platforms ───────────────────────────────────────────────────

export interface DispatchNamespace {
  namespace_id: string;
  namespace_name: string;
  script_count?: number;
  trusted_workers?: boolean;
  created_on?: string;
  modified_on?: string;
}

export interface DispatchScript {
  id: string;
  dispatch_namespace: string;
  created_on?: string;
  modified_on?: string;
  usage_model?: string;
  tags?: string[];
}

export interface DispatchScriptSecret {
  name: string;
  type: 'secret_text';
  text?: string;
}

export async function getDispatchNamespaces(accountId: string): Promise<CFResponse<DispatchNamespace[]>> {
  return get(`/accounts/${accountId}/workers/dispatch/namespaces`);
}

export async function createDispatchNamespace(accountId: string, name: string): Promise<CFResponse<DispatchNamespace>> {
  return post(`/accounts/${accountId}/workers/dispatch/namespaces`, { name });
}

export async function getDispatchNamespace(accountId: string, namespace: string): Promise<CFResponse<DispatchNamespace>> {
  return get(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}`);
}

export async function patchDispatchNamespace(accountId: string, namespace: string, update: { name?: string; trusted_workers?: boolean }): Promise<CFResponse<DispatchNamespace>> {
  return patch(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}`, update);
}

export async function deleteDispatchNamespace(accountId: string, namespace: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}`);
}

export async function getDispatchScripts(accountId: string, namespace: string): Promise<CFResponse<DispatchScript[]>> {
  return get(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}/scripts`);
}

export async function getDispatchScript(accountId: string, namespace: string, scriptName: string): Promise<CFResponse<any>> {
  return get(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}/scripts/${scriptName}`);
}

export async function deleteDispatchScript(accountId: string, namespace: string, scriptName: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}/scripts/${scriptName}`);
}

export async function getDispatchScriptContent(accountId: string, namespace: string, scriptName: string): Promise<string> {
  const res = await getClient().get(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}/scripts/${scriptName}/content`);
  return typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
}

export async function getDispatchScriptSecrets(accountId: string, namespace: string, scriptName: string): Promise<CFResponse<DispatchScriptSecret[]>> {
  return get(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}/scripts/${scriptName}/secrets`);
}

export async function putDispatchScriptSecret(accountId: string, namespace: string, scriptName: string, secret: { name: string; text: string }): Promise<CFResponse<DispatchScriptSecret>> {
  return put(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}/scripts/${scriptName}/secrets`, { ...secret, type: 'secret_text' });
}

export async function deleteDispatchScriptSecret(accountId: string, namespace: string, scriptName: string, secretName: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/workers/dispatch/namespaces/${namespace}/scripts/${scriptName}/secrets/${secretName}`);
}

// ─── Access Applications ─────────────────────────────────────────────────────

export interface AccessApplication {
  id: string;
  aud?: string;
  name: string;
  domain: string;
  type?: string;
  session_duration?: string;
  app_launcher_visible?: boolean;
  allowed_idps?: string[];
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  policies?: { id: string; name: string; decision: string; precedence: number }[];
}

export async function getAccessApplications(accountId: string): Promise<CFResponse<AccessApplication[]>> {
  return get(`/accounts/${accountId}/access/apps`);
}

export async function getAccessApplication(accountId: string, appId: string): Promise<CFResponse<AccessApplication>> {
  return get(`/accounts/${accountId}/access/apps/${appId}`);
}

export async function createAccessApplication(accountId: string, app: {
  name: string;
  domain: string;
  type?: string;
  session_duration?: string;
  app_launcher_visible?: boolean;
  allowed_idps?: string[];
}): Promise<CFResponse<AccessApplication>> {
  return post(`/accounts/${accountId}/access/apps`, app);
}

export async function updateAccessApplication(accountId: string, appId: string, app: {
  name?: string;
  domain?: string;
  session_duration?: string;
  app_launcher_visible?: boolean;
  allowed_idps?: string[];
}): Promise<CFResponse<AccessApplication>> {
  return put(`/accounts/${accountId}/access/apps/${appId}`, app);
}

export async function deleteAccessApplication(accountId: string, appId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/access/apps/${appId}`);
}

export async function revokeAccessApplicationTokens(accountId: string, appId: string): Promise<CFResponse<any>> {
  return post(`/accounts/${accountId}/access/apps/${appId}/revoke_tokens`);
}

export async function updateAccessApplicationSettings(accountId: string, appId: string, settings: { allow_iframe?: boolean; skip_interstitial?: boolean }): Promise<CFResponse<any>> {
  return patch(`/accounts/${accountId}/access/apps/${appId}/settings`, settings);
}

// ─── Infrastructure Access Targets ───────────────────────────────────────────

export interface InfraTargetIP {
  ipv4?: { ip_addr: string; virtual_network_id?: string };
  ipv6?: { ip_addr: string; virtual_network_id?: string };
}

export interface InfraTarget {
  id: string;
  hostname: string;
  ip: InfraTargetIP;
  created_at: string;
  modified_at: string;
}

export async function getInfraTargets(accountId: string): Promise<CFResponse<InfraTarget[]>> {
  return get(`/accounts/${accountId}/infrastructure/targets`);
}

export async function getInfraTarget(accountId: string, targetId: string): Promise<CFResponse<InfraTarget>> {
  return get(`/accounts/${accountId}/infrastructure/targets/${targetId}`);
}

export async function createInfraTarget(accountId: string, target: { hostname: string; ip: InfraTargetIP }): Promise<CFResponse<InfraTarget>> {
  return post(`/accounts/${accountId}/infrastructure/targets`, target);
}

export async function updateInfraTarget(accountId: string, targetId: string, target: { hostname: string; ip: InfraTargetIP }): Promise<CFResponse<InfraTarget>> {
  return put(`/accounts/${accountId}/infrastructure/targets/${targetId}`, target);
}

export async function deleteInfraTarget(accountId: string, targetId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/infrastructure/targets/${targetId}`);
}

// ─── Zero Trust Gateway Rules ─────────────────────────────────────────────────

export interface GatewayRule {
  id: string;
  name: string;
  description?: string;
  action: 'on' | 'off' | 'allow' | 'block' | 'scan' | 'noscan' | 'safesearch' | 'ytrestricted';
  enabled: boolean;
  precedence: number;
  filters: string[];
  traffic?: string;
  identity?: string;
  device_posture?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getGatewayRules(accountId: string): Promise<CFResponse<GatewayRule[]>> {
  return get(`/accounts/${accountId}/gateway/rules`);
}

export async function getGatewayRule(accountId: string, ruleId: string): Promise<CFResponse<GatewayRule>> {
  return get(`/accounts/${accountId}/gateway/rules/${ruleId}`);
}

export async function createGatewayRule(accountId: string, rule: {
  name: string;
  description?: string;
  action: GatewayRule['action'];
  enabled?: boolean;
  precedence?: number;
  filters?: string[];
  traffic?: string;
  identity?: string;
  device_posture?: string;
}): Promise<CFResponse<GatewayRule>> {
  return post(`/accounts/${accountId}/gateway/rules`, rule);
}

export async function updateGatewayRule(accountId: string, ruleId: string, rule: {
  name?: string;
  description?: string;
  enabled?: boolean;
  precedence?: number;
}): Promise<CFResponse<GatewayRule>> {
  return patch(`/accounts/${accountId}/gateway/rules/${ruleId}`, rule);
}

export async function deleteGatewayRule(accountId: string, ruleId: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/gateway/rules/${ruleId}`);
}

// ─── Access Identity Providers ───────────────────────────────────────────────

export type AccessIdentityProviderType =
  | 'onetimepin' | 'azureAD' | 'saml' | 'centrify' | 'facebook' | 'github'
  | 'google-apps' | 'google' | 'linkedin' | 'oidc' | 'duo' | 'okta'
  | 'onelogin' | 'pingone' | 'yandex' | 'cloudflare' | 'passkeys';

/**
 * Union of every per-type `config` field the schema lists. Each provider type
 * uses its own subset (e.g. `okta_account` only for okta, `sso_target_url`
 * only for saml); none are marked required in the schema.
 */
export interface AccessIdentityProviderConfig {
  client_id?: string;
  client_secret?: string;
  claims?: string[];
  email_claim_name?: string;
  // azureAD
  conditional_access_enabled?: boolean;
  directory_id?: string;
  support_groups?: boolean;
  // azureAD accepts login/select_account/none, google-apps accepts none/consent/select_account
  prompt?: 'login' | 'select_account' | 'none' | 'consent';
  // centrify
  centrify_account?: string;
  centrify_app_id?: string;
  // google-apps
  apps_domain?: string;
  use_login_hint?: boolean;
  // oidc
  auth_url?: string;
  certs_url?: string;
  pkce_enabled?: boolean;
  scopes?: string[];
  token_url?: string;
  // duo, saml
  issuer_url?: string;
  // okta
  authorization_server_id?: string;
  okta_account?: string;
  // onelogin
  onelogin_account?: string;
  // pingone
  ping_env_id?: string;
  // saml
  attributes?: string[];
  email_attribute_name?: string;
  enable_encryption?: boolean;
  force_authn?: boolean;
  header_attributes?: { attribute_name?: string; header_name?: string }[];
  idp_public_certs?: string[];
  max_sso_url_length?: number;
  sign_request?: boolean;
  sso_target_url?: string;
  // onetimepin, cloudflare, passkeys (read-only)
  redirect_url?: string;
  // cloudflare
  restrict_to_account_members?: boolean;
  // passkeys
  login_page_auto_prompt?: boolean;
}

export interface AccessIdentityProviderScimConfig {
  enabled?: boolean;
  identity_update_behavior?: 'automatic' | 'reauth' | 'no_action';
  scim_base_url?: string;
  seat_deprovision?: boolean;
  secret?: string;
  user_deprovision?: boolean;
}

export interface AccessSamlCertificate {
  uid: string;
  public_certificate: string;
  not_after: string;
  is_current: boolean;
}

export interface AccessSamlCertificateSet {
  uid: string;
  created_at: string;
  updated_at: string;
  current_certificate?: AccessSamlCertificate;
  previous_certificate?: AccessSamlCertificate | null;
}

export interface AccessIdentityProvider {
  id?: string;
  name: string;
  type: AccessIdentityProviderType;
  config: AccessIdentityProviderConfig;
  read_only?: boolean;
  saml_certificate_set?: AccessSamlCertificateSet;
  saml_certificate_set_id?: string;
  scim_config?: AccessIdentityProviderScimConfig;
}

export interface AccessScimMeta {
  created?: string;
  lastModified?: string;
}

export interface AccessScimGroup {
  id?: string;
  displayName?: string;
  externalId?: string;
  meta?: AccessScimMeta;
  schemas?: string[];
}

export interface AccessScimUser {
  id?: string;
  active?: boolean;
  displayName?: string;
  emails?: { primary?: boolean; type?: string; value?: string }[];
  externalId?: string;
  meta?: AccessScimMeta;
  schemas?: string[];
}

export async function getAccessIdentityProviders(accountId: string, params?: {
  scim_enabled?: string;
  page?: number;
  per_page?: number;
}): Promise<CFResponse<AccessIdentityProvider[]>> {
  return get(`/accounts/${accountId}/access/identity_providers`, params);
}

export async function getAccessIdentityProvider(accountId: string, idpId: string): Promise<CFResponse<AccessIdentityProvider>> {
  return get(`/accounts/${accountId}/access/identity_providers/${idpId}`);
}

export async function createAccessIdentityProvider(accountId: string, idp: {
  name: string;
  type: AccessIdentityProviderType;
  config: AccessIdentityProviderConfig;
  scim_config?: AccessIdentityProviderScimConfig;
  saml_certificate_set_id?: string;
}): Promise<CFResponse<AccessIdentityProvider>> {
  return post(`/accounts/${accountId}/access/identity_providers`, idp);
}

/** PUT replaces the provider: `name`, `type` and `config` are all required. */
export async function updateAccessIdentityProvider(accountId: string, idpId: string, idp: {
  name: string;
  type: AccessIdentityProviderType;
  config: AccessIdentityProviderConfig;
  scim_config?: AccessIdentityProviderScimConfig;
  saml_certificate_set_id?: string;
}): Promise<CFResponse<AccessIdentityProvider>> {
  return put(`/accounts/${accountId}/access/identity_providers/${idpId}`, idp);
}

export async function deleteAccessIdentityProvider(accountId: string, idpId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/access/identity_providers/${idpId}`);
}

export async function createAccessIdpSamlCertificate(accountId: string, idpId: string): Promise<CFResponse<AccessSamlCertificateSet>> {
  return post(`/accounts/${accountId}/access/identity_providers/${idpId}/saml_certificate`);
}

export async function getAccessIdpScimGroups(accountId: string, idpId: string, params?: {
  cf_resource_id?: string;
  idp_resource_id?: string;
  name?: string;
  page?: number;
  per_page?: number;
}): Promise<CFResponse<AccessScimGroup[]>> {
  return get(`/accounts/${accountId}/access/identity_providers/${idpId}/scim/groups`, params);
}

export async function getAccessIdpScimUsers(accountId: string, idpId: string, params?: {
  cf_resource_id?: string;
  idp_resource_id?: string;
  username?: string;
  email?: string;
  name?: string;
  page?: number;
  per_page?: number;
}): Promise<CFResponse<AccessScimUser[]>> {
  return get(`/accounts/${accountId}/access/identity_providers/${idpId}/scim/users`, params);
}

// ─── Access Service Tokens ───────────────────────────────────────────────────

export interface AccessServiceToken {
  id: string;
  name: string;
  client_id: string;
  duration?: string;
  expires_at?: string;
  last_seen_at?: string;
  created_at?: string;
  updated_at?: string;
}

/** Returned by create and rotate only, the one time `client_secret` is visible. */
export interface AccessServiceTokenWithSecret {
  id: string;
  name: string;
  client_id: string;
  client_secret: string;
  duration?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAccessServiceTokens(accountId: string, params?: {
  name?: string;
  search?: string;
  page?: number;
  per_page?: number;
}): Promise<CFResponse<AccessServiceToken[]>> {
  return get(`/accounts/${accountId}/access/service_tokens`, params);
}

export async function getAccessServiceToken(accountId: string, tokenId: string): Promise<CFResponse<AccessServiceToken>> {
  return get(`/accounts/${accountId}/access/service_tokens/${tokenId}`);
}

export async function createAccessServiceToken(accountId: string, token: {
  name: string;
  duration?: string;
  client_secret_version?: number;
  previous_client_secret_expires_at?: string;
}): Promise<CFResponse<AccessServiceTokenWithSecret>> {
  return post(`/accounts/${accountId}/access/service_tokens`, token);
}

export async function updateAccessServiceToken(accountId: string, tokenId: string, token: {
  name?: string;
  duration?: string;
  client_secret_version?: number;
  previous_client_secret_expires_at?: string;
}): Promise<CFResponse<AccessServiceToken>> {
  return put(`/accounts/${accountId}/access/service_tokens/${tokenId}`, token);
}

export async function deleteAccessServiceToken(accountId: string, tokenId: string): Promise<CFResponse<AccessServiceToken>> {
  return del(`/accounts/${accountId}/access/service_tokens/${tokenId}`);
}

/** Extends the token's expiry by its `duration`; the secret is unchanged. */
export async function refreshAccessServiceToken(accountId: string, tokenId: string): Promise<CFResponse<AccessServiceToken>> {
  return post(`/accounts/${accountId}/access/service_tokens/${tokenId}/refresh`);
}

/** Issues a new `client_secret`. The previous one stays valid until `previous_client_secret_expires_at` (defaults to now). */
export async function rotateAccessServiceToken(accountId: string, tokenId: string, body?: {
  previous_client_secret_expires_at?: string;
}): Promise<CFResponse<AccessServiceTokenWithSecret>> {
  return post(`/accounts/${accountId}/access/service_tokens/${tokenId}/rotate`, body ?? {});
}

// ─── Access mTLS Authentication ──────────────────────────────────────────────

export interface AccessMtlsCertificate {
  id: string;
  name: string;
  associated_hostnames?: string[];
  fingerprint?: string;
  expires_on?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AccessMtlsHostnameSettings {
  hostname: string;
  china_network: boolean;
  client_certificate_forwarding: boolean;
}

export async function getAccessMtlsCertificates(accountId: string, params?: {
  page?: number;
  per_page?: number;
}): Promise<CFResponse<AccessMtlsCertificate[]>> {
  return get(`/accounts/${accountId}/access/certificates`, params);
}

export async function getAccessMtlsCertificate(accountId: string, certId: string): Promise<CFResponse<AccessMtlsCertificate>> {
  return get(`/accounts/${accountId}/access/certificates/${certId}`);
}

export async function createAccessMtlsCertificate(accountId: string, cert: {
  name: string;
  certificate: string;
  associated_hostnames?: string[];
}): Promise<CFResponse<AccessMtlsCertificate>> {
  return post(`/accounts/${accountId}/access/certificates`, cert);
}

export async function updateAccessMtlsCertificate(accountId: string, certId: string, cert: {
  associated_hostnames: string[];
  name?: string;
}): Promise<CFResponse<AccessMtlsCertificate>> {
  return put(`/accounts/${accountId}/access/certificates/${certId}`, cert);
}

export async function deleteAccessMtlsCertificate(accountId: string, certId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/accounts/${accountId}/access/certificates/${certId}`);
}

export async function getAccessMtlsHostnameSettings(accountId: string): Promise<CFResponse<AccessMtlsHostnameSettings[]>> {
  return get(`/accounts/${accountId}/access/certificates/settings`);
}

/** Replaces the full hostname-settings list. */
export async function updateAccessMtlsHostnameSettings(accountId: string, body: {
  settings: AccessMtlsHostnameSettings[];
}): Promise<CFResponse<AccessMtlsHostnameSettings[]>> {
  return put(`/accounts/${accountId}/access/certificates/settings`, body);
}
