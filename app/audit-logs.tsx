import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AuditLogEntry } from '@/services/cloudflare';

export default function AuditLogsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async (p = 1) => {
    if (!accountId) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.getAuditLogs(accountId, p);
      const list = res.result ?? [];
      setLogs((prev) => (p === 1 ? list : [...prev, ...list]));
      setHasMore(list.length === 50);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchLogs(1); }, [fetchLogs]);

  const loadMore = () => {
    if (!hasMore || loading) return;
    const next = page + 1;
    setPage(next);
    fetchLogs(next);
  };

  const formatWhen = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const renderLog = ({ item }: { item: AuditLogEntry }) => (
    <Card style={styles.logCard}>
      <View style={[styles.logIcon, { backgroundColor: (item.action?.result ? colors.success : colors.error) + '15' }]}>
        <Icon
          name={item.action?.result ? 'check-circle' : 'error-circle'}
          size={18}
          color={item.action?.result ? colors.success : colors.error}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.logAction, { color: colors.text }]} numberOfLines={1}>
          {item.action?.type ?? 'unknown'}
        </Text>
        <Text style={[styles.logMeta, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.resource?.type ?? '-'}
        </Text>
        <View style={styles.logFooter}>
          <Text style={[styles.logActor, { color: colors.textTertiary }]} numberOfLines={1}>
            {item.actor?.email || item.actor?.type || '-'}
          </Text>
          <Text style={[styles.logWhen, { color: colors.textTertiary }]}>{formatWhen(item.when)}</Text>
        </View>
      </View>
    </Card>
  );

  if (loading && logs.length === 0) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('audit.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={logs}
          keyExtractor={(item, i) => item.id + i}
          renderItem={renderLog}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { setRefreshing(true); setPage(1); fetchLogs(1); }}
              tintColor={colors.primary}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <EmptyState
              icon="activity"
              title={error ? t('common.error') : t('audit.no_logs')}
              message={error ?? t('audit.no_logs_message')}
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
  logCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  logIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logAction: { fontSize: FontSize.sm, fontWeight: '700' },
  logMeta: { fontSize: FontSize.xs, marginTop: 1 },
  logFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginTop: 4,
  },
  logActor: { fontSize: 10, flex: 1 },
  logWhen: { fontSize: 10 },
});
