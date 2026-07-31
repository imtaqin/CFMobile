import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const PREMIUM_SKU = 'premium_remove_ads';
const CACHE_KEY = 'cf_premium';

let premium = false;
let initialized = false;
const listeners = new Set<(value: boolean) => void>();

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

function setPremium(value: boolean) {
  premium = value;
  storage.setItem(CACHE_KEY, value ? 'true' : 'false').catch(() => {});
  listeners.forEach((l) => l(value));
}

export function isPremium(): boolean {
  return premium;
}

function iap() {
  return require('react-native-iap');
}

async function ownsPremium(): Promise<boolean> {
  const purchases = await iap().getAvailablePurchases();
  return (purchases ?? []).some((p: any) =>
    p.productId === PREMIUM_SKU || (p.productIds ?? []).includes(PREMIUM_SKU)
  );
}

/** Call once at app startup. Safe to call multiple times. */
export async function initPremium(): Promise<void> {
  if (initialized || Platform.OS === 'web') return;
  initialized = true;

  // Instant paint from cache, then verify against the store
  const cached = await storage.getItem(CACHE_KEY).catch(() => null);
  if (cached === 'true') setPremium(true);

  try {
    await iap().initConnection();

    iap().purchaseUpdatedListener(async (purchase: any) => {
      const ids = [purchase.productId, ...(purchase.productIds ?? [])];

      // AI subscription is handled by its own service (worker verification)
      if (ids.includes('cfmobile_ai_monthly')) {
        const { handlePurchase } = require('./ai-subscription');
        await handlePurchase(purchase);
        return;
      }

      if (!ids.includes(PREMIUM_SKU)) return;
      try {
        await iap().finishTransaction({ purchase, isConsumable: false });
      } catch {
        // already acknowledged
      }
      setPremium(true);
    });

    setPremium(await ownsPremium());
  } catch {
    // Billing unavailable (no Play Services, sideload, etc.) — keep cached value
  }
}

/** Localized price string for the premium product, or null. */
export async function getPremiumPrice(): Promise<string | null> {
  if (Platform.OS === 'web') return null;
  try {
    const products = await iap().fetchProducts({ skus: [PREMIUM_SKU], type: 'in-app' });
    return products?.[0]?.displayPrice ?? null;
  } catch {
    return null;
  }
}

/** Launch the purchase flow. Resolution happens via purchaseUpdatedListener. */
export async function purchasePremium(): Promise<void> {
  await iap().requestPurchase({
    request: { google: { skus: [PREMIUM_SKU] } },
    type: 'in-app',
  });
}

/** Re-check owned purchases (restore). Returns the new premium state. */
export async function restorePremium(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const owned = await ownsPremium();
  setPremium(owned);
  return owned;
}

/** Reactive premium flag for components. */
export function usePremium(): boolean {
  const [value, setValue] = useState(premium);
  useEffect(() => {
    setValue(premium);
    const listener = (v: boolean) => setValue(v);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);
  return value;
}
