import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AIGateway } from '@/services/cloudflare';
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
    </>
  );
}

const styles = StyleSheet.create({
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
