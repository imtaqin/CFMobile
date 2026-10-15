import { Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { uuid } from 'expo-modules-core';
import { sha256, base64Url } from './oauth';
import { setSecureScreen } from '@/modules/cf-quick-tile';

/** Biometric unlock. The key predates PIN and pattern, when it meant "app lock on". */
const BIOMETRIC_KEY = 'cf_app_lock_enabled';
const METHOD_KEY = 'cf_app_lock_method';
const SECRET_KEY = 'cf_app_lock_secret';
const LENGTH_KEY = 'cf_app_lock_length';
const DELAY_KEY = 'cf_app_lock_delay';
const FAILS_KEY = 'cf_app_lock_fails';
const SCREENSHOT_KEY = 'cf_block_screenshots';

export type LockMethod = 'none' | 'pin' | 'pattern';

export interface LockSettings {
  method: LockMethod;
  /** Fingerprint or face can unlock instead of the PIN or pattern. */
  biometric: boolean;
  /** Seconds the app may sit in the background before it locks again. */
  delaySec: number;
  /** Digits in the PIN, so the pad can submit on the last one. */
  pinLength: number;
}

export const PIN_MIN = 4;
export const PIN_MAX = 8;
export const PATTERN_MIN = 4;
export const DELAY_OPTIONS = [0, 60, 300, 900];

/** Wrong attempts allowed before each further one has to wait. */
const FREE_ATTEMPTS = 5;
const LOCKOUT_BASE_MS = 30_000;
const LOCKOUT_MAX_MS = 15 * 60_000;
const HASH_ROUNDS = 2000;

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
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') { localStorage.removeItem(key); return; }
    const SecureStore = require('expo-secure-store');
    return SecureStore.deleteItemAsync(key);
  },
};

// ─── Biometrics ──────────────────────────────────────────────────────────────

export async function isLockAvailable(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return hasHardware && enrolled;
}

/**
 * Ask for fingerprint or face. With a PIN or pattern set, the app's own pad is
 * the fallback, so the system's device-credential fallback is turned off.
 */
export async function authenticate(promptMessage: string, cancelLabel = 'Cancel'): Promise<boolean> {
  const method = await getMethod();
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage,
    disableDeviceFallback: method !== 'none',
    cancelLabel,
  });
  return result.success;
}

// ─── Settings ────────────────────────────────────────────────────────────────

async function getMethod(): Promise<LockMethod> {
  const value = await storage.getItem(METHOD_KEY);
  return value === 'pin' || value === 'pattern' ? value : 'none';
}

export async function getLockSettings(): Promise<LockSettings> {
  const [method, biometric, delay, length] = await Promise.all([
    getMethod(),
    storage.getItem(BIOMETRIC_KEY),
    storage.getItem(DELAY_KEY),
    storage.getItem(LENGTH_KEY),
  ]);
  return {
    method,
    biometric: biometric === 'true',
    delaySec: Number(delay) || 0,
    pinLength: Number(length) || 0,
  };
}

/** Whether opening the app needs unlocking at all. */
export async function isLockActive(settings?: LockSettings): Promise<boolean> {
  const s = settings ?? (await getLockSettings());
  if (s.method !== 'none') return true;
  return s.biometric && (await isLockAvailable());
}

/** Kept for callers that only know the biometric switch. */
export async function isLockEnabled(): Promise<boolean> {
  return (await storage.getItem(BIOMETRIC_KEY)) === 'true';
}

export async function setLockEnabled(enabled: boolean): Promise<void> {
  await storage.setItem(BIOMETRIC_KEY, enabled ? 'true' : 'false');
}

export async function setDelay(seconds: number): Promise<void> {
  await storage.setItem(DELAY_KEY, String(seconds));
}

// ─── PIN and pattern ─────────────────────────────────────────────────────────

function hashSecret(salt: string, secret: string): string {
  let digest = base64Url(sha256(`${salt}:${secret}`));
  for (let i = 1; i < HASH_ROUNDS; i++) digest = base64Url(sha256(`${salt}:${digest}`));
  return digest;
}

/** A pattern is the dot indices it passes through, 0 to 8, in order. */
export function encodePattern(dots: number[]): string {
  return dots.join('-');
}

export function isValidPin(pin: string): boolean {
  return /^\d+$/.test(pin) && pin.length >= PIN_MIN && pin.length <= PIN_MAX;
}

/** Store a new PIN or pattern. Only a salted hash is kept. */
export async function setSecret(method: Exclude<LockMethod, 'none'>, secret: string): Promise<void> {
  const salt = uuid.v4().replace(/-/g, '');
  await storage.setItem(SECRET_KEY, `${salt}$${hashSecret(salt, secret)}`);
  await storage.setItem(LENGTH_KEY, method === 'pin' ? String(secret.length) : '0');
  await storage.setItem(METHOD_KEY, method);
  await storage.removeItem(FAILS_KEY);
}

/** Turn the PIN or pattern off. Biometric unlock is switched off with it. */
export async function clearSecret(): Promise<void> {
  await Promise.all([
    storage.removeItem(SECRET_KEY),
    storage.removeItem(LENGTH_KEY),
    storage.removeItem(FAILS_KEY),
    storage.setItem(METHOD_KEY, 'none'),
  ]);
}

interface Fails { count: number; until: number }

async function getFails(): Promise<Fails> {
  try {
    const raw = await storage.getItem(FAILS_KEY);
    return raw ? (JSON.parse(raw) as Fails) : { count: 0, until: 0 };
  } catch {
    return { count: 0, until: 0 };
  }
}

/** Milliseconds until the next attempt is allowed; 0 when it is allowed now. */
export async function lockoutRemaining(): Promise<number> {
  const fails = await getFails();
  return Math.max(0, fails.until - Date.now());
}

export type VerifyResult = { ok: true } | { ok: false; waitMs: number };

/**
 * Check a PIN or pattern. After a few wrong tries each further one has to wait,
 * doubling every time, so guessing a short PIN takes days.
 */
export async function verifySecret(secret: string): Promise<VerifyResult> {
  const wait = await lockoutRemaining();
  if (wait > 0) return { ok: false, waitMs: wait };

  const stored = await storage.getItem(SECRET_KEY);
  const [salt, hash] = (stored ?? '').split('$');
  if (salt && hash && hashSecret(salt, secret) === hash) {
    await storage.removeItem(FAILS_KEY);
    return { ok: true };
  }

  const fails = await getFails();
  const count = fails.count + 1;
  const over = count - FREE_ATTEMPTS;
  const waitMs = over > 0 ? Math.min(LOCKOUT_BASE_MS * 2 ** (over - 1), LOCKOUT_MAX_MS) : 0;
  await storage.setItem(FAILS_KEY, JSON.stringify({ count, until: Date.now() + waitMs }));
  return { ok: false, waitMs };
}

// ─── Screenshots ─────────────────────────────────────────────────────────────

export async function isScreenshotBlockEnabled(): Promise<boolean> {
  return (await storage.getItem(SCREENSHOT_KEY)) === 'true';
}

/**
 * Block screenshots and screen recording, which also blanks the app's preview
 * in the recent apps list.
 */
export async function applyScreenshotBlock(enabled?: boolean): Promise<void> {
  if (Platform.OS !== 'android') return;
  const on = enabled ?? (await isScreenshotBlockEnabled());
  setSecureScreen(on);
}

export async function setScreenshotBlock(enabled: boolean): Promise<void> {
  await storage.setItem(SCREENSHOT_KEY, enabled ? 'true' : 'false');
  await applyScreenshotBlock(enabled);
}
