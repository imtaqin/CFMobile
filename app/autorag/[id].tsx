import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { SkeletonRows, SkeletonStats, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Banner, Field, Group, IconCircle, StatCard, ToggleRow, ValueRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AISearchInstance, AISearchInstanceStats, AISearchChunk } from '@/services/cloudflare';

export default function AutoRAGInstanceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [instance, setInstance] = useState<AISearchInstance | null>(null);
  const [stats, setStats] = useState<AISearchInstanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toggling, setToggling] = useState(false);

  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [chunks, setChunks] = useState<AISearchChunk[] | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const [instRes, statsRes] = await Promise.allSettled([
        api.getAISearchInstance(accountId, id),
        api.getAISearchInstanceStats(accountId, id),
      ]);
      if (instRes.status === 'fulfilled') setInstance(instRes.value.result ?? null);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value.result ?? null);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const togglePaused = async (value: boolean) => {
    if (!accountId || !instance) return;
    setToggling(true);
    const prev = instance.paused;
    setInstance({ ...instance, paused: value });
    try {
      await api.setAISearchInstancePaused(accountId, id, value);
    } catch (e: any) {
      setInstance({ ...instance, paused: prev });
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setToggling(false);
    }
  };

  const runSearch = async () => {
    if (!accountId || !query.trim()) return;
    setSearching(true);
    try {
      const res = await api.searchAISearchInstance(accountId, id, query.trim());
      setChunks(res.result?.chunks ?? []);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSearching(false);
    }
  };

  const handleDelete = () => {
    if (!accountId) return;
    Alert.alert(t('autorag.delete_title'), t('autorag.delete_confirm', { name: id }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteAISearchInstance(accountId, id);
            router.back();
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: id }} />
        <ScrollView
          scrollEnabled={false}
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          accessibilityLabel={t('common.loading')}
        >
          <View style={styles.block}><SkeletonRows count={1} avatar={false} /></View>
          <View style={styles.block}><SkeletonStats count={2} /></View>
          <SkeletonHeading />
          <SkeletonRows count={3} avatar={false} />
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: id }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
      >
        {error && <View style={styles.block}><Banner message={error} /></View>}

        {instance && (
          <Group style={styles.block}>
            <ValueRow label={t('autorag.status')} value={instance.status} />
            <ToggleRow
              title={t('autorag.paused')}
              value={instance.paused}
              onValueChange={togglePaused}
              disabled={toggling}
            />
          </Group>
        )}

        {stats && (
          <View style={styles.statGrid}>
            <View style={styles.statRow}>
              <StatCard label={t('autorag.completed')} value={String(stats.completed ?? 0)} />
              <StatCard label={t('autorag.running')} value={String(stats.running ?? 0)} />
            </View>
            <View style={styles.statRow}>
              <StatCard label={t('autorag.queued')} value={String(stats.queued ?? 0)} />
              <StatCard label={t('autorag.errors')} value={String(stats.error ?? 0)} />
            </View>
          </View>
        )}

        <SectionHeader title={t('autorag.try_search')} />
        <View style={styles.searchForm}>
          <Field
            placeholder={t('autorag.search_placeholder')}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <Button
          title={t('autorag.search')}
          onPress={runSearch}
          loading={searching}
          disabled={!query.trim()}
          style={styles.searchButton}
        />

        {chunks && (
          chunks.length === 0 ? (
            <EmptyState icon="search" title={t('autorag.no_results')} />
          ) : (
            <View style={styles.chunks}>
              {chunks.map((c) => (
                <Card key={c.id} compact style={styles.chunkCard}>
                  <View style={styles.chunkHeader}>
                    <Text style={[styles.chunkKey, { color: colors.textSecondary }]} numberOfLines={1}>{c.item?.key ?? c.id}</Text>
                    <Text style={[styles.chunkScore, { color: colors.textTertiary }]}>{c.score.toFixed(2)}</Text>
                  </View>
                  <Text style={[styles.chunkText, { color: colors.text }]} numberOfLines={4}>{c.text}</Text>
                </Card>
              ))}
            </View>
          )
        )}

        <SectionHeader title={t('autorag.danger_zone')} />
        <Group>
          <TouchableOpacity onPress={handleDelete} activeOpacity={0.7} style={styles.dangerRow} accessibilityRole="button">
            <IconCircle name="trash" tone="error" />
            <Text style={[styles.dangerLabel, { color: colors.error }]}>{t('autorag.delete_instance')}</Text>
          </TouchableOpacity>
        </Group>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  block: { marginBottom: Spacing.md },
  statGrid: { gap: Spacing.sm },
  statRow: { flexDirection: 'row', gap: Spacing.sm },
  // Field brings its own top margin; pull it up so it sits right under the section title.
  searchForm: { marginTop: -Spacing.md },
  searchButton: { marginTop: Spacing.md },
  chunks: { marginTop: Spacing.lg, gap: Spacing.sm },
  chunkCard: { gap: Spacing.xs },
  chunkHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.md },
  chunkKey: { fontSize: FontSize.xs, fontFamily: 'monospace', flex: 1 },
  chunkScore: { fontSize: FontSize.xs, fontFamily: 'monospace' },
  chunkText: { fontSize: FontSize.sm, lineHeight: 18 },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
  },
  dangerLabel: { flex: 1, fontSize: FontSize.md, fontWeight: '500' },
});
