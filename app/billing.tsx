import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { BillableUsageRow } from '@/services/cloudflare';

interface ServiceCost {
  service: string;
  cost: number;
  quantity: number;
  unit: string;
  /** false once two rows for the same service report different units. */
  oneUnit: boolean;
}

const money = (amount: number, currency: string) => `${currency} ${amount.toFixed(2)}`;
const day = (iso: string) => (iso || '').slice(0, 10);

export default function BillingScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [rows, setRows] = useState<BillableUsageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [available, setAvailable] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getBillableUsage(accountId);
      setRows(res.result ?? []);
      setAvailable(true);
    } catch {
      // Alpha API — a 403 or 404 just means it isn't enabled for this account/token.
      setRows([]);
      setAvailable(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const currency = rows[0]?.BillingCurrency ?? 'USD';
  const total = rows.reduce((sum, r) => sum + (r.EffectiveCost ?? 0), 0);
  const periodStart = rows.reduce<string>((min, r) => (!min || day(r.ChargePeriodStart) < min ? day(r.ChargePeriodStart) : min), '');
  const periodEnd = rows.reduce<string>((max, r) => (day(r.ChargePeriodEnd) > max ? day(r.ChargePeriodEnd) : max), '');

  const byService = Array.from(
    rows.reduce((map, r) => {
      const name = r.ServiceName || r.ServiceFamilyName || '—';
      const prev = map.get(name);
      if (!prev) {
        map.set(name, { service: name, cost: r.EffectiveCost ?? 0, quantity: r.ConsumedQuantity ?? 0, unit: r.ConsumedUnit ?? '', oneUnit: true });
      } else {
        prev.cost += r.EffectiveCost ?? 0;
        if (prev.unit === (r.ConsumedUnit ?? '')) prev.quantity += r.ConsumedQuantity ?? 0;
        else prev.oneUnit = false;
      }
      return map;
    }, new Map<string, ServiceCost>()).values()
  ).sort((a, b) => b.cost - a.cost);

  if (loading) return <Loading />;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xxxl }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
    >
      <Stack.Screen options={{ title: t('billing.title') }} />

      {!accountId || !available || rows.length === 0 ? (
        <EmptyState
          icon="chart-line"
          title={t('billing.unavailable_title')}
          message={t('billing.unavailable_message')}
        />
      ) : (
        <>
          <Card style={styles.summary}>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>{t('billing.period_total')}</Text>
            <Text style={[styles.total, { color: colors.text }]}>{money(total, currency)}</Text>
            {!!periodStart && (
              <Text style={[styles.period, { color: colors.textTertiary }]}>{periodStart} – {periodEnd}</Text>
            )}
          </Card>

          <SectionHeader title={t('billing.by_service')} />
          <Group>
            {byService.map((s) => (
              <ListRow
                key={s.service}
                icon="chart-line"
                title={s.service}
                subtitle={s.oneUnit && s.unit ? `${s.quantity.toLocaleString()} ${s.unit}` : undefined}
                meta={money(s.cost, currency)}
              />
            ))}
          </Group>

          <Text style={[styles.note, { color: colors.textTertiary }]}>{t('billing.note')}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  summary: { alignItems: 'center', gap: Spacing.xs, paddingVertical: Spacing.xl },
  totalLabel: { fontSize: FontSize.sm },
  total: { fontSize: 34, fontWeight: '700' },
  period: { fontSize: FontSize.xs },
  note: { fontSize: FontSize.xs, marginTop: Spacing.lg },
});
