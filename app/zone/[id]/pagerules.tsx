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
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Banner } from '@/components/ui/kit';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { PageRule } from '@/services/types';

export default function PageRulesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [rules, setRules] = useState<PageRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getPageRules(id);
      setRules(Array.isArray(res.result) ? res.result : []);
    } catch (e: any) {
      const msg = e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Failed to load';
      console.log('[CF] PageRules error:', e?.response?.data ?? e?.message);
      setError(msg);
    }
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => { fetchRules(); }, [fetchRules]);

  const handleDelete = (rule: PageRule) => {
    Alert.alert(
      t('pagerules.delete_title'),
      t('pagerules.delete_confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deletePageRule(id, rule.id);
              setRules((prev) => prev.filter((r) => r.id !== rule.id));
            } catch {
              Alert.alert(t('common.error'), t('pagerules.delete_error'));
            }
          },
        },
      ]
    );
  };

  const renderRule = ({ item }: { item: PageRule }) => (
    <Card style={styles.ruleCard}>
      <View style={styles.ruleHeader}>
        <Badge
          label={item.status}
          variant={item.status === 'active' ? 'success' : 'default'}
        />
        <Text style={[styles.priority, { color: colors.textTertiary }]}>
          #{item.priority}
        </Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => handleDelete(item)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={t('common.delete')}
        >
          <Icon name="trash" size={16} color={colors.textTertiary} />
        </TouchableOpacity>
      </View>

      {item.targets.map((target, i) => (
        <Text key={i} style={[styles.targetUrl, { color: colors.text, backgroundColor: colors.surfaceSecondary }]}>
          {target.constraint.value}
        </Text>
      ))}

      <View style={styles.actionsWrap}>
        {item.actions.map((action, i) => (
          <View key={i} style={[styles.actionChip, { backgroundColor: colors.surfaceSecondary }]}>
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>
              {action.id}: {typeof action.value === 'object' ? JSON.stringify(action.value) : String(action.value ?? 'on')}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('pagerules.title') }} />
        <View style={{ flex: 1, backgroundColor: colors.background, padding: Spacing.lg }} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('pagerules.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {error && (
          <View style={styles.errorWrap}>
            <Banner message={error} />
          </View>
        )}
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={styles.list}
          data={rules}
          keyExtractor={(item) => item.id}
          renderItem={renderRule}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchRules(); }} tintColor={colors.primary} />}
          ListEmptyComponent={
            !error ? <EmptyState icon="rule" title={t('pagerules.no_rules')} message={t('pagerules.no_rules_message')} /> : null
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  ruleCard: { marginBottom: Spacing.sm, gap: Spacing.sm },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  priority: { fontSize: FontSize.xs },
  targetUrl: {
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
    padding: Spacing.sm,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  actionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  actionChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  actionText: { fontSize: FontSize.xs, fontWeight: '500' },
  errorWrap: { marginHorizontal: Spacing.lg, marginTop: Spacing.lg },
});
