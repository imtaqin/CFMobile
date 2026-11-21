import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Skeleton, SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { ChipRow, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { LBPool, LBMonitor, LoadBalancer } from '@/services/cloudflare';

type Tab = 'balancers' | 'pools' | 'monitors';

const TABS: Tab[] = ['balancers', 'pools', 'monitors'];

export default function LoadBalancersScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [tab, setTab] = useState<Tab>('balancers');
  const [lbs, setLbs] = useState<LoadBalancer[]>([]);
  const [pools, setPools] = useState<LBPool[]>([]);
  const [monitors, setMonitors] = useState<LBMonitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    const [lbRes, poolRes, monRes] = await Promise.allSettled([
      api.getLoadBalancers(accountId),
      api.getLBPools(accountId),
      api.getLBMonitors(accountId),
    ]);
    if (lbRes.status === 'fulfilled') setLbs(lbRes.value.result ?? []);
    if (poolRes.status === 'fulfilled') setPools(poolRes.value.result ?? []);
    if (monRes.status === 'fulfilled') setMonitors(monRes.value.result ?? []);
    if (lbRes.status === 'rejected') setError(lbRes.reason?.response?.data?.errors?.[0]?.message ?? 'Error');
    setLoading(false);
    setRefreshing(false);
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleDeleteLB = (lb: LoadBalancer) => {
    if (!accountId) return;
    Alert.alert(t('lb.delete_title'), t('lb.delete_confirm', { name: lb.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteLoadBalancer(accountId, lb.id); setLbs((p) => p.filter((x) => x.id !== lb.id)); }
        catch { Alert.alert(t('common.error'), t('lb.delete_error')); }
      }},
    ]);
  };

  const handleDeletePool = (pool: LBPool) => {
    if (!accountId) return;
    Alert.alert(t('lb.delete_pool_title'), t('lb.delete_pool_confirm', { name: pool.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteLBPool(accountId, pool.id); setPools((p) => p.filter((x) => x.id !== pool.id)); }
        catch { Alert.alert(t('common.error'), t('lb.delete_error')); }
      }},
    ]);
  };

  const handleDeleteMonitor = (mon: LBMonitor) => {
    if (!accountId) return;
    Alert.alert(t('lb.delete_monitor_title'), t('lb.delete_monitor_confirm', { name: mon.description || mon.id }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteLBMonitor(accountId, mon.id); setMonitors((p) => p.filter((x) => x.id !== mon.id)); }
        catch { Alert.alert(t('common.error'), t('lb.delete_error')); }
      }},
    ]);
  };

  const trash = (onPress: () => void) => (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={t('common.delete')}
    >
      <Icon name="trash" size={16} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  const renderLB = ({ item }: { item: LoadBalancer }) => (
    <Group style={styles.item}>
      <ListRow
        icon="network"
        iconTone={item.enabled ? 'success' : 'neutral'}
        title={item.name}
        subtitle={`${item.default_pools?.length ?? 0} ${t('lb.pools')} · ${item.steering_policy}`}
        trailing={
          <View style={styles.trailing}>
            <Badge label={item.enabled ? t('lb.enabled') : t('lb.disabled')} variant={item.enabled ? 'success' : 'default'} />
            {trash(() => handleDeleteLB(item))}
          </View>
        }
      />
    </Group>
  );

  const renderPool = ({ item }: { item: LBPool }) => (
    <Group style={styles.item}>
      <ListRow
        icon="server"
        title={item.name}
        subtitle={`${item.origins?.length ?? 0} ${t('lb.origins')} · ${item.enabled ? t('lb.enabled') : t('lb.disabled')}`}
        trailing={trash(() => handleDeletePool(item))}
      />
    </Group>
  );

  const renderMonitor = ({ item }: { item: LBMonitor }) => (
    <Group style={styles.item}>
      <ListRow
        icon="monitor"
        title={item.description || `${item.type.toUpperCase()} :${item.port}${item.path}`}
        subtitle={`${item.type.toUpperCase()} · ${t('lb.every')} ${item.interval}s · ${t('lb.timeout')} ${item.timeout}s`}
        trailing={trash(() => handleDeleteMonitor(item))}
      />
    </Group>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('lb.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <View style={[styles.tabs, { flexDirection: 'row', gap: Spacing.sm }]}>
            {TABS.map((tb) => <Skeleton key={tb} width={92} height={32} radius={16} />)}
          </View>
          <View style={styles.list}>
            <SkeletonRows count={6} />
          </View>
        </View>
      </>
    );
  }

  const count = (tb: Tab) => (tb === 'balancers' ? lbs.length : tb === 'pools' ? pools.length : monitors.length);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />
  );

  return (
    <>
      <Stack.Screen options={{ title: t('lb.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.tabs}>
          <ChipRow
            options={TABS.map((tb) => ({ value: tb, label: `${t(`lb.tab_${tb}`)} (${count(tb)})` }))}
            value={tab}
            onChange={setTab}
          />
        </View>

        {tab === 'balancers' && (
          <FlatList
            data={lbs}
            keyExtractor={(item) => item.id}
            renderItem={renderLB}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={refreshControl}
            ListEmptyComponent={<EmptyState icon="network" title={error ? t('common.error') : t('lb.no_items')} message={error ?? t('lb.no_items_message')} />}
          />
        )}
        {tab === 'pools' && (
          <FlatList
            data={pools}
            keyExtractor={(item) => item.id}
            renderItem={renderPool}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={refreshControl}
            ListEmptyComponent={<EmptyState icon="server" title={t('lb.no_pools')} message={t('lb.no_pools_message')} />}
          />
        )}
        {tab === 'monitors' && (
          <FlatList
            data={monitors}
            keyExtractor={(item) => item.id}
            renderItem={renderMonitor}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={refreshControl}
            ListEmptyComponent={<EmptyState icon="monitor" title={t('lb.no_monitors')} message={t('lb.no_monitors_message')} />}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.md },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { marginBottom: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
});
