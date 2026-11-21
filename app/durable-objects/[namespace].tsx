import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { IconCircle } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DurableObjectItem } from '@/services/cloudflare';

export default function DurableObjectNamespaceScreen() {
  const { namespace, name } = useLocalSearchParams<{ namespace: string; name: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [objects, setObjects] = useState<DurableObjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchObjects = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getDurableObjects(accountId, namespace);
      setObjects(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, namespace]);

  useEffect(() => { fetchObjects(); }, [fetchObjects]);

  // The only text in a row is the object id, so it is laid out by hand in monospace.
  const renderObject = ({ item }: { item: DurableObjectItem }) => (
    <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <IconCircle name="widgets" size={32} />
      <Text style={[styles.id, { color: colors.text }]} numberOfLines={1}>{item.id}</Text>
      <View>
        <Badge
          label={item.hasStoredData ? t('durable_objects.has_data') : t('durable_objects.no_data')}
          variant={item.hasStoredData ? 'success' : 'default'}
        />
      </View>
    </View>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: name ?? t('durable_objects.objects_title') }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: name ?? t('durable_objects.objects_title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={objects}
          keyExtractor={(item) => item.id}
          renderItem={renderObject}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchObjects(); }} tintColor={colors.primary} />
          }
          ListEmptyComponent={
            <EmptyState
              icon="widgets"
              title={error ? t('common.error') : t('durable_objects.no_objects')}
              message={error ?? t('durable_objects.no_objects_message')}
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  id: { flex: 1, fontSize: FontSize.sm, fontFamily: 'monospace' },
});
