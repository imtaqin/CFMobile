import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { CloudflareTunnel } from '@/services/cloudflare';

export default function TunnelsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [tunnels, setTunnels] = useState<CloudflareTunnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTunnels = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getTunnels(accountId);
      setTunnels(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchTunnels(); }, [fetchTunnels]);

  const handleDelete = (tunnel: CloudflareTunnel) => {
    if (!accountId) return;
    Alert.alert(
      t('tunnels.delete_title'),
      t('tunnels.delete_confirm', { name: tunnel.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteTunnel(accountId, tunnel.id);
              setTunnels((prev) => prev.filter((t) => t.id !== tunnel.id));
            } catch (e: any) {
              Alert.alert(t('common.error'), e?.response?.data?.errors?.[0]?.message ?? t('tunnels.delete_error'));
            }
          },
        },
      ]
    );
  };

  const renderTunnel = ({ item }: { item: CloudflareTunnel }) => {
    const isActive = item.status === 'healthy' || (item.conns_active ?? 0) > 0;
    return (
      <Group style={styles.item}>
        <ListRow
          icon="network"
          iconTone={isActive ? 'success' : 'neutral'}
          title={item.name}
          subtitle={`${item.conns_active ?? 0} ${t('tunnels.connections')}`}
          onPress={() => router.push({ pathname: '/tunnels/[tunnel]' as any, params: { tunnel: item.id } })}
          trailing={
            <View style={styles.trailing}>
              <Badge label={item.status ?? 'unknown'} variant={isActive ? 'success' : 'default'} />
              <TouchableOpacity
                onPress={() => handleDelete(item)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={t('common.delete')}
              >
                <Icon name="trash" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
          }
        />
      </Group>
    );
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('tunnels.title') }} />
        <View style={[styles.container, styles.list, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('tunnels.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={tunnels}
          keyExtractor={(item) => item.id}
          renderItem={renderTunnel}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchTunnels(); }} tintColor={colors.primary} />
          }
          ListEmptyComponent={
            <EmptyState
              icon="network"
              title={error ? t('common.error') : t('tunnels.no_tunnels')}
              message={error ?? t('tunnels.no_tunnels_message')}
            />
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { marginBottom: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
});
