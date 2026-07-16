import { useState } from 'react';
import { View, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const BANNER_ID = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-9117362819301000/5487504315';

export function AdBanner() {
  const [failed, setFailed] = useState(false);

  if (Platform.OS === 'web' || failed) return null;

  return (
    <View style={{ alignItems: 'center', marginVertical: 8 }}>
      <BannerAd
        unitId={BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={() => setFailed(true)}
      />
    </View>
  );
}
