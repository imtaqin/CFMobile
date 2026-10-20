import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Which tiles a zone screen shows.
 *
 * The zone screen offers every product Cloudflare has, because the app cannot
 * know which ones an account uses without a request per product. Asking the
 * user instead costs nothing: hide what you never touch, and the screen is
 * yours. Nothing is hidden until they say so, so an existing install looks
 * exactly as it did.
 *
 * The choice is per device and applies to every zone — someone who does not
 * use Zaraz does not use it on one domain either.
 */

const STORE_KEY = 'cf_hidden_tiles';

let hidden = new Set<string>();
let loaded = false;
const listeners = new Set<() => void>();

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') return localStorage.getItem(key);
    return require('expo-secure-store').getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') { localStorage.setItem(key, value); return; }
    return require('expo-secure-store').setItemAsync(key, value);
  },
};

function persist(): void {
  storage.setItem(STORE_KEY, JSON.stringify([...hidden])).catch(() => {});
  listeners.forEach((l) => l());
}

export async function initZoneTiles(): Promise<void> {
  if (loaded) return;
  loaded = true;
  try {
    const raw = await storage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) hidden = new Set(parsed.filter((x) => typeof x === 'string'));
    }
  } catch {
    // Nothing stored, or a corrupt blob: everything stays visible.
  }
  listeners.forEach((l) => l());
}

export function isHidden(path: string): boolean {
  return hidden.has(path);
}

export function toggle(path: string): void {
  if (hidden.has(path)) hidden.delete(path);
  else hidden.add(path);
  persist();
}

export function showAll(): void {
  hidden = new Set();
  persist();
}

export function hiddenCount(): number {
  return hidden.size;
}

/** Reactive view of the hidden set, for the zone screen. */
export function useHiddenTiles(): Set<string> {
  const [value, setValue] = useState<Set<string>>(() => new Set(hidden));

  useEffect(() => {
    const update = () => setValue(new Set(hidden));
    listeners.add(update);
    initZoneTiles().then(update);
    return () => { listeners.delete(update); };
  }, []);

  return value;
}

/** Test seam. */
export function reset(): void {
  hidden = new Set();
  loaded = false;
}
