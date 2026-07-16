import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, ScrollView, RefreshControl, TouchableOpacity,
  Alert, TextInput,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DNSRecord, DNSRecordType } from '@/services/types';

const RECORD_TYPES: DNSRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV', 'CAA'];

export default function DNSScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [records, setRecords] = useState<DNSRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string | undefined>();
  const [search, setSearch] = useState('');

  const fetchRecords = useCallback(async () => {
    try {
      const res = await api.getDnsRecords(id, 1, filter, search || undefined);
      setRecords(res.result ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, filter, search]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const onRefresh = () => { setRefreshing(true); fetchRecords(); };

  const handleDelete = (record: DNSRecord) => {
    Alert.alert(
      t('dns.delete_title'),
      t('dns.delete_confirm', { name: record.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteDnsRecord(id, record.id);
              setRecords((prev) => prev.filter((r) => r.id !== record.id));
            } catch {
              Alert.alert(t('common.error'), t('dns.delete_error'));
            }
          },
        },
      ]
    );
  };

  const typeColor = (type: string): string => {
    const map: Record<string, string> = {
      A: '#3B82F6', AAAA: '#6366F1', CNAME: '#8B5CF6', MX: '#EC4899',
      TXT: '#F59E0B', NS: '#10B981', SRV: '#EF4444', CAA: '#14B8A6',
    };
    return map[type] ?? colors.textSecondary;
  };

  const stripZone = (name: string, zone: string) => {
    if (name === zone) return '@';
    if (name.endsWith(`.${zone}`)) return name.slice(0, -(zone.length + 1));
    return name;
  };

  const renderRecord = ({ item }: { item: DNSRecord }) => {
    const c = typeColor(item.type);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push({ pathname: `/zone/[id]/dns-edit` as any, params: { id, recordId: item.id } })}
      >
        <View style={[styles.recordCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          {/* Type badge — vertical accent bar */}
          <View style={[styles.typeAccent, { backgroundColor: c }]} />

          <View style={styles.recordBody}>
            <View style={styles.recordTopRow}>
              <View style={[styles.typePill, { backgroundColor: c + '18' }]}>
                <Text style={[styles.typePillText, { color: c }]}>{item.type}</Text>
              </View>
              <Text style={[styles.recordName, { color: colors.text }]} numberOfLines={1}>
                {stripZone(item.name, item.zone_name)}
              </Text>
              {item.proxied ? (
                <View style={[styles.proxyChip, { backgroundColor: '#F6821F18' }]}>
                  <Icon name="cloud" size={11} color="#F6821F" />
                  <Text style={[styles.proxyText, { color: '#F6821F' }]}>Proxied</Text>
                </View>
              ) : item.proxiable ? (
                <View style={[styles.proxyChip, { backgroundColor: colors.surfaceSecondary }]}>
                  <Icon name="cloud-off" size={11} color={colors.textTertiary} />
                  <Text style={[styles.proxyText, { color: colors.textTertiary }]}>DNS only</Text>
                </View>
              ) : null}
            </View>

            <Text style={[styles.recordContent, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.content}
            </Text>

            <View style={styles.recordMetaRow}>
              <View style={styles.metaItem}>
                <Icon name="clock" size={11} color={colors.textTertiary} />
                <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                  {item.ttl === 1 ? 'Auto' : `${item.ttl}s`}
                </Text>
              </View>
              {item.priority !== undefined && (
                <View style={styles.metaItem}>
                  <Icon name="zap" size={11} color={colors.textTertiary} />
                  <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                    Priority {item.priority}
                  </Text>
                </View>
              )}
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={(e) => { e.stopPropagation(); handleDelete(item); }}
                style={styles.iconBtn}
                hitSlop={8}
              >
                <Icon name="trash" size={16} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('dns.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Search bar */}
        <View style={styles.toolbar}>
          <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <Icon name="search" size={18} color={colors.textTertiary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder={t('dns.search')}
              placeholderTextColor={colors.textTertiary}
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={fetchRecords}
              autoCapitalize="none"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => { setSearch(''); fetchRecords(); }} hitSlop={8}>
                <Icon name="close" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Type filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {[undefined, ...RECORD_TYPES].map((rt) => {
            const active = filter === rt;
            const c = rt ? typeColor(rt) : colors.primary;
            return (
              <TouchableOpacity
                key={rt ?? 'all'}
                onPress={() => { setFilter(rt); setLoading(true); }}
                style={[
                  styles.chip,
                  {
                    backgroundColor: active ? c : colors.surface,
                    borderColor: active ? c : colors.borderLight,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text style={{
                  fontSize: FontSize.xs,
                  fontWeight: '700',
                  color: active ? '#FFF' : (rt ? c : colors.textSecondary),
                  letterSpacing: 0.3,
                }}>
                  {rt ?? t('dns.all')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Records count */}
        {records.length > 0 && (
          <View style={styles.countRow}>
            <Text style={[styles.countText, { color: colors.textSecondary }]}>
              {records.length} {records.length === 1 ? 'record' : 'records'}
              {filter ? ` of type ${filter}` : ''}
            </Text>
          </View>
        )}

        {/* Records list */}
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderRecord}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
          ListEmptyComponent={
            <View style={{ paddingTop: 40 }}>
              <EmptyState icon="dns" title={t('dns.no_records')} message={t('dns.no_records_message')} />
            </View>
          }
        />

        {/* Action bar */}
        <View style={[styles.actionBar, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <TouchableOpacity
            style={[styles.actionBarBtn, { backgroundColor: colors.primary + '15' }]}
            onPress={() => router.push({ pathname: `/zone/[id]/dns-templates` as any, params: { id } })}
            activeOpacity={0.7}
          >
            <Icon name="layers" size={18} color={colors.primary} />
            <Text style={[styles.actionBarText, { color: colors.primary }]}>{t('dns.templates')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBarPrimary, { backgroundColor: colors.primary }]}
            onPress={() => router.push({ pathname: `/zone/[id]/dns-edit` as any, params: { id } })}
            activeOpacity={0.85}
          >
            <Icon name="plus" size={18} color="#FFF" />
            <Text style={styles.actionBarPrimaryText}>{t('dns.add_record')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
  },
  chips: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  countRow: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  countText: {
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
    gap: Spacing.sm,
  },
  recordCard: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  typeAccent: {
    width: 4,
  },
  recordBody: {
    flex: 1,
    padding: Spacing.md,
    gap: 6,
  },
  recordTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  typePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    minWidth: 48,
    alignItems: 'center',
  },
  typePillText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  recordName: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  proxyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  proxyText: { fontSize: 10, fontWeight: '700' },
  recordContent: {
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
  },
  recordMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: { fontSize: 11, fontWeight: '500' },
  iconBtn: {
    padding: 4,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
    borderTopWidth: 1,
  },
  actionBarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: Spacing.lg,
    height: 48,
    borderRadius: Radius.md,
  },
  actionBarText: { fontSize: FontSize.sm, fontWeight: '700' },
  actionBarPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 48,
    borderRadius: Radius.md,
  },
  actionBarPrimaryText: {
    color: '#FFF',
    fontSize: FontSize.md,
    fontWeight: '700',
  },
});
