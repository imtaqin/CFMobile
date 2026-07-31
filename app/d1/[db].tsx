import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, TextInput,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import * as api from '@/services/cloudflare';
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

  if (loading) return <Loading />;

  const cell = (v: unknown) => {
    if (v === null || v === undefined) return 'NULL';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  };

  const columns = rows.length ? Object.keys(rows[0]) : [];
  const sqlColumns = sqlResult?.results?.length ? Object.keys(sqlResult.results[0]) : [];

  return (
    <>
      <Stack.Screen options={{ title: name || t('d1.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Mode tabs */}
        <View style={styles.tabs}>
          {(['tables', 'sql'] as Mode[]).map((m) => {
            const active = mode === m || (m === 'tables' && mode === 'rows');
            return (
              <TouchableOpacity
                key={m}
                onPress={() => { setMode(m); if (m === 'tables') setActiveTable(null); }}
                style={[styles.tab, {
                  backgroundColor: active ? colors.primary : colors.surface,
                  borderColor: active ? colors.primary : colors.borderLight,
                }]}
                activeOpacity={0.7}
              >
                <Icon name={m === 'tables' ? 'database' : 'code'} size={15} color={active ? '#FFF' : colors.textSecondary} />
                <Text style={{ fontSize: FontSize.sm, fontWeight: '700', color: active ? '#FFF' : colors.textSecondary }}>
                  {m === 'tables' ? t('d1.tables') : t('d1.sql')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {error && (
          <View style={[styles.errorBar, { backgroundColor: colors.error + '15' }]}>
            <Icon name="error-circle" size={15} color={colors.error} />
            <Text style={[styles.errorText, { color: colors.error }]} numberOfLines={2}>{error}</Text>
          </View>
        )}

        {/* TABLES */}
        {mode === 'tables' && (
          <FlatList
            data={tables}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadTables(); }} tintColor={colors.primary} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openTable(item.name)} activeOpacity={0.7}>
                <Card style={styles.tableCard}>
                  <View style={[styles.tableIcon, { backgroundColor: colors.info + '15' }]}>
                    <Icon name="database" size={18} color={colors.info} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.tableName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.tableMeta, { color: colors.textSecondary }]}>
                      {item.rowCount === null ? t('d1.unknown_rows') : t('d1.row_count', { count: item.rowCount })}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={16} color={colors.textTertiary} />
                </Card>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<EmptyState icon="database" title={t('d1.no_tables')} message={t('d1.no_tables_message')} />}
          />
        )}

        {/* ROWS */}
        {mode === 'rows' && (
          <View style={{ flex: 1 }}>
            <View style={styles.rowsHeader}>
              <TouchableOpacity onPress={() => { setMode('tables'); setActiveTable(null); }} hitSlop={8}>
                <Icon name="arrow-left" size={20} color={colors.primary} />
              </TouchableOpacity>
              <Text style={[styles.rowsTitle, { color: colors.text }]} numberOfLines={1}>{activeTable}</Text>
              <Text style={[styles.rowsRange, { color: colors.textTertiary }]}>
                {offset + 1}–{offset + rows.length}
              </Text>
            </View>

            {rowsLoading ? (
              <ActivityIndicator style={{ marginTop: Spacing.xxl }} color={colors.primary} />
            ) : rows.length === 0 ? (
              <EmptyState icon="database" title={t('d1.empty_table')} message={t('d1.empty_table_message')} />
            ) : (
              <ScrollView contentContainerStyle={styles.list}>
                {rows.map((row, i) => (
                  <Card key={i} style={styles.rowCard}>
                    {columns.map((col) => (
                      <View key={col} style={styles.field}>
                        <Text style={[styles.fieldKey, { color: colors.textTertiary }]}>{col}</Text>
                        <Text style={[styles.fieldValue, { color: colors.text }]} selectable>
                          {cell(row[col])}
                        </Text>
                      </View>
                    ))}
                  </Card>
                ))}
                <View style={styles.pager}>
                  <TouchableOpacity
                    style={[styles.pageBtn, { backgroundColor: colors.surface, opacity: offset === 0 ? 0.4 : 1 }]}
                    disabled={offset === 0}
                    onPress={() => activeTable && openTable(activeTable, Math.max(0, offset - PAGE_SIZE))}
                  >
                    <View style={{ transform: [{ rotate: '180deg' }] }}>
                      <Icon name="chevron-right" size={16} color={colors.text} />
                    </View>
                    <Text style={{ color: colors.text, fontWeight: '700', fontSize: FontSize.sm }}>{t('d1.prev')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.pageBtn, { backgroundColor: colors.surface, opacity: rows.length < PAGE_SIZE ? 0.4 : 1 }]}
                    disabled={rows.length < PAGE_SIZE}
                    onPress={() => activeTable && openTable(activeTable, offset + PAGE_SIZE)}
                  >
                    <Text style={{ color: colors.text, fontWeight: '700', fontSize: FontSize.sm }}>{t('d1.next')}</Text>
                    <Icon name="chevron-right" size={16} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        )}

        {/* SQL CONSOLE */}
        {mode === 'sql' && (
          <ScrollView contentContainerStyle={styles.list} keyboardShouldPersistTaps="handled">
            <View style={[styles.editor, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              <TextInput
                style={[styles.sqlInput, { color: colors.text }]}
                value={sql}
                onChangeText={setSql}
                multiline
                placeholder="SELECT * FROM users LIMIT 10;"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[styles.runBtn, { backgroundColor: CF.orange, opacity: running ? 0.6 : 1 }]}
              onPress={confirmWrite}
              disabled={running}
              activeOpacity={0.85}
            >
              {running ? <ActivityIndicator size="small" color="#FFF" /> : <Icon name="zap" size={17} color="#FFF" />}
              <Text style={styles.runBtnText}>{t('d1.run')}</Text>
            </TouchableOpacity>

            {sqlError && (
              <Card style={[styles.sqlError, { borderColor: colors.error }]}>
                <Icon name="error-circle" size={18} color={colors.error} />
                <Text style={[styles.errorText, { color: colors.error, flex: 1 }]} selectable>{sqlError}</Text>
              </Card>
            )}

            {sqlResult && (
              <>
                <View style={[styles.metaBar, { backgroundColor: colors.success + '12' }]}>
                  <Icon name="check-circle" size={15} color={colors.success} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                    {t('d1.result_meta', {
                      rows: sqlResult.results?.length ?? 0,
                      ms: sqlResult.meta?.duration?.toFixed?.(1) ?? '0',
                    })}
                    {sqlResult.meta?.changes ? ` · ${t('d1.changes', { n: sqlResult.meta.changes })}` : ''}
                  </Text>
                </View>

                {(sqlResult.results ?? []).map((row, i) => (
                  <Card key={i} style={styles.rowCard}>
                    {sqlColumns.map((col) => (
                      <View key={col} style={styles.field}>
                        <Text style={[styles.fieldKey, { color: colors.textTertiary }]}>{col}</Text>
                        <Text style={[styles.fieldValue, { color: colors.text }]} selectable>{cell(row[col])}</Text>
                      </View>
                    ))}
                  </Card>
                ))}
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
  tabs: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.lg, paddingBottom: Spacing.sm },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  errorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    padding: Spacing.sm,
    borderRadius: Radius.sm,
  },
  errorText: { fontSize: FontSize.xs, lineHeight: 16 },
  list: { padding: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.xxxl },
  tableCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.sm },
  tableIcon: {
    width: 36, height: 36, borderRadius: Radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  tableName: { fontSize: FontSize.sm, fontWeight: '700' },
  tableMeta: { fontSize: FontSize.xs, marginTop: 2 },
  rowsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  rowsTitle: { flex: 1, fontSize: FontSize.md, fontWeight: '800' },
  rowsRange: { fontSize: FontSize.xs },
  rowCard: { gap: Spacing.sm, marginBottom: Spacing.sm },
  field: { gap: 2 },
  fieldKey: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4 },
  fieldValue: { fontSize: FontSize.xs, fontFamily: 'monospace', lineHeight: 17 },
  pager: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  pageBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 44,
    borderRadius: Radius.md,
  },
  editor: { borderRadius: Radius.md, borderWidth: 1, padding: Spacing.sm },
  sqlInput: {
    minHeight: 110,
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
    textAlignVertical: 'top',
  },
  runBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: 48,
    borderRadius: Radius.md,
    marginTop: Spacing.md,
  },
  runBtnText: { color: '#FFF', fontSize: FontSize.md, fontWeight: '800' },
  sqlError: { flexDirection: 'row', gap: Spacing.sm, borderWidth: 1, marginTop: Spacing.md },
  metaBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: Radius.sm,
    marginVertical: Spacing.md,
  },
  metaText: { fontSize: FontSize.xs, flex: 1 },
});
