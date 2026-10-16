import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AIModel } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function WorkersAIScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('workers-ai');

  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.searchAIModels(accountId);
      setModels(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchModels(); }, [fetchModels]);

  const renderModel = ({ item }: { item: AIModel }) => (
    <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <ListRow
        icon="zap"
        title={item.name ?? item.id}
        subtitle={item.description ?? item.task?.name ?? ''}
      />
      {!!item.task?.name && (
        <View style={styles.badges}>
          <Badge label={item.task.name} variant="default" />
        </View>
      )}
    </View>
  );

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('ai_models.title') }} />
        <PremiumPaywall feature="workers-ai" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('ai_models.title') }} />
      <FlatList
        data={models}
        keyExtractor={(item) => item.id}
        renderItem={renderModel}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchModels(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="zap" title={error ? t('common.error') : t('ai_models.no_models')} message={error ?? t('ai_models.no_models_message')} />}
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
