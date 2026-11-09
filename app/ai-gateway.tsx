import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Alert, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Field, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AIGateway, WebSearchResult } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function AIGatewayScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('ai-gateway');

  const [gateways, setGateways] = useState<AIGateway[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchGw, setSearchGw] = useState<AIGateway | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WebSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const openSearch = (gw: AIGateway) => {
    setSearchGw(gw);
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  const runSearch = async () => {
    if (!accountId || !searchGw || !query.trim()) return;
    setSearching(true);
    try {
      const res = await api.aiGatewayWebSearch(accountId, searchGw.id, query.trim(), { limit: 10 });
      setResults(res.result?.items ?? []);
      setSearched(true);
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setSearching(false);
    }
  };

  const fetchGateways = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getAIGateways(accountId);
      setGateways(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchGateways(); }, [fetchGateways]);

  const handleDelete = (gw: AIGateway) => {
    if (!accountId) return;
    Alert.alert(t('aigw.delete_title'), t('aigw.delete_confirm', { id: gw.id }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteAIGateway(accountId, gw.id); setGateways((p) => p.filter((g) => g.id !== gw.id)); }
        catch { Alert.alert(t('common.error'), t('aigw.delete_error')); }
      }},
    ]);
  };

  const renderGateway = ({ item }: { item: AIGateway }) => {
    const hasBadges = !!item.authentication || item.rate_limiting_limit > 0;
    return (
      <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <ListRow
          icon="zap"
          title={item.id}
          subtitle={`${item.collect_logs ? t('aigw.logging_on') : t('aigw.logging_off')} · ${t('aigw.cache')} ${item.cache_ttl}s`}
          onPress={() => openSearch(item)}
          trailing={
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={t('common.delete')}
            >
              <Icon name="trash" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          }
        />
        {hasBadges && (
          <View style={styles.badges}>
            {item.authentication && <Badge label={t('aigw.auth')} variant="success" />}
            {item.rate_limiting_limit > 0 && <Badge label={`${item.rate_limiting_limit} ${t('aigw.rate_limit')}`} variant="default" />}
          </View>
        )}
      </View>
    );
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('aigw.title') }} />
        <PremiumPaywall feature="ai-gateway" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('aigw.title') }} />
      <FlatList
        data={gateways}
        keyExtractor={(item) => item.id}
        renderItem={renderGateway}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchGateways(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="zap" title={error ? t('common.error') : t('aigw.no_gateways')} message={error ?? t('aigw.no_gateways_message')} />}
      />

      <Sheet visible={!!searchGw} onClose={() => setSearchGw(null)} title={t('aigw.web_search')}>
        <Field
          label={t('aigw.web_search_query')}
          placeholder={t('aigw.web_search_placeholder')}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={runSearch}
        />
        <Button title={t('aigw.search')} onPress={runSearch} loading={searching} disabled={!query.trim()} style={styles.searchBtn} />
        {searched && results.length === 0 ? (
          <Text style={[styles.noResults, { color: colors.textTertiary }]}>{t('aigw.no_results')}</Text>
        ) : (
          results.map((r, i) => (
            <TouchableOpacity
              key={`${r.url}-${i}`}
              style={[styles.result, { borderColor: colors.borderLight }]}
              onPress={() => Linking.openURL(r.url)}
            >
              <Text style={[styles.resultTitle, { color: colors.text }]} numberOfLines={2}>{r.title}</Text>
              {!!r.description && <Text style={[styles.resultDesc, { color: colors.textSecondary }]} numberOfLines={3}>{r.description}</Text>}
              <Text style={[styles.resultUrl, { color: colors.primary }]} numberOfLines={1}>{r.url}</Text>
            </TouchableOpacity>
          ))
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  searchBtn: { marginTop: Spacing.sm, marginBottom: Spacing.md },
  noResults: { fontSize: FontSize.sm, textAlign: 'center', paddingVertical: Spacing.lg },
  result: { borderTopWidth: 1, paddingVertical: Spacing.md, gap: 3 },
  resultTitle: { fontSize: FontSize.md, fontWeight: '600' },
  resultDesc: { fontSize: FontSize.sm, lineHeight: 18 },
  resultUrl: { fontSize: FontSize.xs },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
  // Lines up with the row text: row padding + icon circle + gap.
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    paddingLeft: Spacing.lg + 36 + Spacing.md,
    paddingRight: Spacing.lg,
    paddingBottom: 13,
    marginTop: -5,
  },
});
