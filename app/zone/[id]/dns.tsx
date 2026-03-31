import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, ScrollView, RefreshControl, TouchableOpacity,
  Alert, TextInput,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
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

  const renderRecord = ({ item }: { item: DNSRecord }) => (
    <Card style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <View style={[styles.typeBadge, { backgroundColor: typeColor(item.type) + '20' }]}>
          <Text style={[styles.typeText, { color: typeColor(item.type) }]}>{item.type}</Text>
        </View>
        <Text style={[styles.recordName, { color: colors.text }]} numberOfLines={1}>
          {item.name.replace(`.${item.zone_name}`, '')}
        </Text>
        {item.proxied && (
          <Icon name="cloud" size={18} color={colors.primary} />
        )}
        {item.proxiable && !item.proxied && (
          <Icon name="cloud-off" size={18} color={colors.textTertiary} />
        )}
      </View>

      <Text style={[styles.recordContent, { color: colors.textSecondary }]} numberOfLines={2}>
        {item.content}
      </Text>

      <View style={styles.recordFooter}>
        <Text style={[styles.recordTtl, { color: colors.textTertiary }]}>
          TTL: {item.ttl === 1 ? 'Auto' : `${item.ttl}s`}
        </Text>
        {item.priority !== undefined && (
          <Text style={[styles.recordTtl, { color: colors.textTertiary }]}>
            Priority: {item.priority}
          </Text>
        )}
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => router.push({ pathname: `/zone/[id]/dns-edit` as any, params: { id, recordId: item.id } })}
          style={styles.actionBtn}
        >
          <Icon name="edit" size={18} color={colors.info} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.actionBtn}>
          <Icon name="trash" size={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('dns.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Search + Filter */}
        <View style={styles.toolbar}>
          <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
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
          </View>
        </View>

        {/* Type Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsRow}
          contentContainerStyle={styles.chips}
        >
          {[undefined, ...RECORD_TYPES].map((item) => (
            <TouchableOpacity
              key={item ?? 'all'}
              onPress={() => { setFilter(item); setLoading(true); }}
              style={[
                styles.chip,
                {
                  backgroundColor: filter === item ? colors.primary : colors.surface,
                  borderColor: filter === item ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={{
                fontSize: FontSize.xs,
                fontWeight: '600',
                color: filter === item ? '#FFF' : colors.textSecondary,
              }}>
                {item ?? t('dns.all')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Records List */}
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderRecord}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
          ListEmptyComponent={
            <EmptyState icon="dns" title={t('dns.no_records')} message={t('dns.no_records_message')} />
          }
        />

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => router.push({ pathname: `/zone/[id]/dns-edit` as any, params: { id } })}
          activeOpacity={0.8}
        >
          <Icon name="plus" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.sm,
    paddingVertical: Spacing.sm,
  },
  chipsRow: {
    flexGrow: 0,
    flexShrink: 0,
  },
  chips: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 80,
  },
  recordCard: { marginBottom: Spacing.sm },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: { fontSize: FontSize.xs, fontWeight: '700' },
  recordName: { flex: 1, fontSize: FontSize.md, fontWeight: '600' },
  recordContent: { fontSize: FontSize.sm, fontFamily: 'monospace', marginBottom: Spacing.sm },
  recordFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  recordTtl: { fontSize: FontSize.xs },
  actionBtn: { padding: 4 },
  fab: {
    position: 'absolute',
    bottom: Spacing.xxl,
    right: Spacing.xxl,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
