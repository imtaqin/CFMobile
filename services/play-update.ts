import { Platform, Linking } from 'react-native';

export const PLAY_URL = 'https://play.google.com/store/apps/details?id=id.imtaqin.cfmobile';

/**
 * Google Play is the distribution channel for this app. Updates always go
 * through Play — never a sideloaded APK, which cannot receive Play updates and
 * complicates purchase entitlements.
 */
export async function checkPlayUpdate(): Promise<void> {
  if (Platform.OS !== 'android' || __DEV__) return;
  try {
    const { default: SpInAppUpdates, IAUUpdateKind } = require('sp-react-native-in-app-updates');
    const inAppUpdates = new SpInAppUpdates(false);
    const result = await inAppUpdates.checkNeedsUpdate();
    if (result.shouldUpdate) {
      await inAppUpdates.startUpdate({ updateType: IAUUpdateKind.FLEXIBLE });
      // Flexible flow downloads in the background; install once it's ready
      inAppUpdates.addStatusUpdateListener((status: any) => {
        if (status.bytesDownloaded != null && status.bytesDownloaded === status.totalBytesToDownload) {
          inAppUpdates.installUpdate();
        }
      });
    }
  } catch {
    // Not installed from Play / Play Services unavailable — ignore
  }
}

/** Is a newer version available on Play? Drives the update banner. */
export async function hasPlayUpdate(): Promise<boolean> {
  if (Platform.OS !== 'android' || __DEV__) return false;
  try {
    const { default: SpInAppUpdates } = require('sp-react-native-in-app-updates');
    const inAppUpdates = new SpInAppUpdates(false);
    const result = await inAppUpdates.checkNeedsUpdate();
    return !!result?.shouldUpdate;
  } catch {
    return false;
  }
}

/** Run the Play update flow, falling back to the store listing. */
export async function startPlayUpdate(): Promise<void> {
  try {
    const { default: SpInAppUpdates, IAUUpdateKind } = require('sp-react-native-in-app-updates');
    const inAppUpdates = new SpInAppUpdates(false);
    await inAppUpdates.startUpdate({ updateType: IAUUpdateKind.IMMEDIATE });
  } catch {
    openPlayListing();
  }
}

export function openPlayListing(): void {
  Linking.openURL(PLAY_URL).catch(() => {});
}
