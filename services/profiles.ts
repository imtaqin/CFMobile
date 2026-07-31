import { Platform } from 'react-native';
import { AuthConfig } from './types';

/**
 * Several Cloudflare logins in one app.
 *
 * The app used to store a single `cf_auth_config`; profiles are stored under a
 * new key and the old one is migrated on first read, so an existing user never
 * gets logged out by the upgrade.
 */
const PROFILES_KEY = 'cf_profiles';
const ACTIVE_KEY = 'cf_active_profile';
const LEGACY_KEY = 'cf_auth_config';

export interface Profile {
  id: string;
  /** shown in the switcher — email, account name, or a user-set name */
  label: string;
  config: AuthConfig;
  addedAt: string;
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
  remove: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') { localStorage.removeItem(key); return; }
    return require('expo-secure-store').deleteItemAsync(key);
  },
};

function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/** Default label for a config before we know the account's real name. */
export function labelFor(config: AuthConfig, fallback = 'Cloudflare account'): string {
  if (config.email) return config.email;
  if (config.apiToken) return `Token ••••${config.apiToken.slice(-4)}`;
  return fallback;
}

export async function getProfiles(): Promise<Profile[]> {
  const raw = await storage.get(PROFILES_KEY);
  if (raw) {
    try {
      const list = JSON.parse(raw) as Profile[];
      if (Array.isArray(list)) return list;
    } catch {
      // fall through to migration
    }
  }

  // Migrate a pre-profiles install: keep the existing login as profile one.
  const legacy = await storage.get(LEGACY_KEY);
  if (legacy) {
    try {
      const config = JSON.parse(legacy) as AuthConfig;
      const profile: Profile = {
        id: newId(),
        label: labelFor(config),
        config,
        addedAt: new Date().toISOString(),
      };
      await storage.set(PROFILES_KEY, JSON.stringify([profile]));
      await storage.set(ACTIVE_KEY, profile.id);
      return [profile];
    } catch {
      // corrupt legacy value — start clean
    }
  }
  return [];
}

export async function getActiveProfile(): Promise<Profile | null> {
  const profiles = await getProfiles();
  if (!profiles.length) return null;
  const activeId = await storage.get(ACTIVE_KEY);
  return profiles.find((p) => p.id === activeId) ?? profiles[0];
}

export async function setActiveProfile(id: string): Promise<void> {
  await storage.set(ACTIVE_KEY, id);
}

/** Add a login. Re-authenticating an existing account updates it in place. */
export async function addProfile(config: AuthConfig, label?: string): Promise<Profile> {
  const profiles = await getProfiles();
  const key = config.apiToken ?? `${config.email}:${config.globalKey}`;
  const existing = profiles.find(
    (p) => (p.config.apiToken ?? `${p.config.email}:${p.config.globalKey}`) === key
  );

  if (existing) {
    existing.config = config;
    if (label) existing.label = label;
    await storage.set(PROFILES_KEY, JSON.stringify(profiles));
    await setActiveProfile(existing.id);
    return existing;
  }

  const profile: Profile = {
    id: newId(),
    label: label ?? labelFor(config),
    config,
    addedAt: new Date().toISOString(),
  };
  profiles.push(profile);
  await storage.set(PROFILES_KEY, JSON.stringify(profiles));
  await setActiveProfile(profile.id);
  return profile;
}

export async function renameProfile(id: string, label: string): Promise<void> {
  const profiles = await getProfiles();
  const p = profiles.find((x) => x.id === id);
  if (!p) return;
  p.label = label;
  await storage.set(PROFILES_KEY, JSON.stringify(profiles));
}

/** Remove one login. Returns the profile that should become active, if any. */
export async function removeProfile(id: string): Promise<Profile | null> {
  const profiles = (await getProfiles()).filter((p) => p.id !== id);
  await storage.set(PROFILES_KEY, JSON.stringify(profiles));

  if (!profiles.length) {
    await storage.remove(ACTIVE_KEY);
    await storage.remove(LEGACY_KEY);
    return null;
  }

  const activeId = await storage.get(ACTIVE_KEY);
  if (activeId === id) await setActiveProfile(profiles[0].id);
  return profiles.find((p) => p.id === (activeId === id ? profiles[0].id : activeId)) ?? profiles[0];
}

export async function clearAllProfiles(): Promise<void> {
  await storage.remove(PROFILES_KEY);
  await storage.remove(ACTIVE_KEY);
  await storage.remove(LEGACY_KEY);
}
