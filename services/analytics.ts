import { Platform } from 'react-native';
import Constants from 'expo-constants';
import i18n from '@/i18n';
import { isPremium } from './premium';

/**
 * Anonymous usage signals, sent to our own worker — no third-party SDK, no
 * advertising id, no IP or location stored. The install id is a random string
 * that never leaves the device except as an opaque key, and users can turn the
 * whole thing off in Settings.
 */
const BASE_URL =
  (Constants.expoConfig?.extra as any)?.aiBaseUrl ?? 'https://cfmobile-ai.imtaqin.id';
const VERSION = (Constants.expoConfig?.version as string) ?? '?';
const OPT_OUT_KEY = 'cf_analytics_off';
const INSTALL_KEY = 'cf_install_id';

let optedOut: boolean | null = null;
/** events already sent this session — screen views only need counting once */
const sentOnce = new Set<string>();

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

async function installId(): Promise<string> {
  let v = await storage.get(INSTALL_KEY);
  if (!v) {
    v = Math.random().toString(36).slice(2) + Date.now().toString(36);
    await storage.set(INSTALL_KEY, v);
  }
  return v;
}

export async function isAnalyticsEnabled(): Promise<boolean> {
  if (optedOut === null) {
    optedOut = (await storage.get(OPT_OUT_KEY).catch(() => null)) === 'true';
  }
  return !optedOut;
}

export async function setAnalyticsEnabled(enabled: boolean): Promise<void> {
  optedOut = !enabled;
  await storage.set(OPT_OUT_KEY, enabled ? 'false' : 'true');
}

/** Fire-and-forget: telemetry must never slow down or break the app. */
export function track(event: string, options?: { once?: boolean }): void {
  if (Platform.OS === 'web') return;
  if (options?.once) {
    if (sentOnce.has(event)) return;
    sentOnce.add(event);
  }

  (async () => {
    try {
      if (!(await isAnalyticsEnabled())) return;
      await fetch(`${BASE_URL}/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Install-Id': await installId() },
        body: JSON.stringify({
          event,
          lang: i18n.language,
          version: VERSION,
          premium: isPremium(),
        }),
      });
    } catch {
      // offline or blocked — drop it silently
    }
  })();
}
