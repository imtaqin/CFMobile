import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/contexts/auth';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { HeaderButton } from '@/components/ui/header-button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AccountLogExplorerDataset, AccountLogExplorerAvailableDataset } from '@/services/cloudflare';

export default function LogExplorerAccountScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const insets = useSafeAreaInsets();

  const [datasets, setDatasets] = useState<AccountLogExplorerDataset[]>([]);
  const [available, setAvailable] = useState<AccountLogExplorerAvailableDataset[]>([]);
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
    if (!accountId) { setLoading(false); setRefreshing(false); return; }
    setError(null);
    const [dsRes, avRes] = await Promise.allSettled([
      api.getAccountLogExplorerDatasets(accountId),
      api.getAvailableAccountLogExplorerDatasets(accountId),
    ]);
    if (dsRes.status === 'fulfilled') {
      setDatasets(dsRes.value.result ?? []);
    } else {
      setError(errMsg(dsRes.reason));
    }
    if (avRes.status === 'fulfilled') {
      setAvailable((avRes.value.result ?? []).filter((d) => d.object_type === 'account'));
    }
    // available is optional — a 403 just hides the add picker
    setLoading(false);
    setRefreshing(false);
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleDataset = async (ds: AccountLogExplorerDataset, enabled: boolean) => {
    if (!accountId) return;
    const prev = datasets;
    setDatasets((list) => list.map((d) => (d.dataset_id === ds.dataset_id ? { ...d, enabled } : d)));
    try {
      await api.updateAccountLogExplorerDataset(accountId, ds.dataset_id, enabled);
    } catch (e: any) {
      setDatasets(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const addDataset = async (datasetName: string) => {
    if (!accountId) return;
    setSaving(true);
    try {
      const res = await api.createAccountLogExplorerDataset(accountId, datasetName);
      if (res.result) setDatasets((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const runQuery = async () => {
    if (!accountId) return;
    const q = query.trim();
    if (!q) return;
    setQuerying(true);
    setResults(null);
    try {
      const res = await api.runAccountLogExplorerQuery(accountId, q);
      setResults(res.result ?? []);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setQuerying(false);
    }
  };

  const enabledDatasetNames = new Set(datasets.map((d) => d.dataset));
  const addable = available.filter((a) => !enabledDatasetNames.has(a.dataset));

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen
        options={{
          title: t('logexp_acct.title'),
          headerRight: addable.length > 0
            ? () => <HeaderButton icon="plus" label={t('logexp_acct.add_dataset')} onPress={() => setShowAdd(true)} />
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

          <SectionHeader title={t('logexp_acct.datasets')} />
          {datasets.length === 0 ? (
            !error ? (
              <EmptyState icon="database" title={t('logexp_acct.no_datasets')} message={t('logexp_acct.no_datasets_message')} />
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

          <SectionHeader title={t('logexp_acct.query')} />
          {results === null ? (
            <EmptyState icon="search" title={t('logexp_acct.no_query')} message={t('logexp_acct.no_query_message')} />
          ) : results.length === 0 ? (
            <EmptyState icon="info" title={t('logexp_acct.no_results')} message={t('logexp_acct.no_results_message')} />
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
          label={t('logexp_acct.run_query')}
          onPress={() => { setResults(null); setShowQuery(true); }}
        />
      </View>

      {/* Add dataset */}
      <Sheet visible={showAdd} onClose={() => setShowAdd(false)} title={t('logexp_acct.add_dataset')}>
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
        title={t('logexp_acct.run_query')}
        footer={
          <Button
            title={t('logexp_acct.run')}
            onPress={async () => { await runQuery(); setShowQuery(false); }}
            loading={querying}
            disabled={!query.trim()}
          />
        }
      >
        <Field
          label={t('logexp_acct.query_label')}
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
