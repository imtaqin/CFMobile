import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Pipeline } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function PipelinesScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('pipelines');
  const [items, setItems] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try { const r = await api.getPipelines(accountId); setItems(r.result ?? []); } catch {}
    finally { setLoading(false); setRefreshing(false); }
  }, [accountId, premium]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = (p: Pipeline) => {
    if (!accountId) return;
    Alert.alert(t('pipelines.delete_title'), t('pipelines.delete_confirm', { name: p.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deletePipeline(accountId, p.id); setItems((x) => x.filter((i) => i.id !== p.id)); }
        catch { Alert.alert(t('common.error'), t('pipelines.delete_error')); }
      }},
    ]);
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('pipelines.title') }} />
        <PremiumPaywall feature="pipelines" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('pipelines.title') }} />
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <ListRow
              icon="route"
              title={item.name}
              subtitle={item.endpoint}
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
          </View>
        )}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetch(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="route" title={t('pipelines.no_items')} message={t('pipelines.no_items_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
});
