import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, RefreshControl, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Icon } from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

export default function ZonesScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchZones = useCallback(async (p = 1, s?: string) => {
    try {
      const res = await api.getZones(p, s || undefined);
      const list = res.result ?? [];
      if (p === 1) {
        setZones(list);
      } else {
        setZones((prev) => [...prev, ...list]);
      }
      setHasMore((res.result_info?.total_pages ?? 1) > p);
    } catch {
      // silent
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchZones(1, search); }, [fetchZones, search]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchZones(1, search);
  };

  const loadMore = () => {
    if (!hasMore) return;
    const next = page + 1;
    setPage(next);
    fetchZones(next, search);
  };

  const renderZone = ({ item }: { item: Zone }) => (
    <Card
      onPress={() => router.push(`/zone/${item.id}`)}
      style={styles.zoneCard}
    >
      <View style={styles.zoneHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.zoneName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.zoneInfo, { color: colors.textSecondary }]}>
            {item.plan.name} · {item.account.name}
          </Text>
        </View>
        <Badge
          label={item.status}
          variant={item.status === 'active' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}
        />
      </View>
      <View style={styles.zoneFooter}>
        <View style={styles.zoneFooterItem}>
          <Icon name="dns" size={14} color={colors.textTertiary} />
          <Text style={[styles.zoneFooterText, { color: colors.textTertiary }]}>
            {item.name_servers?.length ?? 0} NS
          </Text>
        </View>
        {item.development_mode > 0 && (
          <Badge label={t('zones.dev_mode')} variant="warning" />
        )}
        {item.paused && (
          <Badge label={t('zones.paused')} variant="error" />
        )}
      </View>
    </Card>
  );

  if (loading) return <Loading message={t('common.loading')} />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Icon name="search" size={20} color={colors.textTertiary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('zones.search_placeholder')}
          placeholderTextColor={colors.textTertiary}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            setPage(1);
            setLoading(true);
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => { setSearch(''); setPage(1); }}>
            <Icon name="close" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={zones}
        keyExtractor={(item) => item.id}
        renderItem={renderZone}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={
          <EmptyState
            icon="cloud-off"
            title={t('zones.no_zones')}
            message={t('zones.no_zones_message')}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    paddingVertical: Spacing.md,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  zoneCard: {
    marginBottom: Spacing.sm,
  },
  zoneHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  zoneName: {
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  zoneInfo: {
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  zoneFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.md,
  },
  zoneFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  zoneFooterText: {
    fontSize: FontSize.xs,
  },
});
