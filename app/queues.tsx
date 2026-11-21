import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { IconCircle } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Queue } from '@/services/cloudflare';

export default function QueuesScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQueues = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getQueues(accountId);
      setQueues(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchQueues(); }, [fetchQueues]);

  const handleDelete = (queue: Queue) => {
    if (!accountId) return;
    Alert.alert(t('queues.delete_title'), t('queues.delete_confirm', { name: queue.queue_name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteQueue(accountId, queue.queue_id); setQueues((p) => p.filter((q) => q.queue_id !== queue.queue_id)); }
        catch { Alert.alert(t('common.error'), t('queues.delete_error')); }
      }},
    ]);
  };

  const renderQueue = ({ item }: { item: Queue }) => {
    const isPaused = item.settings?.delivery_paused;
    const delay = item.settings?.delivery_delay;
    return (
      <View style={[styles.queue, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <IconCircle name="layers" tone={isPaused ? 'warning' : 'neutral'} />
        <View style={styles.queueBody}>
          <Text style={[styles.queueName, { color: colors.text }]} numberOfLines={1}>{item.queue_name}</Text>
          <Text style={[styles.queueMeta, { color: colors.textSecondary }]} numberOfLines={1}>
            {item.producers_total_count ?? 0} {t('queues.producers')} · {item.consumers_total_count ?? 0} {t('queues.consumers')}
          </Text>
          {(isPaused || !!delay) && (
            <View style={styles.badgeRow}>
              {isPaused && <Badge label={t('queues.paused')} variant="warning" />}
              {delay ? <Badge label={`${delay}s delay`} variant="default" /> : null}
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(item)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={t('common.delete')}
        >
          <Icon name="trash" size={16} color={colors.textTertiary} />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('queues.title') }} />
        <View style={{ flex: 1, backgroundColor: colors.background, padding: Spacing.lg }} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('queues.title') }} />
      <FlatList
        data={queues}
        keyExtractor={(item) => item.queue_id}
        renderItem={renderQueue}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchQueues(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="layers" title={error ? t('common.error') : t('queues.no_queues')} message={error ?? t('queues.no_queues_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  queue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  queueBody: { flex: 1, gap: 2 },
  queueName: { fontSize: FontSize.md, fontWeight: '500' },
  queueMeta: { fontSize: FontSize.sm },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginTop: 4 },
});
