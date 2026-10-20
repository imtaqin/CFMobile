import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert, Modal, FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonHeading, SkeletonRows, SkeletonStats, SkeletonTiles } from '@/components/ui/skeleton';
import { UpdateBanner } from '@/components/ui/update-banner';
import { AdBanner } from '@/components/ui/ad-banner';
import { DiceBearAvatar } from '@/components/ui/dicebear-avatar';
import { DiscoverCards } from '@/components/ui/discover-cards';
import { usePremium } from '@/services/premium';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

const maskAccount = (name: string) => {
  if (!name.includes('@')) return name;
  const [local, domain] = name.split('@');
  return local.slice(0, 2) + '••••@' + domain;
};

interface QuickAction {
  icon: IconName;
  label: string;
  onPress: () => void;
}

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { user, permissions } = useAuth();
  const premium = usePremium();
  const [showAdsConsent, setShowAdsConsent] = useState(false);

  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [zonePicker, setZonePicker] = useState<{ visible: boolean; target: string | null }>({ visible: false, target: null });

  const fetchData = useCallback(async () => {
    try {
      const res = await api.getZones(1);
      setZones(res.result ?? []);
    } catch {
      // silently handle
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // One-time friendly ads consent note
  useEffect(() => {
    if (premium) return;
    (async () => {
      try {
        const SecureStore = require('expo-secure-store');
        const seen = await SecureStore.getItemAsync('cf_ads_notice_seen');
        if (!seen) setShowAdsConsent(true);
      } catch {
        // ignore
      }
    })();
  }, [premium]);

  const dismissAdsConsent = async () => {
    setShowAdsConsent(false);
    try {
      const SecureStore = require('expo-secure-store');
      await SecureStore.setItemAsync('cf_ads_notice_seen', 'true');
    } catch {
      // ignore
    }
  };

  const onRefresh = () => { setRefreshing(true); fetchData(); };

  const activeZones = zones.filter((z) => z.status === 'active').length;
  const pendingZones = zones.filter((z) => z.status === 'pending').length;

  const openWithZonePicker = (target: string) => {
    if (zones.length === 0) {
      Alert.alert(t('common.info'), t('dashboard.no_zones'));
    } else if (zones.length === 1) {
      router.push(`/zone/${zones[0].id}/${target}`);
    } else {
      setZonePicker({ visible: true, target });
    }
  };

  const selectZone = (zoneId: string) => {
    setZonePicker({ visible: false, target: null });
    router.push(`/zone/${zoneId}/${zonePicker.target}`);
  };

  const allActions: (QuickAction & { gate: boolean })[] = [
    { icon: 'dns', label: t('dashboard.manage_dns'), onPress: () => router.push('/(tabs)/zones'), gate: permissions?.zones ?? true },
    { icon: 'cached', label: t('dashboard.purge_cache'), onPress: () => openWithZonePicker('cache'), gate: permissions?.cache ?? true },
    { icon: 'code', label: t('dashboard.workers'), onPress: () => router.push('/(tabs)/services'), gate: (permissions?.workers || permissions?.kv || permissions?.r2 || permissions?.pages) ?? true },
    { icon: 'chart-line', label: t('dashboard.analytics'), onPress: () => openWithZonePicker('analytics'), gate: permissions?.analytics ?? true },
    { icon: 'shield', label: t('dashboard.firewall'), onPress: () => openWithZonePicker('firewall'), gate: permissions?.firewall ?? true },
    { icon: 'lock', label: 'SSL/TLS', onPress: () => openWithZonePicker('ssl'), gate: permissions?.ssl ?? true },
    { icon: 'layers', label: t('bulk.title'), onPress: () => router.push('/bulk' as any), gate: zones.length > 1 },
  ];
  const actions: QuickAction[] = allActions.filter((a) => a.gate);

  // Mirrors the real layout below: profile card, zone counts, actions, zones.
  if (loading) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        scrollEnabled={false}
        accessibilityLabel={t('common.loading')}
      >
        <SkeletonRows count={1} />
        <View style={{ height: Spacing.md }} />
        <SkeletonStats count={3} />
        <SkeletonHeading />
        <SkeletonTiles count={6} />
        <SkeletonHeading width={130} />
        <SkeletonRows count={5} />
      </ScrollView>
    );
  }

  const statusColor = (status: string) =>
    status === 'active' ? colors.success : status === 'pending' ? colors.warning : colors.error;

  const stats: { label: string; value: number; dot?: string }[] = [
    { label: t('dashboard.total_zones'), value: zones.length },
    { label: t('dashboard.active'), value: activeZones, dot: colors.success },
    { label: t('dashboard.pending'), value: pendingZones, dot: colors.warning },
  ];

  const recent = zones.slice(0, 5);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      showsVerticalScrollIndicator={false}
    >
      <UpdateBanner />

      {/* Who is signed in */}
      <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <DiceBearAvatar seed={user?.email || user?.username || 'cfmobile'} size={44} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.greeting, { color: colors.textTertiary }]}>{t('dashboard.welcome')}</Text>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {user?.first_name || user?.email?.split('@')[0] || 'Admin'}
          </Text>
        </View>
      </View>

      {/* Zone counts */}
      <View style={styles.statsRow}>
        {stats.map((s) => (
          <View key={s.label} style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]} numberOfLines={1}>{s.label}</Text>
            <View style={styles.statValueRow}>
              <Text style={[styles.statValue, { color: colors.text }]}>{s.value}</Text>
              {s.dot && <View style={[styles.statDot, { backgroundColor: s.dot }]} />}
            </View>
          </View>
        ))}
      </View>

      <AdBanner />

      <DiscoverCards firstZoneId={zones[0]?.id} />

      {/* Quick actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('dashboard.quick_actions')}</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={[styles.actionTile, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.surfaceSecondary }]}>
              <Icon name={action.icon} size={18} color={colors.text} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.text }]} numberOfLines={1}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent zones */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 0, marginTop: 0, marginHorizontal: 0 }]}>
          {t('dashboard.recent_zones')}
        </Text>
        {zones.length > 5 && (
          <TouchableOpacity onPress={() => router.push('/(tabs)/zones')} hitSlop={8}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>{t('dashboard.see_all')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {recent.length > 0 ? (
        <View style={[styles.listCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          {recent.map((zone, idx) => (
            <TouchableOpacity
              key={zone.id}
              style={[styles.zoneRow, idx > 0 && { borderTopWidth: 1, borderTopColor: colors.borderLight }]}
              onPress={() => router.push(`/zone/${zone.id}`)}
              activeOpacity={0.7}
            >
              <View style={[styles.zoneDot, { backgroundColor: statusColor(zone.status) }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.zoneName, { color: colors.text }]} numberOfLines={1}>{zone.name}</Text>
                <Text style={[styles.zoneMeta, { color: colors.textTertiary }]} numberOfLines={1}>
                  {zone.plan.name}{zone.account.name ? ` · ${maskAccount(zone.account.name)}` : ''}
                </Text>
              </View>
              <Icon name="chevron-right" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={[styles.listCard, styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <Icon name="cloud-off" size={28} color={colors.textTertiary} />
          <Text style={{ color: colors.textSecondary, fontSize: FontSize.sm }}>{t('dashboard.no_zones')}</Text>
        </View>
      )}

      {/* Ads consent notice (once) */}
      <Modal
        visible={showAdsConsent}
        transparent
        animationType="fade"
        onRequestClose={dismissAdsConsent}
      >
        <View style={styles.consentOverlay}>
          <View style={[styles.consentCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.consentIcon, { backgroundColor: CF.orange + '18' }]}>
              <Icon name="info" size={26} color={CF.orange} />
            </View>
            <Text style={[styles.consentTitle, { color: colors.text }]}>{t('ads_notice.title')}</Text>
            <Text style={[styles.consentBody, { color: colors.textSecondary }]}>{t('ads_notice.body')}</Text>
            <TouchableOpacity
              style={[styles.consentPrimary, { backgroundColor: CF.orange }]}
              onPress={dismissAdsConsent}
              activeOpacity={0.85}
            >
              <Text style={styles.consentPrimaryText}>{t('ads_notice.ok')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { dismissAdsConsent(); router.push('/(tabs)/settings'); }}
              hitSlop={8}
            >
              <Text style={[styles.consentSecondary, { color: colors.textSecondary }]}>{t('ads_notice.premium')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Zone Picker Modal */}
      <Modal
        visible={zonePicker.visible}
        transparent
        animationType="slide"
        onRequestClose={() => setZonePicker({ visible: false, target: null })}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('dashboard.select_zone')}</Text>
              <TouchableOpacity onPress={() => setZonePicker({ visible: false, target: null })} hitSlop={8}>
                <Icon name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={zones}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.zonePickerItem, { borderTopColor: colors.borderLight }]}
                  onPress={() => selectZone(item.id)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.zoneName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.zoneMeta, { color: colors.textTertiary }]}>{item.plan.name}</Text>
                  </View>
                  <Badge
                    label={item.status}
                    variant={item.status === 'active' ? 'success' : item.status === 'pending' ? 'warning' : 'default'}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingTop: Spacing.sm, paddingBottom: Spacing.xxl },

  // Profile
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  greeting: { fontSize: FontSize.xs },
  name: { fontSize: FontSize.lg, fontWeight: '500', marginTop: 1 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 6,
  },
  statLabel: { fontSize: FontSize.xs },
  statValueRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statValue: { fontSize: 26, fontWeight: '400', letterSpacing: -0.5 },
  statDot: { width: 7, height: 7, borderRadius: 4 },

  // Sections
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: '500',
    marginHorizontal: Spacing.lg + Spacing.xs,
    marginBottom: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.lg + Spacing.xs,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  seeAll: { fontSize: FontSize.sm, fontWeight: '500' },

  // Quick actions
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
  },
  actionTile: {
    flexBasis: '31%',
    flexGrow: 1,
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { fontSize: FontSize.xs, fontWeight: '500' },

  // Zones
  listCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  emptyCard: { alignItems: 'center', gap: Spacing.sm, padding: Spacing.xxl },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
  },
  zoneDot: { width: 8, height: 8, borderRadius: 4 },
  zoneName: { fontSize: FontSize.md, fontWeight: '500' },
  zoneMeta: { fontSize: FontSize.xs, marginTop: 2 },

  // Ads consent
  consentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  consentCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  consentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  consentTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
  },
  consentBody: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    textAlign: 'center',
  },
  consentPrimary: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    marginTop: Spacing.md,
  },
  consentPrimaryText: {
    color: '#FFF',
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  consentSecondary: {
    fontSize: FontSize.sm,
    textDecorationLine: 'underline',
    paddingVertical: Spacing.xs,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: '60%',
    paddingBottom: Spacing.xxxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalTitle: { fontSize: FontSize.lg, fontWeight: '500' },
  zonePickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
  },
});
