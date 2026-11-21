import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import {
  NativeAd,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
  TestIds,
} from 'react-native-google-mobile-ads';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { usePremium, isBillingAvailable } from '@/services/premium';
import { Spacing, FontSize, Radius } from '@/constants/theme';

// Real unit only ships in release builds; dev uses Google's test native unit.
const NATIVE_AD_ID = __DEV__
  ? TestIds.NATIVE
  : 'ca-app-pub-9117362819301000/6559125363';

/**
 * A native "Sponsored" card sized to sit between zone rows. Self-hides for
 * premium users, on web, where ads/billing are unavailable, and whenever the
 * ad fails to load — it never renders a broken or empty box. The NativeAd is
 * loaded in an effect and destroyed on unmount, mirroring AdBanner's
 * resilience (render null on failure instead of crashing the list).
 */
export function NativeAdCard() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const premium = usePremium();
  const [ad, setAd] = useState<NativeAd | null>(null);
  const [failed, setFailed] = useState(false);

  const disabled = premium || Platform.OS === 'web' || !isBillingAvailable();

  useEffect(() => {
    if (disabled) return;
    let active = true;
    let loaded: NativeAd | null = null;

    try {
      NativeAd.createForAdRequest(NATIVE_AD_ID)
        .then((native) => {
          if (!active) {
            try { native.destroy(); } catch { /* already gone */ }
            return;
          }
          loaded = native;
          setAd(native);
        })
        .catch(() => {
          if (active) setFailed(true);
        });
    } catch {
      if (active) setFailed(true);
    }

    return () => {
      active = false;
      if (loaded) {
        try { loaded.destroy(); } catch { /* already gone */ }
      }
    };
  }, [disabled]);

  if (disabled || failed || !ad) return null;

  const icon = ad.icon?.url;
  const hasMedia = !!ad.mediaContent;

  return (
    <NativeAdView
      nativeAd={ad}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
    >
      <View style={styles.header}>
        {icon ? (
          <NativeAsset assetType={NativeAssetType.ICON}>
            <Image source={{ uri: icon }} style={styles.icon} resizeMode="contain" />
          </NativeAsset>
        ) : (
          <View style={[styles.icon, { backgroundColor: colors.surfaceSecondary }]} />
        )}
        <View style={styles.headerText}>
          <NativeAsset assetType={NativeAssetType.HEADLINE}>
            <Text style={[styles.headline, { color: colors.text }]} numberOfLines={1}>
              {ad.headline}
            </Text>
          </NativeAsset>
          {!!ad.advertiser && (
            <NativeAsset assetType={NativeAssetType.ADVERTISER}>
              <Text style={[styles.advertiser, { color: colors.textTertiary }]} numberOfLines={1}>
                {ad.advertiser}
              </Text>
            </NativeAsset>
          )}
        </View>
        <View style={[styles.sponsored, { backgroundColor: colors.surfaceSecondary }]}>
          <Text style={[styles.sponsoredText, { color: colors.textSecondary }]}>
            {t('ads.sponsored')}
          </Text>
        </View>
      </View>

      {!!ad.body && (
        <NativeAsset assetType={NativeAssetType.BODY}>
          <Text style={[styles.body, { color: colors.textSecondary }]} numberOfLines={2}>
            {ad.body}
          </Text>
        </NativeAsset>
      )}

      {hasMedia && (
        <NativeMediaView style={styles.media} resizeMode="cover" />
      )}

      {!!ad.callToAction && (
        <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
          <View style={[styles.cta, { backgroundColor: colors.primary }]}>
            <Text style={styles.ctaText} numberOfLines={1}>{ad.callToAction}</Text>
          </View>
        </NativeAsset>
      )}
    </NativeAdView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    flex: 1,
  },
  headline: {
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  advertiser: {
    fontSize: 11,
    marginTop: 2,
  },
  sponsored: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  sponsoredText: {
    fontSize: 10,
    fontWeight: '600',
  },
  body: {
    fontSize: FontSize.sm,
  },
  media: {
    width: '100%',
    height: 140,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  cta: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});
