import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, RefreshControl, Alert, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';

interface UnifiedRule {
  id: string;
  description: string;
  action: string;
  expression: string;
  enabled: boolean;
  source: 'waf' | 'legacy';
  priority?: number;
  modified_on?: string;
}

export default function FirewallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [rules, setRules] = useState<UnifiedRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = useCallback(async () => {
    const allRules: UnifiedRule[] = [];
    let fetchError: string | null = null;

    // Try WAF Custom Rules (modern rulesets API) first
    try {
      const wafRes = await api.getWAFCustomRules(id);
      const ruleset = wafRes.result;
      if (ruleset?.rules && Array.isArray(ruleset.rules)) {
        for (const r of ruleset.rules) {
          allRules.push({
            id: r.id,
            description: r.description ?? r.ref ?? '',
            action: r.action ?? 'unknown',
            expression: r.expression ?? '',
            enabled: r.enabled !== false,
            source: 'waf',
            modified_on: r.last_updated,
          });
        }
      }
    } catch (e: any) {
      console.log('[CF] WAF rulesets error:', e?.response?.status, e?.response?.data?.errors?.[0]?.message);
      // 404 = no custom rules phase, not an error
      if (e?.response?.status !== 404) {
        fetchError = e?.response?.data?.errors?.[0]?.message ?? null;
      }
    }

    // Also try legacy Firewall Rules API
    try {
      const legacyRes = await api.getFirewallRules(id);
      const legacyRules = legacyRes.result;
      if (Array.isArray(legacyRules)) {
        for (const r of legacyRules) {
          allRules.push({
            id: r.id,
            description: r.description ?? r.filter?.description ?? '',
            action: r.action,
            expression: r.filter?.expression ?? '',
            enabled: !r.paused,
            source: 'legacy',
            priority: r.priority,
            modified_on: r.modified_on,
          });
        }
      }
    } catch (e: any) {
      console.log('[CF] Legacy firewall error:', e?.response?.status, e?.response?.data?.errors?.[0]?.message);
      if (!fetchError) {
        fetchError = e?.response?.data?.errors?.[0]?.message ?? null;
      }
    }

    // Also try IP Access Rules
    try {
      const ipRes = await api.getIPAccessRules(id);
      const ipRules = ipRes.result;
      if (Array.isArray(ipRules)) {
        for (const r of ipRules) {
          allRules.push({
            id: r.id,
            description: r.notes ?? `IP: ${r.configuration?.value ?? 'unknown'}`,
            action: r.mode ?? 'unknown',
            expression: `ip.src eq ${r.configuration?.value ?? '?'}`,
            enabled: true,
            source: 'legacy',
            modified_on: r.modified_on,
          });
        }
      }
    } catch (e: any) {
      console.log('[CF] IP access rules error:', e?.response?.status);
    }

    setRules(allRules);
    setError(allRules.length === 0 ? fetchError : null);
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => { fetchRules(); }, [fetchRules]);

  const onRefresh = () => { setRefreshing(true); fetchRules(); };

  const renderRule = ({ item }: { item: UnifiedRule }) => (
    <Card style={styles.ruleCard}>
      <View style={styles.ruleHeader}>
        <Badge label={item.action} variant={
          ['block', 'challenge', 'managed_challenge'].includes(item.action) ? 'error' :
          ['allow', 'skip'].includes(item.action) ? 'success' :
          item.action === 'log' ? 'info' : 'warning'
        } />
        <Badge label={item.source === 'waf' ? 'WAF' : 'Legacy'} />
        <View style={{ flex: 1 }} />
        {!item.enabled && <Badge label={t('firewall.paused')} variant="default" />}
      </View>
      {item.description ? (
        <Text style={[styles.ruleDesc, { color: colors.text }]}>{item.description}</Text>
      ) : null}
      <Text style={[styles.ruleExpr, { color: colors.textSecondary, backgroundColor: colors.surfaceSecondary }]}>
        {item.expression || '-'}
      </Text>
      <View style={styles.ruleMeta}>
        {item.priority !== undefined && (
          <Text style={[styles.ruleMetaText, { color: colors.textTertiary }]}>
            {t('firewall.priority')}: {item.priority}
          </Text>
        )}
        {item.modified_on && (
          <Text style={[styles.ruleMetaText, { color: colors.textTertiary }]}>
            {new Date(item.modified_on).toLocaleDateString()}
          </Text>
        )}
      </View>
    </Card>
  );

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('firewall.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {error && (
          <View style={[styles.errorBanner, { backgroundColor: colors.error + '15' }]}>
            <Icon name="error-circle" size={16} color={colors.error} />
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </View>
        )}
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={styles.list}
          data={rules}
          keyExtractor={(item) => item.id}
          renderItem={renderRule}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
          ListHeaderComponent={
            rules.length > 0 ? (
              <Text style={[styles.countText, { color: colors.textSecondary }]}>
                {rules.length} {t('firewall.rules_found')}
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <EmptyState icon="shield" title={t('firewall.no_rules')} message={t('firewall.no_rules_message')} />
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  ruleCard: { marginBottom: Spacing.sm },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  ruleDesc: { fontSize: FontSize.md, fontWeight: '500', marginBottom: Spacing.xs },
  ruleExpr: {
    fontSize: FontSize.xs,
    fontFamily: 'monospace',
    padding: Spacing.sm,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  ruleMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  ruleMetaText: { fontSize: FontSize.xs },
  countText: {
    fontSize: FontSize.sm,
    marginBottom: Spacing.md,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    margin: Spacing.lg,
    marginBottom: 0,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  errorText: { flex: 1, fontSize: FontSize.sm },
});
