import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, Alert, Switch,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { MenuItem } from '@/components/ui/menu-item';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

const maskName = (name: string) => {
  if (!name.includes('@')) return name;
  const [local, domain] = name.split('@');
  return local.slice(0, 2) + '\u2022\u2022\u2022\u2022@' + domain;
};

export default function ZoneDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [zone, setZone] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [devMode, setDevMode] = useState(false);

  const fetchZone = useCallback(async () => {
    try {
      const res = await api.getZone(id);
      setZone(res.result);
      setDevMode((res.result?.development_mode ?? 0) > 0);
    } catch {
      Alert.alert(t('common.error'), t('zone.fetch_error'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, t]);

  useEffect(() => { fetchZone(); }, [fetchZone]);

  const toggleDevMode = async (value: boolean) => {
    setDevMode(value);
    try {
      await api.toggleDevMode(id, value ? 'on' : 'off');
    } catch {
      setDevMode(!value);
      Alert.alert(t('common.error'), t('zone.dev_mode_error'));
    }
  };

  if (loading || !zone) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: zone.name }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchZone(); }} tintColor={colors.primary} />}
      >
        {/* Zone Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={[styles.zoneName, { color: colors.text }]}>{zone.name}</Text>
            <Badge
              label={zone.status}
              variant={zone.status === 'active' ? 'success' : zone.status === 'pending' ? 'warning' : 'error'}
            />
          </View>
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: colors.textTertiary }]}>{t('zone.plan')}</Text>
              <Text style={[styles.metaValue, { color: colors.text }]}>{zone.plan.name}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: colors.textTertiary }]}>{t('zone.account')}</Text>
              <Text style={[styles.metaValue, { color: colors.text }]}>{maskName(zone.account.name)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: colors.textTertiary }]}>{t('zone.type')}</Text>
              <Text style={[styles.metaValue, { color: colors.text }]}>{zone.type}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: colors.textTertiary }]}>{t('zone.created')}</Text>
              <Text style={[styles.metaValue, { color: colors.text }]}>
                {new Date(zone.created_on).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Toggle */}
        <Card style={styles.toggleCard}>
          <View style={styles.toggleRow}>
            <Icon name="developer-mode" size={22} color={colors.warning} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>{t('zone.dev_mode')}</Text>
              <Text style={[styles.toggleDesc, { color: colors.textSecondary }]}>{t('zone.dev_mode_desc')}</Text>
            </View>
            <Switch
              value={devMode}
              onValueChange={toggleDevMode}
              trackColor={{ true: colors.primary }}
            />
          </View>
        </Card>

        {/* Nameservers */}
        <SectionHeader title={t('zone.nameservers')} />
        <Card>
          {zone.name_servers?.map((ns, i) => (
            <View key={ns} style={[styles.nsRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.borderLight }]}>
              <Icon name="dns" size={16} color={colors.info} />
              <Text style={[styles.nsText, { color: colors.text }]}>{ns}</Text>
            </View>
          ))}
        </Card>

        {/* Management Menu */}
        <SectionHeader title={t('zone.management')} />
        <Card style={{ padding: 0, overflow: 'hidden' as const }}>
          <MenuItem
            icon="dns"
            iconColor={colors.info}
            title={t('zone.dns_records')}
            subtitle={t('zone.dns_records_desc')}
            onPress={() => router.push(`/zone/${id}/dns`)}
          />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <MenuItem
            icon="lock"
            iconColor={colors.success}
            title={t('zone.ssl_tls')}
            subtitle={t('zone.ssl_tls_desc')}
            onPress={() => router.push(`/zone/${id}/ssl`)}
          />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <MenuItem
            icon="shield"
            iconColor={colors.error}
            title={t('zone.firewall')}
            subtitle={t('zone.firewall_desc')}
            onPress={() => router.push(`/zone/${id}/firewall`)}
          />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <MenuItem
            icon="cached"
            iconColor={colors.warning}
            title={t('zone.cache')}
            subtitle={t('zone.cache_desc')}
            onPress={() => router.push(`/zone/${id}/cache`)}
          />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <MenuItem
            icon="chart-line"
            iconColor="#9333EA"
            title={t('zone.analytics')}
            subtitle={t('zone.analytics_desc')}
            onPress={() => router.push(`/zone/${id}/analytics`)}
          />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <MenuItem
            icon="rule"
            iconColor={colors.primary}
            title={t('zone.page_rules')}
            subtitle={t('zone.page_rules_desc')}
            onPress={() => router.push(`/zone/${id}/pagerules`)}
          />
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  infoCard: { marginBottom: Spacing.sm },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  zoneName: { fontSize: FontSize.xl, fontWeight: '700', flex: 1, marginRight: Spacing.sm },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  metaItem: { flexBasis: '45%' },
  metaLabel: { fontSize: FontSize.xs, marginBottom: 2 },
  metaValue: { fontSize: FontSize.sm, fontWeight: '500' },
  toggleCard: { marginBottom: Spacing.sm },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  toggleTitle: { fontSize: FontSize.md, fontWeight: '500' },
  toggleDesc: { fontSize: FontSize.sm, marginTop: 2 },
  nsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  nsText: { fontSize: FontSize.sm, fontFamily: 'monospace' },
  divider: { height: 1, marginLeft: 64 },
});
