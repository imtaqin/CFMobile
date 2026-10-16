import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DurableObjectNamespace } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function DurableObjectsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('durable-objects');

  const [namespaces, setNamespaces] = useState<DurableObjectNamespace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNamespaces = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getDurableObjectNamespaces(accountId);
      setNamespaces(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchNamespaces(); }, [fetchNamespaces]);

  const renderNamespace = ({ item }: { item: DurableObjectNamespace }) => (
    <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <ListRow
        icon="widgets"
        title={item.name}
        subtitle={`${item.script} · ${item.class}`}
        mono
        onPress={() => router.push({ pathname: '/durable-objects/[namespace]' as any, params: { namespace: item.id, name: item.name } })}
        trailing={item.use_sqlite ? <View><Badge label="SQLite" variant="default" /></View> : undefined}
        chevron
      />
    </View>
  );

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('durable_objects.title') }} />
        <PremiumPaywall feature="durable-objects" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('durable_objects.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={namespaces}
          keyExtractor={(item) => item.id}
          renderItem={renderNamespace}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchNamespaces(); }} tintColor={colors.primary} />
          }
          ListEmptyComponent={
            <EmptyState
              icon="widgets"
              title={error ? t('common.error') : t('durable_objects.no_namespaces')}
              message={error ?? t('durable_objects.no_namespaces_message')}
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
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
});
