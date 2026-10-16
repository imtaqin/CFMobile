import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AISearchInstance } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function AutoRAGScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('autorag');

  const [instances, setInstances] = useState<AISearchInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstances = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getAISearchInstances(accountId);
      setInstances(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchInstances(); }, [fetchInstances]);

  const renderInstance = ({ item }: { item: AISearchInstance }) => (
    <Group style={styles.item}>
      <ListRow
        icon="search"
        title={item.id}
        subtitle={item.source ?? item.type ?? '—'}
        onPress={() => router.push({ pathname: '/autorag/[id]' as any, params: { id: item.id } })}
        chevron
        trailing={
          <Badge
            label={item.paused ? t('autorag.paused') : item.status}
            variant={item.paused ? 'default' : (item.status === 'error' ? 'error' : 'success')}
          />
        }
      />
    </Group>
  );

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('autorag.title') }} />
        <PremiumPaywall feature="autorag" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('autorag.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={instances}
          keyExtractor={(item) => item.id}
          renderItem={renderInstance}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchInstances(); }} tintColor={colors.primary} />}
          ListEmptyComponent={<EmptyState icon="search" title={error ? t('common.error') : t('autorag.no_instances')} message={error ?? t('autorag.no_instances_message')} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { marginBottom: Spacing.sm },
});
