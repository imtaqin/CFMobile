import axios, { AxiosInstance } from 'axios';
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

function createClient(config: AuthConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use((req) => {
    if (config.method === 'token' && config.apiToken) {
      req.headers.Authorization = `Bearer ${config.apiToken}`;
    } else if (config.method === 'global_key' && config.globalKey && config.email) {
      req.headers['X-Auth-Email'] = config.email;
      req.headers['X-Auth-Key'] = config.globalKey;
    }
    return req;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
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
  await storage.setItem(AUTH_KEY, JSON.stringify(config));
  authConfig = config;
  client = createClient(config);
}

export async function loadAuth(): Promise<AuthConfig | null> {
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

export async function toggleDevMode(zoneId: string, value: 'on' | 'off'): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/settings/development_mode`, { value });
}

export async function getZoneSettings(zoneId: string): Promise<CFResponse<ZoneSetting[]>> {
  return get(`/zones/${zoneId}/settings`);
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

export async function getIPAccessRules(zoneId: string, page = 1): Promise<CFResponse<any[]>> {
  return get(`/zones/${zoneId}/firewall/access_rules/rules`, { page, per_page: 50 });
}

// WAF Custom Rules (modern Rulesets API)
export async function getWAFCustomRules(zoneId: string): Promise<CFResponse<any>> {
  return get(`/zones/${zoneId}/rulesets/phases/http_request_firewall_custom/entrypoint`);
}

export async function getZoneRulesets(zoneId: string): Promise<CFResponse<any[]>> {
  return get(`/zones/${zoneId}/rulesets`);
}

// ─── Page Rules ──────────────────────────────────────────────────────────────

export async function getPageRules(zoneId: string): Promise<CFResponse<PageRule[]>> {
  return get(`/zones/${zoneId}/pagerules`);
}

export async function deletePageRule(zoneId: string, ruleId: string): Promise<CFResponse<{ id: string }>> {
  return del(`/zones/${zoneId}/pagerules/${ruleId}`);
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

export async function getWorkerScripts(accountId: string): Promise<CFResponse<WorkerScript[]>> {
  return get(`/accounts/${accountId}/workers/scripts`);
}

export async function deleteWorkerScript(accountId: string, scriptName: string): Promise<CFResponse<any>> {
  return del(`/accounts/${accountId}/workers/scripts/${scriptName}`);
}

export async function getWorkerRoutes(zoneId: string): Promise<CFResponse<any[]>> {
  return get(`/zones/${zoneId}/workers/routes`);
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

// ─── Argo ────────────────────────────────────────────────────────────────────

export async function getArgoSmartRouting(zoneId: string): Promise<CFResponse<ZoneSetting>> {
  return get(`/zones/${zoneId}/argo/smart_routing`);
}

export async function updateArgoSmartRouting(zoneId: string, value: 'on' | 'off'): Promise<CFResponse<ZoneSetting>> {
  return patch(`/zones/${zoneId}/argo/smart_routing`, { value });
}
