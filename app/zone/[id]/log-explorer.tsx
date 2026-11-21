import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { HeaderButton } from '@/components/ui/header-button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { LogExplorerDataset, LogExplorerAvailableDataset } from '@/services/cloudflare';

export default function LogExplorerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [datasets, setDatasets] = useState<LogExplorerDataset[]>([]);
  const [available, setAvailable] = useState<LogExplorerAvailableDataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const [showQuery, setShowQuery] = useState(false);
  const [query, setQuery] = useState('');
  const [querying, setQuerying] = useState(false);
  const [results, setResults] = useState<Record<string, unknown>[] | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getLogExplorerDatasets(id);
      setDatasets(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    }
    try {
      const aRes = await api.getAvailableLogExplorerDatasets(id);
      setAvailable((aRes.result ?? []).filter((d) => d.object_type === 'zone'));
    } catch {
      // optional
    }
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleDataset = async (ds: LogExplorerDataset, enabled: boolean) => {
    const prev = datasets;
    setDatasets((list) => list.map((d) => (d.dataset_id === ds.dataset_id ? { ...d, enabled } : d)));
    try {
      await api.updateLogExplorerDataset(id, ds.dataset_id, enabled);
    } catch (e: any) {
      setDatasets(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const addDataset = async (datasetName: string) => {
    setSaving(true);
    try {
      const res = await api.createLogExplorerDataset(id, datasetName);
      if (res.result) setDatasets((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const runQuery = async () => {
    const q = query.trim();
    if (!q) return;
    setQuerying(true);
    setResults(null);
    try {
      const res = await api.runLogExplorerQuery(id, q);
      setResults(res.result ?? []);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setQuerying(false);
    }
  };

  const enabledDatasetNames = new Set(datasets.map((d) => d.dataset));
  const addable = available.filter((a) => !enabledDatasetNames.has(a.dataset));

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('log_explorer.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <View style={styles.content}>
            <SkeletonHeading />
            <SkeletonRows count={3} avatar={false} />
            <SkeletonHeading />
            <SkeletonRows count={3} avatar={false} />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: t('log_explorer.title'),
          headerRight: addable.length > 0
            ? () => <HeaderButton icon="plus" label={t('log_explorer.add_dataset')} onPress={() => setShowAdd(true)} />
            : undefined,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('log_explorer.datasets')} />
          {datasets.length === 0 ? (
            !error ? (
              <EmptyState icon="database" title={t('log_explorer.no_datasets')} message={t('log_explorer.no_datasets_message')} />
            ) : null
          ) : (
            <Group>
              {datasets.map((d) => (
                <ToggleRow
                  key={d.dataset_id}
                  icon="database"
                  title={d.dataset}
                  subtitle={new Date(d.created_at).toLocaleDateString()}
                  value={d.enabled}
                  onValueChange={(v) => toggleDataset(d, v)}
                />
              ))}
            </Group>
          )}

          <SectionHeader title={t('log_explorer.query')} />
          {results === null ? (
            <EmptyState icon="search" title={t('log_explorer.no_query')} message={t('log_explorer.no_query_message')} />
          ) : results.length === 0 ? (
            <EmptyState icon="info" title={t('log_explorer.no_results')} message={t('log_explorer.no_results_message')} />
          ) : (
            results.map((row, i) => (
              <Card
                key={i}
                compact
                style={styles.resultCard}
                onPress={() => setExpandedRow(expandedRow === i ? null : i)}
              >
                <Text style={[styles.resultText, { color: colors.text }]} numberOfLines={expandedRow === i ? undefined : 2}>
                  {JSON.stringify(row, null, expandedRow === i ? 2 : 0)}
                </Text>
              </Card>
            ))
          )}
        </ScrollView>

        <Fab
          icon="search"
          label={t('log_explorer.run_query')}
          onPress={() => { setResults(null); setShowQuery(true); }}
        />
      </View>

      {/* Add dataset */}
      <Sheet visible={showAdd} onClose={() => setShowAdd(false)} title={t('log_explorer.add_dataset')}>
        {addable.length > 0 && (
          <Group>
            {addable.map((a) => (
              <ListRow
                key={a.dataset}
                icon="database"
                title={a.dataset}
                onPress={saving ? undefined : () => addDataset(a.dataset)}
                trailing={<Icon name="plus" size={16} color={colors.textTertiary} />}
              />
            ))}
          </Group>
        )}
      </Sheet>

      {/* Query */}
      <Sheet
        visible={showQuery}
        onClose={() => setShowQuery(false)}
        title={t('log_explorer.run_query')}
        footer={
          <Button
            title={t('log_explorer.run')}
            onPress={async () => { await runQuery(); setShowQuery(false); }}
            loading={querying}
            disabled={!query.trim()}
          />
        }
      >
        <Field
          label={t('log_explorer.query_label')}
          placeholder="SELECT * FROM http_requests LIMIT 20"
          value={query}
          onChangeText={setQuery}
          multiline
          mono
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  resultCard: { marginBottom: Spacing.sm },
  resultText: { fontSize: FontSize.xs + 1, lineHeight: 17, fontFamily: 'monospace' },
});
