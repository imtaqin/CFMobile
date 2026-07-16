import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import {
  NativeAd,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
  TestIds,
} from 'react-native-google-mobile-ads';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, FontSize, Radius } from '@/constants/theme';

const NATIVE_AD_ID = __DEV__
  ? TestIds.NATIVE
  : 'ca-app-pub-9117362819301000/6559125363';

export function NativeAdCard() {
  const { colors } = useTheme();
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') return;

    NativeAd.createForAdRequest(NATIVE_AD_ID, {
      aspectRatio: 'landscape',
    })
      .then(setNativeAd)
      .catch(() => setFailed(true));

    return () => {
      nativeAd?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Platform.OS === 'web' || failed || !nativeAd) return null;

  return (
    <NativeAdView nativeAd={nativeAd}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <View style={styles.header}>
          {nativeAd.icon ? (
            <NativeAsset assetType={NativeAssetType.ICON}>
              <Image source={{ uri: nativeAd.icon.url }} style={styles.icon} />
            </NativeAsset>
          ) : null}
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <NativeAsset assetType={NativeAssetType.HEADLINE}>
                <Text style={[styles.headline, { color: colors.text }]} numberOfLines={1}>
                  {nativeAd.headline}
                </Text>
              </NativeAsset>
              <View style={[styles.adBadge, { backgroundColor: colors.warning }]}>
                <Text style={styles.adBadgeText}>Ad</Text>
              </View>
            </View>
            {nativeAd.advertiser ? (
              <NativeAsset assetType={NativeAssetType.ADVERTISER}>
                <Text style={[styles.advertiser, { color: colors.textSecondary }]} numberOfLines={1}>
                  {nativeAd.advertiser}
                </Text>
              </NativeAsset>
            ) : null}
          </View>
        </View>

        {nativeAd.body ? (
          <NativeAsset assetType={NativeAssetType.BODY}>
            <Text style={[styles.body, { color: colors.textSecondary }]} numberOfLines={2}>
              {nativeAd.body}
            </Text>
          </NativeAsset>
        ) : null}

        <NativeMediaView style={styles.media} resizeMode="cover" />

        {nativeAd.callToAction ? (
          <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
            <TouchableOpacity style={[styles.cta, { backgroundColor: colors.primary }]}>
              <Text style={styles.ctaText}>{nativeAd.callToAction}</Text>
            </TouchableOpacity>
          </NativeAsset>
        ) : null}
      </View>
    </NativeAdView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headline: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  advertiser: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  adBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  body: {
    fontSize: FontSize.sm,
    lineHeight: 18,
  },
  media: {
    width: '100%',
    height: 180,
    borderRadius: Radius.md,
  },
  cta: {
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFF',
    fontSize: FontSize.md,
    fontWeight: '600',
  },
});
