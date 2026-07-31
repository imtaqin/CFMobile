import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { getQuota, AiQuota } from './ai';

export const AI_SUB_SKU = 'cfmobile_ai_monthly';

const BASE_URL =
  (Constants.expoConfig?.extra as any)?.aiBaseUrl ?? 'https://cfmobile-ai.imtaqin.id';

let cachedQuota: AiQuota | null = null;
const listeners = new Set<(q: AiQuota | null) => void>();

function emit(q: AiQuota | null) {
  cachedQuota = q;
  listeners.forEach((l) => l(q));
}

function iap() {
  return require('react-native-iap');
}

async function installId(): Promise<string> {
  const KEY = 'cf_install_id';
  if (Platform.OS === 'web') return localStorage.getItem(KEY) ?? '';
  const SecureStore = require('expo-secure-store');
  return (await SecureStore.getItemAsync(KEY)) ?? '';
}

/** Localized price of the AI plan, or null when billing is unavailable. */
export async function getSubscriptionPrice(): Promise<string | null> {
  if (Platform.OS === 'web') return null;
  try {
    const products = await iap().fetchProducts({ skus: [AI_SUB_SKU], type: 'subs' });
    const p = products?.[0];
    // Android subscriptions price lives on the base plan's pricing phases
    const phase = p?.subscriptionOfferDetailsAndroid?.[0]?.pricingPhases?.pricingPhaseList?.[0];
    return phase?.formattedPrice ?? p?.displayPrice ?? null;
  } catch {
    return null;
  }
}

/**
 * Tell the worker about a verified purchase so it can unlock the pro quota.
 * The worker re-checks the token with Google — a forged call gets rejected.
 */
async function registerWithWorker(purchaseToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Install-Id': await installId() },
      body: JSON.stringify({ purchaseToken, productId: AI_SUB_SKU }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Launch the subscription purchase flow. */
export async function subscribeAi(): Promise<void> {
  const products = await iap().fetchProducts({ skus: [AI_SUB_SKU], type: 'subs' });
  const offerToken = products?.[0]?.subscriptionOfferDetailsAndroid?.[0]?.offerToken;

  await iap().requestPurchase({
    type: 'subs',
    request: {
      google: {
        skus: [AI_SUB_SKU],
        ...(offerToken ? { subscriptionOffers: [{ sku: AI_SUB_SKU, offerToken }] } : {}),
      },
    },
  });
}

/** Re-send any active subscription to the worker (restore / app start). */
export async function syncSubscription(): Promise<AiQuota | null> {
  if (Platform.OS === 'web') return null;
  try {
    const purchases = await iap().getAvailablePurchases();
    const sub = (purchases ?? []).find((p: any) =>
      p.productId === AI_SUB_SKU || (p.productIds ?? []).includes(AI_SUB_SKU)
    );
    if (sub?.purchaseToken) {
      await registerWithWorker(sub.purchaseToken);
      try {
        await iap().finishTransaction({ purchase: sub, isConsumable: false });
      } catch {
        // already acknowledged
      }
    }
  } catch {
    // billing unavailable — fall through to a plain quota read
  }
  const q = await getQuota();
  emit(q);
  return q;
}

/** Called from the purchase listener when a subscription lands. */
export async function handlePurchase(purchase: any): Promise<boolean> {
  const ids = [purchase?.productId, ...(purchase?.productIds ?? [])];
  if (!ids.includes(AI_SUB_SKU) || !purchase?.purchaseToken) return false;

  const ok = await registerWithWorker(purchase.purchaseToken);
  try {
    await iap().finishTransaction({ purchase, isConsumable: false });
  } catch {
    // already acknowledged
  }
  emit(await getQuota());
  return ok;
}

export async function refreshQuota(): Promise<AiQuota | null> {
  const q = await getQuota();
  emit(q);
  return q;
}

export function currentQuota(): AiQuota | null {
  return cachedQuota;
}

/** Reactive AI quota for components. */
export function useAiQuota(): { quota: AiQuota | null; refresh: () => Promise<void> } {
  const [quota, setQuota] = useState<AiQuota | null>(cachedQuota);

  useEffect(() => {
    const listener = (q: AiQuota | null) => setQuota(q);
    listeners.add(listener);
    if (!cachedQuota) refreshQuota().catch(() => {});
    return () => { listeners.delete(listener); };
  }, []);

  return { quota, refresh: async () => { await refreshQuota(); } };
}
