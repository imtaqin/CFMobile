import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Banner, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { RegistrarDomain } from '@/services/cloudflare';

function daysUntil(dateStr?: string): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function RegistrarScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [domains, setDomains] = useState<RegistrarDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    setError(null);
    try {
      const res = await api.getRegistrarDomains(accountId);
      setDomains(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggle = async (domain: RegistrarDomain, field: 'auto_renew' | 'locked' | 'privacy', value: boolean) => {
    if (!accountId) return;
    setDomains((prev) => prev.map((d) => (d.id === domain.id ? { ...d, [field]: value } : d)));
    try {
      await api.updateRegistrarDomain(accountId, domain.id, { [field]: value });
    } catch (e: any) {
      setDomains((prev) => prev.map((d) => (d.id === domain.id ? { ...d, [field]: !value } : d)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('registrar.title') }} />
        <View style={[styles.container, styles.content, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('registrar.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
      >
        {error && <Banner message={error} />}

        {domains.length === 0 && !error ? (
          <EmptyState icon="globe" title={t('registrar.no_domains')} message={t('registrar.no_domains_message')} />
        ) : (
          domains.map((d) => {
            const days = daysUntil(d.expires_at);
            const expiringSoon = days != null && days <= 30;
            const expiry = d.expires_at
              ? `${days != null && days >= 0 ? t('registrar.expires_in_days', { count: days }) : t('registrar.expired')} · ${new Date(d.expires_at).toLocaleDateString()}`
              : undefined;
            return (
              <Group key={d.id}>
                <ListRow
                  icon="globe"
                  iconTone={expiringSoon ? 'warning' : 'neutral'}
                  title={d.id}
                  subtitle={expiry}
                  trailing={expiringSoon ? <View><Badge label={t('registrar.expiring_soon')} variant="warning" /></View> : undefined}
                />
                <ToggleRow
                  title={t('registrar.auto_renew')}
                  value={!!d.auto_renew}
                  onValueChange={(v) => toggle(d, 'auto_renew', v)}
                />
                <ToggleRow
                  title={t('registrar.locked')}
                  value={!!d.locked}
                  onValueChange={(v) => toggle(d, 'locked', v)}
                />
                <ToggleRow
                  title={t('registrar.privacy')}
                  value={!!d.privacy}
                  onValueChange={(v) => toggle(d, 'privacy', v)}
                />
                {!!d.registry_statuses && (
                  <View style={styles.statusRow}>
                    <Text style={[styles.statuses, { color: colors.textTertiary }]} numberOfLines={2}>
                      {d.registry_statuses}
                    </Text>
                  </View>
                )}
              </Group>
            );
          })
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.lg },
  statusRow: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  statuses: { fontSize: FontSize.xs, fontFamily: 'monospace', lineHeight: 16 },
});
