import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, RefreshControl, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton, SkeletonRows } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ToggleRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { TransformRule, TransformRuleset } from '@/services/cloudflare';

type RuleType = 'transform' | 'redirect' | 'cache';
type RuleAction = 'rewrite' | 'redirect' | 'set_cache_settings';

const TABS: RuleType[] = ['transform', 'redirect', 'cache'];

export default function RulesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [selectedTab, setSelectedTab] = useState<RuleType>('transform');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [transformRules, setTransformRules] = useState<TransformRuleset | null>(null);
  const [redirectRules, setRedirectRules] = useState<TransformRuleset | null>(null);
  const [cacheRules, setCacheRules] = useState<TransformRuleset | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [editingRule, setEditingRule] = useState<TransformRule | null>(null);
  const [expression, setExpression] = useState('');
  const [description, setDescription] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [action, setAction] = useState<RuleAction>('rewrite');
  const [saving, setSaving] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('common.error');

  const fetchRules = useCallback(async () => {
    setError(null);
    try {
      const [transformRes, redirectRes, cacheRes] = await Promise.allSettled([
        api.getTransformRules(id),
        api.getRedirectRules(id),
        api.getCacheRules(id)
      ]);

      if (transformRes.status === 'fulfilled') {
        setTransformRules(transformRes.value.result);
      } else {
        // If ruleset doesn't exist, it will return 404 - that's OK
        if (transformRes.reason?.response?.status !== 404) {
          console.warn('Transform rules error:', transformRes.reason);
        }
      }

      if (redirectRes.status === 'fulfilled') {
        setRedirectRules(redirectRes.value.result);
      } else {
        if (redirectRes.reason?.response?.status !== 404) {
          console.warn('Redirect rules error:', redirectRes.reason);
        }
      }

      if (cacheRes.status === 'fulfilled') {
        setCacheRules(cacheRes.value.result);
      } else {
        if (cacheRes.reason?.response?.status !== 404) {
          console.warn('Cache rules error:', cacheRes.reason);
        }
      }
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { fetchRules(); }, [fetchRules]);

  const getRulesForTab = () => {
    switch (selectedTab) {
      case 'transform': return transformRules?.rules || [];
      case 'redirect': return redirectRules?.rules || [];
      case 'cache': return cacheRules?.rules || [];
      default: return [];
    }
  };

  const getRulesetForTab = () => {
    switch (selectedTab) {
      case 'transform': return transformRules;
      case 'redirect': return redirectRules;
      case 'cache': return cacheRules;
      default: return null;
    }
  };

  const handleDelete = (rule: TransformRule) => {
    Alert.alert(
      t('rules.delete_title'),
      t('rules.delete_confirm', { expression: rule.expression }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              const ruleset = getRulesetForTab();
              if (!ruleset) return;

              // Remove the rule from the ruleset
              const updatedRules = (ruleset.rules || []).filter(r => r.id !== rule.id);
              const updatedRuleset = { ...ruleset, rules: updatedRules };

              // Save the updated ruleset
              switch (selectedTab) {
                case 'transform':
                  await api.updateTransformRules(id, updatedRuleset);
                  setTransformRules(updatedRuleset);
                  break;
                case 'redirect':
                  await api.updateRedirectRules(id, updatedRuleset);
                  setRedirectRules(updatedRuleset);
                  break;
                case 'cache':
                  await api.updateCacheRules(id, updatedRuleset);
                  setCacheRules(updatedRuleset);
                  break;
              }
            } catch (e: any) {
              Alert.alert(t('common.error'), errMsg(e));
            }
          }
        }
      ]
    );
  };

  const openAdd = () => {
    setEditingRule(null);
    setExpression('');
    setDescription('');
    setEnabled(true);
    setAction(selectedTab === 'transform' ? 'rewrite' : selectedTab === 'redirect' ? 'redirect' : 'set_cache_settings');
    setShowAdd(true);
  };

  const openEdit = (rule: TransformRule) => {
    setEditingRule(rule);
    setExpression(rule.expression || '');
    setDescription(rule.description || '');
    setEnabled(rule.enabled);
    setAction(rule.action as any);
    setShowAdd(true);
  };

  const submitRule = async () => {
    const expr = expression.trim();
    if (!expr) return;
    setSaving(true);

    try {
      const ruleset = getRulesetForTab();
      if (!ruleset) {
        // Create new ruleset if it doesn't exist
        const newRuleset: Partial<api.TransformRuleset> = {
          name: `${selectedTab} rules`,
          description: `${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} rules for zone ${id}`,
          kind: 'zone',
          phase: selectedTab === 'transform'
            ? 'http_request_transform'
            : selectedTab === 'redirect'
            ? 'http_request_dynamic_redirect'
            : 'http_request_cache_settings',
          rules: []
        };

        switch (selectedTab) {
          case 'transform':
            await api.updateTransformRules(id, newRuleset);
            break;
          case 'redirect':
            await api.updateRedirectRules(id, newRuleset);
            break;
          case 'cache':
            await api.updateCacheRules(id, newRuleset);
            break;
        }
        await fetchRules(); // Refresh to get the new ruleset
      }

      // Get the latest ruleset again after potential creation
      const updatedRuleset = getRulesetForTab();

      const newRule: TransformRule = {
        id: editingRule?.id, // Will be ignored on create
        action,
        expression: expr,
        description,
        enabled,
      };

      let updatedRulesetData: api.TransformRuleset;
      if (editingRule) {
        // Update existing rule
        const updatedRules = (updatedRuleset?.rules || []).map(r =>
          r.id === editingRule.id ? newRule : r
        );
        updatedRulesetData = { ...(updatedRuleset || {} as any), rules: updatedRules } as api.TransformRuleset;
      } else {
        // Add new rule
        const updatedRules = [...(updatedRuleset?.rules || []), newRule];
        updatedRulesetData = { ...(updatedRuleset || {} as any), rules: updatedRules } as api.TransformRuleset;
      }

      // Save the updated ruleset
      switch (selectedTab) {
        case 'transform':
          const transformResult = await api.updateTransformRules(id, updatedRulesetData);
          setTransformRules(transformResult.result);
          break;
        case 'redirect':
          const redirectResult = await api.updateRedirectRules(id, updatedRulesetData);
          setRedirectRules(redirectResult.result);
          break;
        case 'cache':
          const cacheResult = await api.updateCacheRules(id, updatedRulesetData);
          setCacheRules(cacheResult.result);
          break;
      }

      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const rules = getRulesForTab();

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('rules.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <View style={styles.tabs}>
            <Skeleton width={220} height={32} radius={16} />
          </View>
          <View style={styles.list}>
            <SkeletonRows count={6} avatar={false} />
          </View>
        </View>
      </>
    );
  }

  const renderRule = ({ item }: { item: TransformRule }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => openEdit(item)}
      style={[styles.rule, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
    >
      <View style={styles.ruleBody}>
        <Badge label={item.action} variant={item.enabled ? 'success' : 'default'} />
        <Text style={[styles.ruleExpression, { color: colors.text }]} numberOfLines={2}>
          {item.expression}
        </Text>
        {!!item.description && (
          <Text style={[styles.ruleDescription, { color: colors.textSecondary }]} numberOfLines={1}>
            {item.description}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={t('common.delete')}
      >
        <Icon name="trash" size={16} color={colors.textTertiary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('rules.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.tabs}>
          <ChipRow
            options={TABS.map((tab) => ({ value: tab, label: t(`rules.${tab}`) }))}
            value={selectedTab}
            onChange={setSelectedTab}
          />
        </View>

        <FlatList
          data={rules}
          keyExtractor={(item) => item.id || ''}
          renderItem={renderRule}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchRules(); }} tintColor={colors.primary} />}
          ListHeaderComponent={error ? (
            <View style={styles.banner}>
              <Banner message={error} />
            </View>
          ) : null}
          ListEmptyComponent={
            <EmptyState
              icon="rule"
              title={t('rules.no_rules')}
              message={t(`rules.no_${selectedTab}_rules_message`)}
            />
          }
        />

        <Fab label={t('rules.add_rule')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={editingRule ? t('rules.edit_rule') : t('rules.add_rule')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitRule}
            loading={saving}
            disabled={!expression.trim()}
          />
        }
      >
        <Field
          label={t('rules.expression')}
          placeholder={t('rules.expression_placeholder')}
          value={expression}
          onChangeText={setExpression}
          multiline
          numberOfLines={3}
          mono
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Field
          label={t('rules.description')}
          placeholder={t('rules.description_placeholder')}
          value={description}
          onChangeText={setDescription}
          autoCapitalize="sentences"
          autoCorrect={true}
        />

        <FieldLabel>{t('rules.action')}</FieldLabel>
        <ChipRow<RuleAction>
          wrap
          style={styles.actionChips}
          options={[
            { value: 'rewrite', label: t('rules.rewrite') },
            { value: 'redirect', label: t('rules.redirect_action') },
            { value: 'set_cache_settings', label: t('rules.set_cache') },
          ]}
          value={action}
          onChange={setAction}
        />

        <Group style={styles.enabledRow}>
          <ToggleRow title={t('rules.enabled')} value={enabled} onValueChange={setEnabled} />
        </Group>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.md },
  list: { paddingHorizontal: Spacing.lg },
  banner: { marginBottom: Spacing.md },
  rule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  ruleBody: { flex: 1, gap: 6 },
  ruleExpression: { fontSize: FontSize.sm, fontFamily: 'monospace', lineHeight: 18 },
  ruleDescription: { fontSize: FontSize.sm },
  actionChips: { marginTop: 6 },
  enabledRow: { marginTop: Spacing.lg },
});
