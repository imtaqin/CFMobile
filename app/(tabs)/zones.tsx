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
import { AdBanner } from '@/components/ui/ad-banner';
import { NativeAdCard } from '@/components/ui/native-ad';
import { useInterstitial } from '@/hooks/use-interstitial';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

const maskName = (name: string) => {
  if (!name.includes('@')) return name;
  const [local, domain] = name.split('@');
  return local.slice(0, 2) + '\u2022\u2022\u2022\u2022@' + domain;
};

export default function ZonesScreen() {
  const { t } = useTranslation();
  const { maybeShow } = useInterstitial();
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

  const renderZone = ({ item, index }: { item: Zone; index: number }) => {
    const statusColor = item.status === 'active' ? colors.success : item.status === 'pending' ? colors.warning : colors.error;
    return (
      <>
      {index > 0 && index % 5 === 0 && <NativeAdCard />}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => { maybeShow(); router.push(`/zone/${item.id}`); }}
      >
        <View style={[styles.zoneCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={[styles.zoneIconWrap, { backgroundColor: colors.primary + '15' }]}>
            <Icon name="globe" size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.zoneNameRow}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.zoneName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
            </View>
            <Text style={[styles.zoneInfo, { color: colors.textTertiary }]} numberOfLines={1}>
              {item.plan.name}{item.account.name ? ` · ${maskName(item.account.name)}` : ''}
            </Text>
            <View style={styles.zoneFooter}>
              <View style={[styles.metaPill, { backgroundColor: colors.surfaceSecondary }]}>
                <Icon name="dns" size={11} color={colors.textTertiary} />
                <Text style={[styles.metaPillText, { color: colors.textSecondary }]}>
                  {item.name_servers?.length ?? 0} NS
                </Text>
              </View>
              {item.development_mode > 0 && (
                <View style={[styles.metaPill, { backgroundColor: colors.warning + '15' }]}>
                  <Icon name="developer-mode" size={11} color={colors.warning} />
                  <Text style={[styles.metaPillText, { color: colors.warning }]}>{t('zones.dev_mode')}</Text>
                </View>
              )}
              {item.paused && (
                <View style={[styles.metaPill, { backgroundColor: colors.error + '15' }]}>
                  <Text style={[styles.metaPillText, { color: colors.error }]}>{t('zones.paused')}</Text>
                </View>
              )}
            </View>
          </View>
          <Icon name="chevron-right" size={18} color={colors.textTertiary} />
        </View>
      </TouchableOpacity>
      </>
    );
  };

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
        ListHeaderComponent={<AdBanner />}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  zoneIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  zoneName: {
    fontSize: FontSize.md,
    fontWeight: '700',
    flex: 1,
  },
  zoneInfo: {
    fontSize: 11,
  },
  zoneFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
    flexWrap: 'wrap',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  metaPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
