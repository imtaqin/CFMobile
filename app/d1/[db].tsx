import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Banner, ChipRow, Field, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { track } from '@/services/analytics';
import { D1TableInfo, D1QueryResult } from '@/services/cloudflare';

const PAGE_SIZE = 25;

type Mode = 'tables' | 'rows' | 'sql';

export default function D1BrowserScreen() {
  const { db, name } = useLocalSearchParams<{ db: string; name?: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [mode, setMode] = useState<Mode>('tables');
  const [tables, setTables] = useState<D1TableInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // rows view
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [offset, setOffset] = useState(0);
  const [rowsLoading, setRowsLoading] = useState(false);

  // sql console
  const [sql, setSql] = useState('SELECT * FROM sqlite_master;');
  const [sqlResult, setSqlResult] = useState<D1QueryResult | null>(null);
  const [sqlError, setSqlError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const errMsg = (e: any) =>
    e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Query failed';

  const loadTables = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      setTables(await api.getD1Tables(accountId, db));
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, db]);

  useEffect(() => { track('d1_opened', { once: true }); }, []);

  useEffect(() => { track('d1_opened', { once: true }); }, []);

  useEffect(() => { loadTables(); }, [loadTables]);

  const openTable = async (table: string, newOffset = 0) => {
    if (!accountId) return;
    setActiveTable(table);
    setMode('rows');
    setRowsLoading(true);
    try {
      const res = await api.getD1TableRows(accountId, db, table, PAGE_SIZE, newOffset);
      setRows(res.results ?? []);
      setOffset(newOffset);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
      setRows([]);
    } finally {
      setRowsLoading(false);
    }
  };

  const runSql = async () => {
    if (!accountId || !sql.trim()) return;
    setRunning(true);
    setSqlError(null);
    setSqlResult(null);
    try {
      const res = await api.queryD1(accountId, db, sql.trim());
      setSqlResult(res);
    } catch (e: any) {
      setSqlError(errMsg(e));
    } finally {
      setRunning(false);
    }
  };

  const confirmWrite = () => {
    const isWrite = /^\s*(insert|update|delete|drop|alter|create|replace)/i.test(sql);
    if (!isWrite) { runSql(); return; }
    Alert.alert(t('d1.write_title'), t('d1.write_body'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('d1.run_anyway'), style: 'destructive', onPress: runSql },
    ]);
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: name || t('d1.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  const cell = (v: unknown) => {
    if (v === null || v === undefined) return 'NULL';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  };

  const columns = rows.length ? Object.keys(rows[0]) : [];
  const sqlColumns = sqlResult?.results?.length ? Object.keys(sqlResult.results[0]) : [];

  // One card per row: column name above its monospace value.
  const renderRowCard = (row: Record<string, unknown>, cols: string[], key: number) => (
    <Card key={key} compact style={styles.rowCard}>
      {cols.map((col) => (
        <View key={col} style={styles.field}>
          <Text style={[styles.fieldKey, { color: colors.textTertiary }]}>{col}</Text>
          <Text style={[styles.fieldValue, { color: colors.text }]} selectable>{cell(row[col])}</Text>
        </View>
      ))}
    </Card>
  );

  return (
    <>
      <Stack.Screen options={{ title: name || t('d1.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Mode */}
        <ChipRow<'tables' | 'sql'>
          wrap
          style={styles.modes}
          options={[
            { value: 'tables', label: t('d1.tables') },
            { value: 'sql', label: t('d1.sql') },
          ]}
          value={mode === 'sql' ? 'sql' : 'tables'}
          onChange={(m) => { setMode(m); if (m === 'tables') setActiveTable(null); }}
        />

        {error && (
          <View style={styles.error}>
            <Banner message={error} />
          </View>
        )}

        {/* TABLES */}
        {mode === 'tables' && (
          <FlatList
            data={tables}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadTables(); }} tintColor={colors.primary} />
            }
            renderItem={({ item }) => (
              <Group style={styles.item}>
                <ListRow
                  icon="database"
                  title={item.name}
                  subtitle={item.rowCount === null ? t('d1.unknown_rows') : t('d1.row_count', { count: item.rowCount })}
                  onPress={() => openTable(item.name)}
                />
              </Group>
            )}
            ListEmptyComponent={<EmptyState icon="database" title={t('d1.no_tables')} message={t('d1.no_tables_message')} />}
          />
        )}

        {/* ROWS */}
        {mode === 'rows' && (
          <View style={styles.container}>
            <View style={styles.rowsHeader}>
              <TouchableOpacity
                onPress={() => { setMode('tables'); setActiveTable(null); }}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={t('d1.tables')}
              >
                <Icon name="arrow-left" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text style={[styles.rowsTitle, { color: colors.text }]} numberOfLines={1}>{activeTable}</Text>
              <Text style={[styles.rowsRange, { color: colors.textTertiary }]}>
                {offset + 1}–{offset + rows.length}
              </Text>
            </View>

            {rowsLoading ? (
              <ActivityIndicator style={styles.spinner} color={colors.primary} />
            ) : rows.length === 0 ? (
              <EmptyState icon="database" title={t('d1.empty_table')} message={t('d1.empty_table_message')} />
            ) : (
              <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                {rows.map((row, i) => renderRowCard(row, columns, i))}
                <View style={styles.pager}>
                  <Button
                    title={t('d1.prev')}
                    variant="secondary"
                    disabled={offset === 0}
                    onPress={() => { if (activeTable) openTable(activeTable, Math.max(0, offset - PAGE_SIZE)); }}
                    style={styles.pageBtn}
                  />
                  <Button
                    title={t('d1.next')}
                    variant="secondary"
                    disabled={rows.length < PAGE_SIZE}
                    onPress={() => { if (activeTable) openTable(activeTable, offset + PAGE_SIZE); }}
                    style={styles.pageBtn}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        )}

        {/* SQL CONSOLE */}
        {mode === 'sql' && (
          <ScrollView
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.editor}>
              <Field
                value={sql}
                onChangeText={setSql}
                multiline
                mono
                placeholder="SELECT * FROM users LIMIT 10;"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.sqlInput}
              />
            </View>

            <Button
              title={t('d1.run')}
              onPress={confirmWrite}
              loading={running}
              icon={<Icon name="zap" size={16} color="#FFF" />}
              style={styles.runBtn}
            />

            {sqlError && (
              <View style={styles.sqlError}>
                <Banner message={sqlError} />
              </View>
            )}

            {sqlResult && (
              <>
                <View style={styles.metaBar}>
                  <Icon name="check-circle" size={15} color={colors.success} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                    {t('d1.result_meta', {
                      rows: sqlResult.results?.length ?? 0,
                      ms: sqlResult.meta?.duration?.toFixed?.(1) ?? '0',
                    })}
                    {sqlResult.meta?.changes ? ` · ${t('d1.changes', { n: sqlResult.meta.changes })}` : ''}
                  </Text>
                </View>

                {(sqlResult.results ?? []).map((row, i) => renderRowCard(row, sqlColumns, i))}
              </>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modes: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  error: { marginHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  list: { padding: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.xxxl },
  item: { marginBottom: Spacing.sm },
  rowsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  rowsTitle: { flex: 1, fontSize: FontSize.md, fontWeight: '500', fontFamily: 'monospace' },
  rowsRange: { fontSize: FontSize.xs },
  spinner: { marginTop: Spacing.xxl },
  rowCard: { gap: Spacing.sm, marginBottom: Spacing.sm },
  field: { gap: 2 },
  fieldKey: { fontSize: FontSize.xs },
  fieldValue: { fontSize: FontSize.sm, fontFamily: 'monospace', lineHeight: 18 },
  pager: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  pageBtn: { flex: 1 },
  // Field brings its own top margin; the list already has top padding.
  editor: { marginTop: -Spacing.md },
  sqlInput: { minHeight: 110, fontSize: FontSize.sm },
  runBtn: { marginTop: Spacing.md },
  sqlError: { marginTop: Spacing.md },
  metaBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    marginVertical: Spacing.md,
  },
  metaText: { fontSize: FontSize.xs, flex: 1 },
});
