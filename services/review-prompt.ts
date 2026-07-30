import { Platform, Linking } from 'react-native';
import * as StoreReview from 'expo-store-review';

const KEY_ASKED = 'cf_review_asked';
const KEY_EVENTS = 'cf_review_events';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=id.imtaqin.cfmobile';

// Ask only after the user has had a few wins in the app.
const EVENTS_BEFORE_ASK = 4;

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

/**
 * Record a "happy moment" (cache purged, DNS saved, premium bought…).
 * Once enough have piled up, show the native Play review sheet — once, ever.
 */
export async function recordHappyMoment(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    if ((await storage.get(KEY_ASKED)) === 'true') return;

    const count = parseInt((await storage.get(KEY_EVENTS)) ?? '0', 10) + 1;
    await storage.set(KEY_EVENTS, String(count));
    if (count < EVENTS_BEFORE_ASK) return;

    if (!(await StoreReview.hasAction())) return;
    await storage.set(KEY_ASKED, 'true');
    // Let the success UI settle before the sheet appears.
    setTimeout(() => { StoreReview.requestReview().catch(() => {}); }, 1200);
  } catch {
    // never let review nagging break a real action
  }
}

/** Explicit "Rate us" tap from Settings — always opens something. */
export async function openReview(): Promise<void> {
  try {
    if (await StoreReview.hasAction()) {
      await storage.set(KEY_ASKED, 'true');
      await StoreReview.requestReview();
      return;
    }
  } catch {
    // fall through to the store page
  }
  Linking.openURL(PLAY_URL).catch(() => {});
}
