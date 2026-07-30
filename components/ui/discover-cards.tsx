import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { usePremium } from '@/services/premium';
import { openReview } from '@/services/review-prompt';
import * as monitoring from '@/services/monitoring';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';

interface DiscoverCard {
  key: string;
  icon: IconName;
  color: string;
  title: string;
  body: string;
  cta: string;
  onPress: () => void;
}

/**
 * Feature discovery strip on the dashboard. Always visible so people keep
 * finding the parts of the app they haven't tried yet — the cards themselves
 * change based on what the user already has.
 */
export function DiscoverCards({ firstZoneId }: { firstZoneId?: string }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const premium = usePremium();
  const [monitorOn, setMonitorOn] = useState(false);

  useEffect(() => {
    monitoring.getConfig().then((c) => setMonitorOn(c.enabled && c.zoneIds.length > 0)).catch(() => {});
  }, []);

  const cards: DiscoverCard[] = [];

  // AI audit — the most impressive thing to try first
  cards.push({
    key: 'ai',
    icon: 'shield-check',
    color: CF.orange,
    title: t('discover.ai_title'),
    body: t('discover.ai_body'),
    cta: t('discover.ai_cta'),
    onPress: () =>
      firstZoneId
        ? router.push({ pathname: '/zone/[id]/ai-audit' as any, params: { id: firstZoneId } })
        : router.push('/(tabs)/zones'),
  });

  if (!monitorOn) {
    cards.push({
      key: 'monitor',
      icon: 'activity',
      color: '#10B981',
      title: t('discover.monitor_title'),
      body: t('discover.monitor_body'),
      cta: t('discover.monitor_cta'),
      onPress: () => router.push('/monitoring' as any),
    });
  }

  if (!premium) {
    cards.push({
      key: 'premium',
      icon: 'zap',
      color: '#8B5CF6',
      title: t('discover.premium_title'),
      body: t('discover.premium_body'),
      cta: t('discover.premium_cta'),
      onPress: () => router.push('/(tabs)/settings'),
    });
  }

  cards.push({
    key: 'review',
    icon: 'check-circle',
    color: '#F59E0B',
    title: t('discover.review_title'),
    body: t('discover.review_body'),
    cta: t('discover.review_cta'),
    onPress: () => openReview(),
  });

  cards.push({
    key: 'oss',
    icon: 'code',
    color: colors.info,
    title: t('discover.oss_title'),
    body: t('discover.oss_body'),
    cta: t('discover.oss_cta'),
    onPress: () => router.push('/about'),
  });

  return (
    <>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('discover.title')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.strip}
        style={styles.scroll}
      >
        {cards.map((card) => (
          <TouchableOpacity
            key={card.key}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: card.color + '35' }]}
            onPress={card.onPress}
            activeOpacity={0.8}
          >
            <View style={[styles.iconWrap, { backgroundColor: card.color + '18' }]}>
              <Icon name={card.icon} size={20} color={card.color} />
            </View>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{card.title}</Text>
            <Text style={[styles.body, { color: colors.textSecondary }]} numberOfLines={3}>{card.body}</Text>
            <View style={styles.ctaRow}>
              <Text style={[styles.cta, { color: card.color }]}>{card.cta}</Text>
              <Icon name="chevron-right" size={14} color={card.color} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  scroll: { marginBottom: Spacing.xl },
  strip: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  card: {
    width: 230,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 6,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  title: { fontSize: FontSize.sm, fontWeight: '800' },
  body: { fontSize: FontSize.xs, lineHeight: 16, minHeight: 48 },
  ctaRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 },
  cta: { fontSize: FontSize.xs, fontWeight: '800' },
});
