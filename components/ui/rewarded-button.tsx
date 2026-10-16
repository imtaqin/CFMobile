import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RewardedAd, RewardedAdEventType, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Button } from '@/components/ui/button';
import { installId } from '@/services/ai';
import * as adReward from '@/services/ad-reward';

/**
 * "Watch an ad, get it for a day" button.
 *
 * AdMob requires the exchange to be offered before the ad loads and to be the
 * user's own choice, which is why this is a button on the paywall rather than
 * anything automatic.
 *
 * The install id rides along as `custom_data` so AdMob's verification callback
 * can tell our worker who earned the reward. A screen pass does not need that
 * — it is granted here, on the device — but the callback fires for every
 * rewarded view regardless, and the worker has to recognise which is which.
 */

const AD_UNIT = __DEV__ ? TestIds.REWARDED : adReward.REWARDED_AD_UNIT_ID;

interface RewardedButtonProps {
  /** Screen this unlocks for a day, or 'ai' to top up AI actions. */
  feature: string;
  /** Run after the reward is earned — refresh a quota, reload a screen. */
  onEarned?: () => void;
}

export function RewardedButton({ feature, onEarned }: RewardedButtonProps) {
  const { t } = useTranslation();
  const [install, setInstall] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    installId().then(setInstall).catch(() => setUnavailable(true));
  }, []);

  // Callers tend to pass an inline arrow, which would otherwise make the
  // listener effect re-run — and reload the ad — on every render.
  const onEarnedRef = useRef(onEarned);
  onEarnedRef.current = onEarned;

  // One ad object per install id: creating it needs the custom data up front.
  const ad = useMemo(() => {
    if (!install || Platform.OS === 'web') return null;
    return RewardedAd.createForAdRequest(AD_UNIT, {
      serverSideVerificationOptions: { customData: `${install}.${feature === 'ai' ? 'ai' : 'pass'}` },
    });
  }, [install, feature]);

  useEffect(() => {
    if (!ad) return;
    const offLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => setReady(true));
    const offEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      // A screen pass is ours to grant; AI actions are credited by the worker
      // from AdMob's signed callback, so here we only note the view.
      if (feature === 'ai') adReward.noteAdWatched();
      else adReward.grantPass(feature);
      onEarnedRef.current?.();
    });
    const offClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      setBusy(false);
      setReady(false);
    });
    const offError = ad.addAdEventListener(AdEventType.ERROR, () => {
      setBusy(false);
      setReady(false);
      setUnavailable(true);
    });

    ad.load();
    return () => {
      offLoaded();
      offEarned();
      offClosed();
      offError();
    };
  }, [ad, feature]);

  const show = useCallback(() => {
    if (!ad || !ready) return;
    setBusy(true);
    try {
      ad.show();
    } catch {
      setBusy(false);
      Alert.alert(t('common.error'), t('reward.unavailable'));
    }
  }, [ad, ready, t]);

  // No inventory, no web, no ads left today: say nothing rather than show a
  // button that cannot do anything.
  if (Platform.OS === 'web' || unavailable || !adReward.viewsLeftToday()) return null;

  return (
    <Button
      title={feature === 'ai' ? t('reward.watch_for_actions') : t('reward.watch_for_day')}
      variant="secondary"
      onPress={show}
      loading={busy}
      disabled={!ready}
      style={{ marginTop: 12, alignSelf: 'stretch' }}
    />
  );
}
