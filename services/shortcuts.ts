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
