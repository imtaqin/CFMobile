import { Platform } from 'react-native';
import * as CF from './cloudflare';
import * as profiles from './profiles';
import { logSetting } from './change-history';

/**
 * The zone the home-screen widget and the Quick Settings tile act on, and the
 * calls they make. Both run outside the app's UI (a headless JS task), so
 * everything here loads its own state instead of relying on the auth context.
 */
const ZONE_KEY = 'cf_shortcut_zone';
/** Security level to return to when Under Attack Mode is switched off from a shortcut. */
const PREV_LEVEL_KEY = 'cf_shortcut_prev_level';
/** When the purge button was armed, so a stray tap cannot empty the cache. */
const PURGE_ARMED_KEY = 'cf_shortcut_purge_armed';

/**
 * How long an armed purge stays armed. A widget cannot put up a confirmation
 * dialog, so the button asks for a second tap instead — long enough to mean
 * it, short enough that a pocket tap tomorrow does not count.
 */
const PURGE_ARM_MS = 10_000;

export interface ShortcutZone {
  id: string;
  name: string;
}

export interface ZoneStatus {
  zone: ShortcutZone;
  underAttack: boolean;
  devMode: boolean;
  /** When this was read, for the "updated" line. */
  at: number;
  /** The purge button has been tapped once and is waiting for the second. */
  purgeArmed?: boolean;
}

export interface ZoneTraffic {
  zone: ShortcutZone;
  /** Requests per day over the window, oldest first. */
  daily: number[];
  requests: number;
  /** Share of requests served from cache, 0-100. */
  cachedPct: number;
  threats: number;
  at: number;
}

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

export async function getShortcutZone(): Promise<ShortcutZone | null> {
  try {
    const raw = await storage.get(ZONE_KEY);
    return raw ? (JSON.parse(raw) as ShortcutZone) : null;
  } catch {
    return null;
  }
}

export async function setShortcutZone(zone: ShortcutZone): Promise<void> {
  await storage.set(ZONE_KEY, JSON.stringify({ id: zone.id, name: zone.name }));
}

/** Sign in from storage when running without the app open. False when nobody is signed in. */
export async function ensureAuth(): Promise<boolean> {
  if (await CF.loadAuth()) return true;
  const active = await profiles.getActiveProfile();
  if (!active) return false;
  await CF.saveAuth(active.config);
  return true;
}

/** The chosen zone, or the account's first zone when none was chosen yet. */
export async function resolveZone(): Promise<ShortcutZone | null> {
  const chosen = await getShortcutZone();
  if (chosen) return chosen;
  const res = await CF.getZones(1);
  const first = res.result?.[0];
  if (!first) return null;
  const zone = { id: first.id, name: first.name };
  await setShortcutZone(zone);
  return zone;
}

export async function getStatus(zone: ShortcutZone): Promise<ZoneStatus> {
  const [level, dev] = await Promise.all([
    CF.getZoneSetting(zone.id, 'security_level'),
    CF.getZoneSetting(zone.id, 'development_mode'),
  ]);
  const securityLevel = String(level.result?.value ?? '');
  if (securityLevel && securityLevel !== 'under_attack') await storage.set(PREV_LEVEL_KEY, securityLevel);
  return {
    zone,
    underAttack: securityLevel === 'under_attack',
    devMode: dev.result?.value === 'on',
    at: Date.now(),
  };
}

/** Flip Under Attack Mode and return the new state. */
export async function toggleUnderAttack(zone: ShortcutZone): Promise<ZoneStatus> {
  const status = await getStatus(zone);
  const previous = (await storage.get(PREV_LEVEL_KEY)) || 'medium';
  const next = status.underAttack ? previous : 'under_attack';
  await CF.updateSecurityLevel(zone.id, next);
  await logSetting(zone.id, 'security_level', status.underAttack ? 'under_attack' : previous, next, zone.name);
  return { ...status, underAttack: !status.underAttack, at: Date.now() };
}

/** Flip Development Mode and return the new state. */
export async function toggleDevMode(zone: ShortcutZone): Promise<ZoneStatus> {
  const status = await getStatus(zone);
  const next = status.devMode ? 'off' : 'on';
  await CF.toggleDevMode(zone.id, next);
  await logSetting(zone.id, 'development_mode', status.devMode ? 'on' : 'off', next, zone.name);
  return { ...status, devMode: !status.devMode, at: Date.now() };
}

// ─── Purge, behind a second tap ──────────────────────────────────────────────

/** Remember that the purge button was tapped once. */
export async function armPurge(): Promise<void> {
  await storage.set(PURGE_ARMED_KEY, String(Date.now()));
}

/** Is a purge still waiting for its confirming tap? */
export async function isPurgeArmed(): Promise<boolean> {
  const raw = await storage.get(PURGE_ARMED_KEY);
  const at = raw ? Number(raw) : 0;
  return !!at && Date.now() - at < PURGE_ARM_MS;
}

export async function disarmPurge(): Promise<void> {
  await storage.set(PURGE_ARMED_KEY, '0');
}

/** Empty the zone's cache. Only called after the second tap. */
export async function purgeCache(zone: ShortcutZone): Promise<void> {
  await CF.purgeAllCache(zone.id);
  await disarmPurge();
}

// ─── Traffic ─────────────────────────────────────────────────────────────────

/** Days of history the traffic widget draws. */
const TRAFFIC_DAYS = 7;

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function getTraffic(zone: ShortcutZone): Promise<ZoneTraffic> {
  const end = new Date();
  const start = new Date(end.getTime() - (TRAFFIC_DAYS - 1) * 24 * 60 * 60 * 1000);
  const res = await CF.getZoneAnalytics(zone.id, isoDate(start), isoDate(end));
  const requests = res.totals.requests.all;
  return {
    zone,
    daily: res.timeseries.map((d) => d.requests),
    requests,
    cachedPct: requests > 0 ? Math.round((res.totals.requests.cached / requests) * 100) : 0,
    threats: res.totals.threats.all,
    at: Date.now(),
  };
}

