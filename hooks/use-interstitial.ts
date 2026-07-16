import { useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const INTERSTITIAL_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-9117362819301000/5487504315';

let counter = 0;
const SHOW_EVERY_N = 3;

export function useInterstitial() {
  const adRef = useRef<InterstitialAd | null>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (Platform.OS === 'web') return;

    const ad = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
      requestNonPersonalizedAdsOnly: false,
    });
    adRef.current = ad;

    const unsubLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      loadedRef.current = true;
    });
    const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      loadedRef.current = false;
      ad.load();
    });
    const unsubError = ad.addAdEventListener(AdEventType.ERROR, () => {
      loadedRef.current = false;
    });

    ad.load();

    return () => {
      unsubLoaded();
      unsubClosed();
      unsubError();
    };
  }, []);

  const maybeShow = useCallback(() => {
    if (Platform.OS === 'web') return;
    counter += 1;
    if (counter % SHOW_EVERY_N !== 0) return;
    if (loadedRef.current && adRef.current) {
      adRef.current.show();
    }
  }, []);

  return { maybeShow };
}
