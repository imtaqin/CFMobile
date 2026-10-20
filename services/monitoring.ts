import { Platform } from 'react-native';
import * as api from './cloudflare';
import { fetchAllRecords } from './dns-snapshot';

export interface MonitorConfig {
  enabled: boolean;
  zoneIds: string[];
  /** alert when 5xx rate over the last hour exceeds this percentage */
  errorRatePct: number;
  /** alert when requests in the last hour are this many times the recent average */
  spikeMultiplier: number;
  /** alert this many days before a certificate expires */
  sslDaysBefore: number;
  /** alert when a DNS record is added, changed or removed */
  dnsDrift: boolean;
}

export const DEFAULT_CONFIG: MonitorConfig = {
  enabled: false,
  zoneIds: [],
  errorRatePct: 20,
  spikeMultiplier: 3,
  sslDaysBefore: 14,
  dnsDrift: true,
};

export interface MonitorAlert {
  id: string;
  kind: 'down' | 'spike' | 'ssl' | 'threats' | 'dns';
  zoneName: string;
  title: string;
  body: string;
  at: string;
}

const CONFIG_KEY = 'cf_monitor_config';
const STATE_KEY = 'cf_monitor_state';
const HISTORY_KEY = 'cf_monitor_history';

const storage = {
  get: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') return localStorage.getItem(key);
    return require('expo-secure-store').getItemAsync(key);
  },
  set: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') { localStorage.setItem(key, value); return; }
    return require('expo-secure-store').setItemAsync(key, value);
  },
};

export async function getConfig(): Promise<MonitorConfig> {
  try {
    const raw = await storage.get(CONFIG_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function setConfig(config: MonitorConfig): Promise<void> {
  await storage.set(CONFIG_KEY, JSON.stringify(config));
}

export async function getHistory(): Promise<MonitorAlert[]> {
  try {
    const raw = await storage.get(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function pushHistory(alerts: MonitorAlert[]): Promise<void> {
  if (!alerts.length) return;
  const prev = await getHistory();
  const next = [...alerts, ...prev].slice(0, 50);
  await storage.set(HISTORY_KEY, JSON.stringify(next));
}

/** Per-zone dedupe state so the same condition doesn't notify every cycle. */
interface ZoneState {
  lastAlertAt?: Record<string, string>;
  /** One fingerprint per DNS record at the last check, sorted. */
  dnsPrints?: string[];
}

async function getState(): Promise<Record<string, ZoneState>> {
  try {
    const raw = await storage.get(STATE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function setState(state: Record<string, ZoneState>): Promise<void> {
  await storage.set(STATE_KEY, JSON.stringify(state));
}

/** Pages of 100 records the drift check will read per zone per cycle. */
const DNS_PRINT_PAGE_LIMIT = 5;

const COOLDOWN_MS: Record<MonitorAlert['kind'], number> = {
  down: 60 * 60 * 1000,        // 1 hour
  spike: 3 * 60 * 60 * 1000,   // 3 hours
  threats: 6 * 60 * 60 * 1000, // 6 hours
  ssl: 24 * 60 * 60 * 1000,    // once a day
  dns: 30 * 60 * 1000,         // 30 minutes
};

function cooledDown(state: Record<string, ZoneState>, zoneId: string, kind: MonitorAlert['kind'], nowMs: number): boolean {
  const last = state[zoneId]?.lastAlertAt?.[kind];
  if (!last) return true;
  return nowMs - new Date(last).getTime() >= COOLDOWN_MS[kind];
}

function markAlert(state: Record<string, ZoneState>, zoneId: string, kind: MonitorAlert['kind'], nowIso: string): void {
  state[zoneId] = state[zoneId] ?? {};
  state[zoneId].lastAlertAt = { ...(state[zoneId].lastAlertAt ?? {}), [kind]: nowIso };
}

/** Hourly traffic + error breakdown for the last 24h, via the GraphQL analytics API. */
async function fetchHourly(zoneId: string): Promise<
  { requests: number; errors: number; threats: number }[]
> {
  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
  const query = `{
    viewer {
      zones(filter: { zoneTag: "${zoneId}" }) {
        httpRequests1hGroups(
          limit: 24
          filter: { datetime_geq: "${start.toISOString()}", datetime_leq: "${end.toISOString()}" }
          orderBy: [datetime_ASC]
        ) {
          dimensions { datetime }
          sum {
            requests
            threats
            responseStatusMap { edgeResponseStatus requests }
          }
        }
      }
    }
  }`;

  const res = await api.getClient().post('https://api.cloudflare.com/client/v4/graphql', { query });
  const groups = res.data?.data?.viewer?.zones?.[0]?.httpRequests1hGroups ?? [];
  return groups.map((g: any) => {
    const statuses = g.sum?.responseStatusMap ?? [];
    const errors = statuses
      .filter((s: any) => s.edgeResponseStatus >= 500)
      .reduce((acc: number, s: any) => acc + s.requests, 0);
    return { requests: g.sum?.requests ?? 0, errors, threats: g.sum?.threats ?? 0 };
  });
}

async function fetchCertDaysLeft(zoneId: string): Promise<number | null> {
  try {
    const res = await api.getSSLVerification(zoneId);
    const packs = res.result ?? [];
    const dates = packs
      .map((p: any) => p.cert_pack_uuid && p.expires_on ? p.expires_on : p.expires_on)
      .filter(Boolean)
      .map((d: string) => new Date(d).getTime())
      .filter((n: number) => !Number.isNaN(n));
    if (!dates.length) return null;
    const soonest = Math.min(...dates);
    return Math.floor((soonest - Date.now()) / (24 * 60 * 60 * 1000));
  } catch {
    return null;
  }
}

/**
 * One line per DNS record, holding every field a silent edit would touch.
 * Sorted, so the comparison does not depend on the order the API returns.
 */
async function fetchDnsPrints(zoneId: string): Promise<string[] | null> {
  try {
    // A background task gets seconds, not minutes. Past this the zone is too
    // big to fingerprint here and drift is skipped for it rather than guessed.
    const records = await fetchAllRecords(zoneId, DNS_PRINT_PAGE_LIMIT);
    return records
      .map((r) => {
        const value = r.data && Object.keys(r.data).length > 0
          ? JSON.stringify(Object.entries(r.data).sort())
          : (r.content ?? '');
        return `${r.type} ${r.name} ${value} ttl=${r.ttl} proxied=${r.proxied ? 1 : 0}`;
      })
      .sort();
  } catch {
    // No DNS read permission, or a network hiccup — say nothing rather than
    // reporting every record as removed.
    return null;
  }
}

/** Added and removed lines between two fingerprint lists. An edit shows up as one of each. */
function printsDiff(before: string[], after: string[]): { added: string[]; removed: string[] } {
  const b = new Set(before);
  const a = new Set(after);
  return {
    added: after.filter((x) => !b.has(x)),
    removed: before.filter((x) => !a.has(x)),
  };
}

/** The record name out of a fingerprint line, for a readable notification. */
function printName(line: string): string {
  const parts = line.split(' ');
  return `${parts[0]} ${parts[1]}`;
}

/**
 * Run one monitoring cycle over the configured zones.
 * Returns the alerts that should be shown as notifications (already deduped).
 */
export async function runChecks(): Promise<MonitorAlert[]> {
  const config = await getConfig();
  if (!config.enabled || !config.zoneIds.length) return [];

  const state = await getState();
  const now = new Date();
  const nowMs = now.getTime();
  const nowIso = now.toISOString();
  const alerts: MonitorAlert[] = [];

  // Resolve zone names once (cheap, single call, and keeps notifications readable)
  let zoneNames: Record<string, string> = {};
  try {
    const zones = await api.getZones(1);
    for (const z of zones.result ?? []) zoneNames[z.id] = z.name;
  } catch {
    // fall back to ids below
  }

  for (const zoneId of config.zoneIds) {
    const zoneName = zoneNames[zoneId] ?? zoneId.slice(0, 8);

    // 0. DNS drift. First, because it is the only check that works on a token
    // without analytics access — the rest of the loop gives up without it.
    if (config.dnsDrift) {
      const prints = await fetchDnsPrints(zoneId);
      if (prints) {
        const before = state[zoneId]?.dnsPrints;
        if (before) {
          const { added, removed } = printsDiff(before, prints);
          if ((added.length || removed.length) && cooledDown(state, zoneId, 'dns', nowMs)) {
            // One line in and one out on the same name is an edit, not a pair.
            const names = [...new Set([...added, ...removed].map(printName))];
            alerts.push({
              id: `${zoneId}-dns-${nowMs}`,
              kind: 'dns',
              zoneName,
              title: `✏️ DNS changed on ${zoneName}`,
              body: `${names.slice(0, 3).join(', ')}${names.length > 3 ? ` and ${names.length - 3} more` : ''}. ${added.length} added, ${removed.length} removed or edited.`,
              at: nowIso,
            });
            markAlert(state, zoneId, 'dns', nowIso);
          }
        }
        state[zoneId] = { ...(state[zoneId] ?? {}), dnsPrints: prints };
      }
    }

    let hourly: { requests: number; errors: number; threats: number }[] = [];
    try {
      hourly = await fetchHourly(zoneId);
    } catch {
      continue; // token lost analytics access, or network hiccup — skip quietly
    }
    if (hourly.length < 2) continue;

    const last = hourly[hourly.length - 1];
    const earlier = hourly.slice(0, -1);
    const avgRequests = earlier.reduce((a, h) => a + h.requests, 0) / Math.max(earlier.length, 1);

    // 1. Site trouble — high 5xx share
    const errorPct = last.requests > 0 ? (last.errors / last.requests) * 100 : 0;
    if (errorPct >= config.errorRatePct && last.requests >= 20 && cooledDown(state, zoneId, 'down', nowMs)) {
      alerts.push({
        id: `${zoneId}-down-${nowMs}`,
        kind: 'down',
        zoneName,
        title: `⚠️ ${zoneName} is returning errors`,
        body: `${errorPct.toFixed(0)}% of requests failed with 5xx in the last hour (${last.errors} of ${last.requests}).`,
        at: nowIso,
      });
      markAlert(state, zoneId, 'down', nowIso);
    }

    // 2. Traffic spike
    if (
      avgRequests >= 50 &&
      last.requests >= avgRequests * config.spikeMultiplier &&
      cooledDown(state, zoneId, 'spike', nowMs)
    ) {
      alerts.push({
        id: `${zoneId}-spike-${nowMs}`,
        kind: 'spike',
        zoneName,
        title: `📈 Traffic spike on ${zoneName}`,
        body: `${last.requests.toLocaleString()} requests in the last hour — ${(last.requests / avgRequests).toFixed(1)}× the recent average.`,
        at: nowIso,
      });
      markAlert(state, zoneId, 'spike', nowIso);
    }

    // 3. Threat surge
    if (last.threats >= 100 && cooledDown(state, zoneId, 'threats', nowMs)) {
      alerts.push({
        id: `${zoneId}-threats-${nowMs}`,
        kind: 'threats',
        zoneName,
        title: `🛡️ ${zoneName} under heavy attack`,
        body: `${last.threats.toLocaleString()} threats blocked in the last hour. Consider Under Attack Mode.`,
        at: nowIso,
      });
      markAlert(state, zoneId, 'threats', nowIso);
    }

    // 4. Certificate expiry
    const daysLeft = await fetchCertDaysLeft(zoneId);
    if (
      daysLeft !== null &&
      daysLeft <= config.sslDaysBefore &&
      daysLeft >= 0 &&
      cooledDown(state, zoneId, 'ssl', nowMs)
    ) {
      alerts.push({
        id: `${zoneId}-ssl-${nowMs}`,
        kind: 'ssl',
        zoneName,
        title: `🔒 SSL expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
        body: `The certificate for ${zoneName} expires soon. Renew it before visitors see warnings.`,
        at: nowIso,
      });
      markAlert(state, zoneId, 'ssl', nowIso);
    }
  }

  await setState(state);
  await pushHistory(alerts);
  return alerts;
}
