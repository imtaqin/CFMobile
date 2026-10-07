import { Linking } from 'react-native';

export const PLAY_URL = 'https://github.com/imtaqin/CFMobile/releases/latest';

/**
 * FOSS build: there is no Play in-app update. New versions come from the
 * store that installed the app (F-Droid) or from GitHub Releases.
 */
export async function checkPlayUpdate(): Promise<void> {}

export async function hasPlayUpdate(): Promise<boolean> {
  return false;
}

export async function startPlayUpdate(): Promise<void> {
  openPlayListing();
}

export function openPlayListing(): void {
  Linking.openURL(PLAY_URL).catch(() => {});
}
