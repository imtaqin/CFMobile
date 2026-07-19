import { Platform } from 'react-native';

/**
 * Check Google Play for an available update and show the Play in-app
 * update flow (flexible). No-op on web, dev builds, and non-Play installs.
 */
export async function checkPlayUpdate(): Promise<void> {
  if (Platform.OS !== 'android' || __DEV__) return;
  try {
    const { default: SpInAppUpdates, IAUUpdateKind } = require('sp-react-native-in-app-updates');
    const inAppUpdates = new SpInAppUpdates(false);
    const result = await inAppUpdates.checkNeedsUpdate();
    if (result.shouldUpdate) {
      await inAppUpdates.startUpdate({ updateType: IAUUpdateKind.FLEXIBLE });
      // Flexible flow downloads in background; install when downloaded
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
