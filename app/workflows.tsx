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
import { Workflow } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function WorkflowsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('workflows');

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkflows = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getWorkflows(accountId);
      setWorkflows(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchWorkflows(); }, [fetchWorkflows]);

  const handleDelete = (wf: Workflow) => {
    if (!accountId) return;
    Alert.alert(t('wf.delete_title'), t('wf.delete_confirm', { name: wf.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteWorkflow(accountId, wf.name); setWorkflows((p) => p.filter((w) => w.name !== wf.name)); }
        catch { Alert.alert(t('common.error'), t('wf.delete_error')); }
      }},
    ]);
  };

  const renderWorkflow = ({ item }: { item: Workflow }) => {
    const inst = item.instances;
    const total = (inst?.complete ?? 0) + (inst?.running ?? 0) + (inst?.errored ?? 0) + (inst?.queued ?? 0) + (inst?.waiting ?? 0);
    const hasBadges = !!inst?.running || !!inst?.errored || !!inst?.queued || total > 0;
    return (
      <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <ListRow
          icon="route"
          title={item.name}
          subtitle={`${item.class_name} · ${item.script_name}`}
          mono
          trailing={
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={t('common.delete')}
            >
              <Icon name="trash" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          }
        />
        {hasBadges && (
          <View style={styles.badges}>
            {inst?.running ? <Badge label={`${inst.running} ${t('wf.running')}`} variant="success" /> : null}
            {inst?.errored ? <Badge label={`${inst.errored} ${t('wf.errored')}`} variant="error" /> : null}
            {inst?.queued ? <Badge label={`${inst.queued} ${t('wf.queued')}`} variant="default" /> : null}
            {total > 0 && <Badge label={`${total} ${t('wf.instances')}`} variant="default" />}
          </View>
        )}
      </View>
    );
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('wf.title') }} />
        <PremiumPaywall feature="workflows" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('wf.title') }} />
      <FlatList
        data={workflows}
        keyExtractor={(item) => item.name}
        renderItem={renderWorkflow}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchWorkflows(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="route" title={error ? t('common.error') : t('wf.no_workflows')} message={error ?? t('wf.no_workflows_message')} />}
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
