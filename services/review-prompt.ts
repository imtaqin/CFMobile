import { Linking } from 'react-native';

const REPO_URL = 'https://github.com/imtaqin/CFMobile';

/** FOSS build: no Play review sheet, so there is nothing to count towards. */
export async function recordHappyMoment(): Promise<void> {}

/** "Rate us" in Settings opens the repository instead. */
export async function openReview(): Promise<void> {
  Linking.openURL(REPO_URL).catch(() => {});
}
