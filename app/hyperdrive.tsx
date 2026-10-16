import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { HyperdriveConfig } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function HyperdriveScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('hyperdrive');

  const [configs, setConfigs] = useState<HyperdriveConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restartingId, setRestartingId] = useState<string | null>(null);

  const fetchConfigs = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getHyperdriveConfigs(accountId);
      setConfigs(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchConfigs(); }, [fetchConfigs]);

  const handleRestart = (config: HyperdriveConfig) => {
    if (!accountId) return;
    Alert.alert(t('hyperdrive.restart_title'), t('hyperdrive.restart_confirm', { name: config.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('hyperdrive.restart'), onPress: async () => {
        setRestartingId(config.id);
        try { await api.restartHyperdriveConfig(accountId, config.id); }
        catch { Alert.alert(t('common.error'), t('hyperdrive.restart_error')); }
        finally { setRestartingId(null); }
      }},
    ]);
  };

  const handleDelete = (config: HyperdriveConfig) => {
    if (!accountId) return;
    Alert.alert(t('hyperdrive.delete_title'), t('hyperdrive.delete_confirm', { name: config.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteHyperdriveConfig(accountId, config.id); setConfigs((p) => p.filter((c) => c.id !== config.id)); }
        catch { Alert.alert(t('common.error'), t('hyperdrive.delete_error')); }
      }},
    ]);
  };

  const renderConfig = ({ item }: { item: HyperdriveConfig }) => (
    <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <ListRow
        icon="database"
        title={item.name}
        subtitle={`${item.origin?.host ?? '—'}${item.origin?.database ? ` / ${item.origin.database}` : ''}`}
        mono
        trailing={
          <>
            <TouchableOpacity
              onPress={() => handleRestart(item)}
              hitSlop={10}
              disabled={restartingId === item.id}
              accessibilityRole="button"
              accessibilityLabel={t('hyperdrive.restart')}
            >
              <Icon name="refresh" size={16} color={restartingId === item.id ? colors.textTertiary : colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={t('common.delete')}
            >
              <Icon name="trash" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          </>
        }
      />
      {item.caching?.disabled && (
        <View style={styles.badges}>
          <Badge label={t('hyperdrive.caching_disabled')} variant="warning" />
        </View>
      )}
    </View>
  );

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('hyperdrive.title') }} />
        <PremiumPaywall feature="hyperdrive" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('hyperdrive.title') }} />
      <FlatList
        data={configs}
        keyExtractor={(item) => item.id}
        renderItem={renderConfig}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchConfigs(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="database" title={error ? t('common.error') : t('hyperdrive.no_configs')} message={error ?? t('hyperdrive.no_configs_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
  // Lines up with the row text: row padding + icon circle + gap.
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    paddingLeft: Spacing.lg + 36 + Spacing.md,
    paddingRight: Spacing.lg,
    paddingBottom: 13,
    marginTop: -5,
  },
});
