import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { IconCircle } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { WebAnalyticsSite } from '@/services/cloudflare';

export default function WebAnalyticsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [sites, setSites] = useState<WebAnalyticsSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSites = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getWebAnalyticsSites(accountId);
      setSites(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchSites(); }, [fetchSites]);

  const handleDelete = (site: WebAnalyticsSite) => {
    if (!accountId) return;
    Alert.alert(t('wa.delete_title'), t('wa.delete_confirm', { tag: site.site_tag }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteWebAnalyticsSite(accountId, site.site_tag); setSites((p) => p.filter((s) => s.site_tag !== site.site_tag)); }
        catch { Alert.alert(t('common.error'), t('wa.delete_error')); }
      }},
    ]);
  };

  const renderSite = ({ item }: { item: WebAnalyticsSite }) => (
    <View style={[styles.site, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <IconCircle name="chart-line" />
      <View style={styles.siteBody}>
        <Text style={[styles.siteHost, { color: colors.text }]} numberOfLines={1}>
          {item.host ?? item.zone_tag ?? item.site_tag}
        </Text>
        <Text style={[styles.siteTag, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.site_tag}
        </Text>
        <View style={styles.badgeRow}>
          <Badge label={item.auto_install ? t('wa.auto_install') : t('wa.manual')} variant={item.auto_install ? 'success' : 'default'} />
          {item.ruleset?.enabled === false && (
            <Badge label={t('wa.disabled')} variant="default" />
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={t('common.delete')}
      >
        <Icon name="trash" size={16} color={colors.textTertiary} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('wa.title') }} />
        <View style={{ flex: 1, backgroundColor: colors.background, padding: Spacing.lg }} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('wa.title') }} />
      <FlatList
        data={sites}
        keyExtractor={(item) => item.site_tag}
        renderItem={renderSite}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchSites(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="chart-line" title={error ? t('common.error') : t('wa.no_sites')} message={error ?? t('wa.no_sites_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  site: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  siteBody: { flex: 1, gap: 2 },
  siteHost: { fontSize: FontSize.md, fontWeight: '500' },
  siteTag: { fontSize: 12, fontFamily: 'monospace' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginTop: 4 },
});
