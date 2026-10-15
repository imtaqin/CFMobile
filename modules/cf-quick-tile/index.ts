import { Platform } from 'react-native';
import { requireOptionalNativeModule } from 'expo-modules-core';

interface QuickTileNative {
  setState(label: string, subtitle: string | null, active: boolean, ready: boolean): void;
  setSecureScreen(enabled: boolean): void;
}

// Absent on iOS, on the web and in Jest; every call is then a no-op.
const native = Platform.OS === 'android' ? requireOptionalNativeModule<QuickTileNative>('CfQuickTile') : null;

/**
 * What the Quick Settings tile shows. `ready` is false while there is no
 * sign-in or zone, in which case tapping the tile opens the app instead.
 */
export function setTileState(label: string, subtitle: string | null, active: boolean, ready: boolean): void {
  try {
    native?.setState(label, subtitle, active, ready);
  } catch {
    // the tile is a convenience; never let it break the caller
  }
}

/** Block screenshots and screen recording for the app window (Android FLAG_SECURE). */
export function setSecureScreen(enabled: boolean): void {
  try {
    native?.setSecureScreen(enabled);
  } catch {
    // not fatal: the app still works without it
  }
}
