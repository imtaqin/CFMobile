import { Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const LOCK_KEY = 'cf_app_lock_enabled';

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

export async function isLockAvailable(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return hasHardware && enrolled;
}

export async function isLockEnabled(): Promise<boolean> {
  return (await storage.getItem(LOCK_KEY)) === 'true';
}

export async function setLockEnabled(enabled: boolean): Promise<void> {
  await storage.setItem(LOCK_KEY, enabled ? 'true' : 'false');
}

export async function authenticate(promptMessage: string): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage,
    disableDeviceFallback: false,
    cancelLabel: 'Cancel',
  });
  return result.success;
}
