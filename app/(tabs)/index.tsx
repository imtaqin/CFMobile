import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { user } = useAuth();

  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  if (loading) return <Loading message={t('common.loading')} />;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      {/* Welcome Header */}
      <View style={styles.welcomeRow}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>{t('dashboard.welcome')}</Text>
          <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
            {user?.first_name || user?.email?.split('@')[0] || 'User'}
          </Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: CF.orange }]}>
          <Text style={styles.avatarText}>
            {(user?.first_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Icon name="globe" size={24} color={colors.primary} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{zones.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('dashboard.total_zones')}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Icon name="check-circle" size={24} color={colors.success} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{activeZones}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('dashboard.active')}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Icon name="clock" size={24} color={colors.warning} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{pendingZones}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('dashboard.pending')}</Text>
        </Card>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('dashboard.quick_actions')}</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.surface }]}
          onPress={() => router.push('/(tabs)/zones')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.info + '15' }]}>
            <Icon name="dns" size={22} color={colors.info} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>{t('dashboard.manage_dns')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.surface }]}
          onPress={() => {
            if (zones[0]) router.push(`/zone/${zones[0].id}/cache`);
            else Alert.alert(t('common.info'), t('dashboard.no_zones'));
          }}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.warning + '15' }]}>
            <Icon name="cached" size={22} color={colors.warning} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>{t('dashboard.purge_cache')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.surface }]}
          onPress={() => router.push('/(tabs)/services')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.success + '15' }]}>
            <Icon name="code" size={22} color={colors.success} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>{t('dashboard.workers')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.surface }]}
          onPress={() => {
            if (zones[0]) router.push(`/zone/${zones[0].id}/analytics`);
            else Alert.alert(t('common.info'), t('dashboard.no_zones'));
          }}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.error + '15' }]}>
            <Icon name="chart-line" size={22} color={colors.error} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>{t('dashboard.analytics')}</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Zones */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('dashboard.recent_zones')}</Text>
      {zones.slice(0, 5).map((zone) => (
        <Card
          key={zone.id}
          onPress={() => router.push(`/zone/${zone.id}`)}
          style={styles.zoneCard}
        >
          <View style={styles.zoneRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.zoneName, { color: colors.text }]}>{zone.name}</Text>
              <Text style={[styles.zonePlan, { color: colors.textSecondary }]}>
                {zone.plan.name} {zone.account.name ? `· ${zone.account.name}` : ''}
              </Text>
            </View>
            <Badge
              label={zone.status}
              variant={zone.status === 'active' ? 'success' : zone.status === 'pending' ? 'warning' : 'default'}
            />
          </View>
        </Card>
      ))}

      {zones.length === 0 && (
        <Card style={{ alignItems: 'center' as const, padding: Spacing.xxxl }}>
          <Icon name="cloud-off" size={40} color={colors.textTertiary} />
          <Text style={[{ color: colors.textSecondary, marginTop: Spacing.sm, fontSize: FontSize.md }]}>
            {t('dashboard.no_zones')}
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: { fontSize: FontSize.md },
  userName: { fontSize: FontSize.xxl, fontWeight: '700' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontSize: FontSize.lg, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center' as const,
    gap: Spacing.xs,
    paddingVertical: Spacing.lg,
  },
  statNumber: { fontSize: FontSize.xxl, fontWeight: '700' },
  statLabel: { fontSize: FontSize.xs },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
  actionBtn: {
    width: '48%' as any,
    flexGrow: 1,
    flexBasis: '45%',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { fontSize: FontSize.sm, fontWeight: '500', textAlign: 'center' },
  zoneCard: { marginBottom: Spacing.sm },
  zoneRow: { flexDirection: 'row', alignItems: 'center' },
  zoneName: { fontSize: FontSize.md, fontWeight: '600' },
  zonePlan: { fontSize: FontSize.sm, marginTop: 2 },
});
