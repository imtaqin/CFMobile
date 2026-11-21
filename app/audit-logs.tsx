import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { HeaderButton } from '@/components/ui/header-button';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Chip, ChipRow, Field, ListRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
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
  const [scope, setScope] = useState<'account' | 'user'>('account');
  const [showFilters, setShowFilters] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actorEmail, setActorEmail] = useState('');
  const [actorIp, setActorIp] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<{ actionType?: string; actorEmail?: string; actorIp?: string }>({});

  const fetchLogs = useCallback(async (p = 1) => {
    if (scope === 'account' && !accountId) {
      setLoading(false);
      return;
    }
    try {
      const filters = Object.keys(appliedFilters).length > 0 ? appliedFilters : undefined;
      const res = scope === 'account'
        ? await api.getAuditLogs(accountId!, p, filters)
        : await api.getUserAuditLogs(p);
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
  }, [accountId, scope, appliedFilters]);

  useEffect(() => { setLogs([]); setPage(1); setLoading(true); fetchLogs(1); }, [fetchLogs]);

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

  const clearFilters = () => {
    setActionType('');
    setActorEmail('');
    setActorIp('');
    setAppliedFilters({});
    setShowFilters(false);
  };

  const applyFilters = () => {
    const f: Record<string, string> = {};
    if (actionType.trim()) f.actionType = actionType.trim();
    if (actorEmail.trim()) f.actorEmail = actorEmail.trim();
    if (actorIp.trim()) f.actorIp = actorIp.trim();
    setAppliedFilters(f);
    setShowFilters(false);
  };

  const renderLog = ({ item }: { item: AuditLogEntry }) => (
    <View style={[styles.logCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <ListRow
        icon={item.action?.result ? 'check-circle' : 'error-circle'}
        iconTone={item.action?.result ? 'success' : 'error'}
        title={item.action?.type ?? 'unknown'}
        subtitle={item.resource?.type ?? '-'}
        meta={`${formatWhen(item.when)} · ${item.actor?.email || item.actor?.type || '-'}`}
      />
    </View>
  );

  if (loading && logs.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: t('audit.title') }} />
        <View style={{ flex: 1, backgroundColor: colors.background, padding: Spacing.lg }} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  const activeFilters = Object.values(appliedFilters).filter(Boolean) as string[];

  return (
    <>
      <Stack.Screen
        options={{
          title: t('audit.title'),
          headerRight: () => (
            <HeaderButton icon="search" label={t('audit.filter_apply')} onPress={() => setShowFilters(!showFilters)} />
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Whose activity */}
        <ChipRow
          style={styles.scope}
          options={[
            { value: 'account', label: t('audit.scope_account') },
            { value: 'user', label: t('audit.scope_user') },
          ]}
          value={scope}
          onChange={setScope}
        />

        {/* Filters in force; tap one to change them */}
        {activeFilters.length > 0 && (
          <View style={styles.active}>
            {activeFilters.map((f) => (
              <Chip key={f} label={f} active onPress={() => setShowFilters(true)} />
            ))}
          </View>
        )}

        <FlatList
          data={logs}
          keyExtractor={(item, i) => item.id + i}
          renderItem={renderLog}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
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

      {/* Filters */}
      <Sheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        title={t('audit.title')}
        footer={
          <View style={styles.footer}>
            <Button title={t('audit.filter_clear')} variant="secondary" onPress={clearFilters} style={styles.footerBtn} />
            <Button title={t('audit.filter_apply')} onPress={applyFilters} style={styles.footerBtn} />
          </View>
        }
      >
        <Field
          placeholder={t('audit.filter_action')}
          value={actionType}
          onChangeText={setActionType}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Field
          placeholder={t('audit.filter_actor_email')}
          value={actorEmail}
          onChangeText={setActorEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Field
          placeholder={t('audit.filter_actor_ip')}
          value={actorIp}
          onChangeText={setActorIp}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scope: { paddingHorizontal: Spacing.lg, marginTop: Spacing.md },
  active: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
  },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  logCard: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm },
  footer: { flexDirection: 'row', gap: Spacing.sm },
  footerBtn: { flex: 1 },
});
