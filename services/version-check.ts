import axios from 'axios';
import Constants from 'expo-constants';

const GITHUB_RELEASES_URL = 'https://api.github.com/repos/imtaqin/CFMobile/releases/latest';

export interface VersionInfo {
  current: string;
  latest: string;
  hasUpdate: boolean;
  releaseUrl: string;
  releaseNotes: string;
  publishedAt: string;
}

export const CURRENT_VERSION: string = (Constants.expoConfig?.version as string) ?? '1.0.0';

function compareVersions(a: string, b: string): number {
  const parse = (v: string) => v.replace(/^v/, '').split('.').map((n) => parseInt(n, 10) || 0);
  const [aMaj, aMin, aPatch] = parse(a);
  const [bMaj, bMin, bPatch] = parse(b);
  if (aMaj !== bMaj) return aMaj - bMaj;
  if (aMin !== bMin) return aMin - bMin;
  return aPatch - bPatch;
}

export async function checkForUpdate(): Promise<VersionInfo | null> {
  try {
    const res = await axios.get(GITHUB_RELEASES_URL, { timeout: 8000 });
    const latest = String(res.data?.tag_name ?? '').replace(/^v/, '');
    if (!latest) return null;
    return {
      current: CURRENT_VERSION,
      latest,
      hasUpdate: compareVersions(latest, CURRENT_VERSION) > 0,
      releaseUrl: res.data?.html_url ?? '',
      releaseNotes: res.data?.body ?? '',
      publishedAt: res.data?.published_at ?? '',
    };
  } catch {
    return null;
  }
}
