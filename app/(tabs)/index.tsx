import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert, Modal, FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { AdBanner } from '@/components/ui/ad-banner';
import { NativeAdCard } from '@/components/ui/native-ad';
import { UpdateBanner } from '@/components/ui/update-banner';
import { useInterstitial } from '@/hooks/use-interstitial';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

const maskAccount = (name: string) => {
  if (!name.includes('@')) return name;
  const [local, domain] = name.split('@');
  return local.slice(0, 2) + '\u2022\u2022\u2022\u2022@' + domain;
};

interface QuickAction {
  icon: IconName;
  label: string;
  color: string;
  onPress: () => void;
}

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const { user, permissions } = useAuth();
  const { maybeShow } = useInterstitial();

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
    { icon: 'dns', label: t('dashboard.manage_dns'), color: colors.info, onPress: () => router.push('/(tabs)/zones'), gate: permissions?.zones ?? true },
    { icon: 'cached', label: t('dashboard.purge_cache'), color: colors.warning, onPress: () => openWithZonePicker('cache'), gate: permissions?.cache ?? true },
    { icon: 'code', label: t('dashboard.workers'), color: colors.success, onPress: () => router.push('/(tabs)/services'), gate: (permissions?.workers || permissions?.kv || permissions?.r2 || permissions?.pages) ?? true },
    { icon: 'chart-line', label: t('dashboard.analytics'), color: colors.error, onPress: () => openWithZonePicker('analytics'), gate: permissions?.analytics ?? true },
    { icon: 'shield', label: t('dashboard.firewall'), color: '#8B5CF6', onPress: () => openWithZonePicker('firewall'), gate: permissions?.firewall ?? true },
    { icon: 'lock', label: 'SSL/TLS', color: '#06B6D4', onPress: () => openWithZonePicker('ssl'), gate: permissions?.ssl ?? true },
  ];
  const actions: QuickAction[] = allActions.filter((a) => a.gate);

  if (loading) return <Loading message={t('common.loading')} />;

  const statusDot = (status: string) => (
    <View style={[styles.statusDot, {
      backgroundColor: status === 'active' ? colors.success : status === 'pending' ? colors.warning : colors.error,
    }]} />
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      <UpdateBanner />

      {/* Hero Card */}
      <View style={[styles.heroCard, { backgroundColor: isDark ? '#1A1F2E' : CF.orange }]}>
        <View style={styles.heroTop}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.heroGreeting, { color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.8)' }]}>
              {t('dashboard.welcome')}
            </Text>
            <Text style={[styles.heroName, { color: isDark ? colors.text : '#FFF' }]} numberOfLines={1}>
              {user?.first_name || 'User'}
            </Text>
          </View>
          <View style={[styles.avatar, { backgroundColor: isDark ? CF.orange : 'rgba(255,255,255,0.25)' }]}>
            <Text style={styles.avatarText}>
              {(user?.first_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Stats Row inside hero */}
        <View style={styles.heroStats}>
          <View style={styles.heroStatItem}>
            <Text style={[styles.heroStatNum, { color: isDark ? colors.text : '#FFF' }]}>{zones.length}</Text>
            <Text style={[styles.heroStatLabel, { color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.75)' }]}>
              {t('dashboard.total_zones')}
            </Text>
          </View>
          <View style={[styles.heroStatDivider, { backgroundColor: isDark ? colors.border : 'rgba(255,255,255,0.2)' }]} />
          <View style={styles.heroStatItem}>
            <Text style={[styles.heroStatNum, { color: isDark ? colors.success : '#FFF' }]}>{activeZones}</Text>
            <Text style={[styles.heroStatLabel, { color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.75)' }]}>
              {t('dashboard.active')}
            </Text>
          </View>
          <View style={[styles.heroStatDivider, { backgroundColor: isDark ? colors.border : 'rgba(255,255,255,0.2)' }]} />
          <View style={styles.heroStatItem}>
            <Text style={[styles.heroStatNum, { color: isDark ? colors.warning : '#FFF' }]}>{pendingZones}</Text>
            <Text style={[styles.heroStatLabel, { color: isDark ? colors.textSecondary : 'rgba(255,255,255,0.75)' }]}>
              {t('dashboard.pending')}
            </Text>
          </View>
        </View>
      </View>

      <AdBanner />

      {/* Quick Actions — horizontal scroll */}
      <Text style={[styles.sectionTitle, { color: colors.text, paddingHorizontal: Spacing.lg }]}>{t('dashboard.quick_actions')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionsScroll} contentContainerStyle={styles.actionsContent}>
        {actions.map((action, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.actionChip, { backgroundColor: colors.surface }]}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.actionChipIcon, { backgroundColor: action.color + '15' }]}>
              <Icon name={action.icon} size={18} color={action.color} />
            </View>
            <Text style={[styles.actionChipText, { color: colors.text }]} numberOfLines={1}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recent Zones */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 0 }]}>{t('dashboard.recent_zones')}</Text>
        {zones.length > 5 && (
          <TouchableOpacity onPress={() => router.push('/(tabs)/zones')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>{t('dashboard.see_all')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {zones.slice(0, 5).map((zone, idx) => (
        <View key={zone.id}>
          <TouchableOpacity
            style={[styles.zoneItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
            onPress={() => { maybeShow(); router.push(`/zone/${zone.id}`); }}
            activeOpacity={0.7}
          >
            <View style={[styles.zoneIconWrap, { backgroundColor: colors.primary + '12' }]}>
              <Icon name="globe" size={20} color={colors.primary} />
            </View>
            <View style={styles.zoneInfo}>
              <View style={styles.zoneNameRow}>
                {statusDot(zone.status)}
                <Text style={[styles.zoneName, { color: colors.text }]} numberOfLines={1}>{zone.name}</Text>
              </View>
              <Text style={[styles.zoneMeta, { color: colors.textTertiary }]} numberOfLines={1}>
                {zone.plan.name}{zone.account.name ? ` \u00B7 ${maskAccount(zone.account.name)}` : ''}
              </Text>
            </View>
            <Icon name="chevron-right" size={18} color={colors.textTertiary} />
          </TouchableOpacity>
          {idx === 2 && <NativeAdCard />}
        </View>
      ))}

      {zones.length === 0 && (
        <Card style={{ alignItems: 'center' as const, padding: Spacing.xxxl }}>
          <Icon name="cloud-off" size={40} color={colors.textTertiary} />
          <Text style={[{ color: colors.textSecondary, marginTop: Spacing.sm, fontSize: FontSize.md }]}>
            {t('dashboard.no_zones')}
          </Text>
        </Card>
      )}

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
              <TouchableOpacity onPress={() => setZonePicker({ visible: false, target: null })}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={zones}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.zonePickerItem, { borderBottomColor: colors.border }]}
                  onPress={() => selectZone(item.id)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.zoneName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.zoneMeta, { color: colors.textSecondary }]}>{item.plan.name}</Text>
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
  content: { paddingBottom: Spacing.xxxl },

  // Hero
  heroCard: {
    margin: Spacing.lg,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  heroGreeting: { fontSize: FontSize.sm },
  heroName: { fontSize: FontSize.xxl, fontWeight: '700', marginTop: 2 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontSize: FontSize.lg, fontWeight: '700' },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatNum: { fontSize: FontSize.xxl, fontWeight: '800' },
  heroStatLabel: { fontSize: FontSize.xs, marginTop: 2 },
  heroStatDivider: { width: 1, height: 32 },

  // Section
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  seeAll: { fontSize: FontSize.sm, fontWeight: '600' },

  // Quick Actions
  actionsScroll: { marginBottom: Spacing.xl },
  actionsContent: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  actionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    gap: Spacing.sm,
  },
  actionChipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionChipText: { fontSize: FontSize.sm, fontWeight: '500' },

  // Zone Items
  zoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  zoneIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneInfo: { flex: 1 },
  zoneNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  zoneName: { fontSize: FontSize.md, fontWeight: '600' },
  zoneMeta: { fontSize: FontSize.xs, marginTop: 2, marginLeft: 16 },

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
  modalTitle: { fontSize: FontSize.lg, fontWeight: '700' },
  zonePickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
});
