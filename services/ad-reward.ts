import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { isPremium, usePremium } from './premium';

/**
 * Day passes earned by watching a rewarded ad.
 *
 * The paywall is a wall for anyone who will not pay, and a wall earns nothing.
 * A pass turns it into a choice: buy once and keep it, or watch an ad and have
 * that one screen for a day. Ads keep running either way — the pass unlocks
 * features, never the ad removal, which stays the thing the purchase is for.
 *
 * Passes live only on this device. Forging one costs us nothing: the screens
 * behind them read the user's own Cloudflare account with the user's own
 * token. Anything that costs real money — an AI action — is granted by the
 * worker from AdMob's signed callback instead, never from here.
 */

/** How long one rewarded ad unlocks a screen for. */
const PASS_HOURS = 24;

/** Rewarded ads one device may be credited for per day. */
export const DAILY_CAP = 5;

const STORE_KEY = 'cf_ad_passes';

/**
 * Rewarded unit for this app. Dev builds use Google's test unit so a debug
 * run never files a real impression against the account.
 */
export const REWARDED_AD_UNIT_ID = 'ca-app-pub-9117362819301000/7907621546';

interface PassState {
  /** Local calendar day the view count belongs to, 'YYYY-MM-DD'. */
  day: string;
  /** Rewarded ads watched on that day. */
  views: number;
  /** Feature key → epoch ms the pass runs out. */
  passes: Record<string, number>;
}

let state: PassState = { day: today(), views: 0, passes: {} };
let loaded = false;
const listeners = new Set<() => void>();

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') return localStorage.getItem(key);
    const SecureStore = require('expo-secure-store');
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') { localStorage.setItem(key, value); return; }
    const SecureStore = require('expo-secure-store');
    return SecureStore.setItemAsync(key, value);
  },
};

/**
 * Drop expired passes, and reset the view count when the day rolls over.
 * Returns whether anything actually changed, so callers can write back.
 */
function prune(): boolean {
  const now = Date.now();
  let changed = false;
  for (const [feature, expiry] of Object.entries(state.passes)) {
    if (expiry <= now) {
      delete state.passes[feature];
      changed = true;
    }
  }
  if (state.day !== today()) {
    state.day = today();
    state.views = 0;
    changed = true;
  }
  return changed;
}

function persist(): void {
  storage.setItem(STORE_KEY, JSON.stringify(state)).catch(() => {});
  listeners.forEach((l) => l());
}

/** Call once at app startup, beside initPremium. Safe to call repeatedly. */
export async function initAdReward(): Promise<void> {
  if (loaded) return;
  loaded = true;
  try {
    const raw = await storage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PassState>;
      state = {
        day: typeof parsed.day === 'string' ? parsed.day : today(),
        views: typeof parsed.views === 'number' ? parsed.views : 0,
        passes: parsed.passes && typeof parsed.passes === 'object' ? parsed.passes : {},
      };
    }
  } catch {
    // A corrupt blob just means nobody has a pass yet.
  }
  // A pass that ran out while the app was closed should not linger on disk.
  if (prune()) persist();
  else listeners.forEach((l) => l());
}

/**
 * Feature key for a screen. Free-form by design — a screen passes its own
 * route name and nothing central has to be kept in step with it.
 */
export type FeatureKey = string;

/** Is this screen open right now, whether bought or earned? */
export function isUnlocked(feature: FeatureKey): boolean {
  if (isPremium()) return true;
  prune();
  return (state.passes[feature] ?? 0) > Date.now();
}

/** When the earned pass for this screen runs out, or null if there isn't one. */
export function passExpiresAt(feature: FeatureKey): Date | null {
  prune();
  const expiry = state.passes[feature];
  return expiry && expiry > Date.now() ? new Date(expiry) : null;
}

/** Whole hours left on this screen's pass, rounded up; 0 when there is none. */
export function passHoursLeft(feature: FeatureKey): number {
  const expiry = passExpiresAt(feature);
  return expiry ? Math.ceil((expiry.getTime() - Date.now()) / 3_600_000) : 0;
}

/** Rewarded ads this device may still be credited for today. */
export function viewsLeftToday(): number {
  prune();
  return Math.max(0, DAILY_CAP - state.views);
}

/** Record one watched ad against today's cap. */
export function noteAdWatched(): void {
  prune();
  state.views += 1;
  persist();
}

/**
 * Open a screen for a day. Called once the rewarded ad reports the reward as
 * earned, never before.
 */
export function grantPass(feature: FeatureKey): void {
  prune();
  state.passes[feature] = Date.now() + PASS_HOURS * 3_600_000;
  state.views += 1;
  persist();
}

/** Reactive version of `isUnlocked`, for screens. */
export function useUnlocked(feature: FeatureKey): boolean {
  const premium = usePremium();
  const [value, setValue] = useState(() => isUnlocked(feature));

  useEffect(() => {
    const update = () => setValue(isUnlocked(feature));
    update();
    listeners.add(update);
    // A pass ends on a timer, so the screen has to close itself when it does.
    const expiry = passExpiresAt(feature);
    const timer = expiry ? setTimeout(update, expiry.getTime() - Date.now() + 1000) : undefined;
    return () => {
      listeners.delete(update);
      if (timer) clearTimeout(timer);
    };
  }, [feature, premium]);

  return premium || value;
}

function snapshot(features: FeatureKey[]): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const f of features) out[f] = isUnlocked(f);
  return out;
}

/**
 * Reactive `isUnlocked` for several screens at once, so an index listing every
 * product takes one subscription instead of a hook per row. Unlike
 * `useUnlocked` it does not set a timer per pass — on an index a stale lock
 * badge is cosmetic, and the screen behind it re-checks on its own.
 */
export function useUnlockedMap(features: FeatureKey[]): Record<FeatureKey, boolean> {
  const premium = usePremium();
  // Join the list so an inline array literal does not resubscribe every render.
  const key = features.join(',');
  const [value, setValue] = useState<Record<string, boolean>>(() => snapshot(features));

  useEffect(() => {
    const list = key ? key.split(',') : [];
    const update = () => setValue(snapshot(list));
    update();
    listeners.add(update);
    return () => { listeners.delete(update); };
  }, [key, premium]);

  return value;
}

/** Test seam: forget every pass and today's count. */
export function reset(): void {
  state = { day: today(), views: 0, passes: {} };
  loaded = false;
}
