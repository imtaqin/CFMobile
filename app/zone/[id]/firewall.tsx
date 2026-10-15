import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, Alert, TouchableOpacity, Switch,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import {
  Banner, Chip, ChipRow, Fab, Field, FieldLabel, Group, ListRow, ToggleRow,
} from '@/components/ui/kit';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { logIpRule, logWafRule } from '@/services/change-history';
import { RulesetRule, RulesetAction, IPAccessRule, IPAccessMode } from '@/services/cloudflare';

const WAF_ACTIONS: RulesetAction[] = ['block', 'managed_challenge', 'js_challenge', 'challenge', 'log', 'skip'];
const IP_MODES: IPAccessMode[] = ['block', 'challenge', 'js_challenge', 'managed_challenge', 'whitelist'];

/** Starting points so people do not have to remember the expression syntax. */
const TEMPLATES: { key: string; expression: string }[] = [
  { key: 'country', expression: '(ip.geoip.country eq "CN")' },
  { key: 'path', expression: '(http.request.uri.path contains "/wp-admin")' },
  { key: 'method', expression: '(http.request.method eq "POST")' },
  { key: 'ua', expression: '(http.user_agent contains "bot")' },
  { key: 'threat', expression: '(cf.threat_score gt 14)' },
];

interface LegacyRule {
  id: string;
  description: string;
  action: string;
  expression: string;
  enabled: boolean;
}

export default function FirewallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [rulesetId, setRulesetId] = useState<string | null>(null);
  const [wafRules, setWafRules] = useState<RulesetRule[]>([]);
  const [legacy, setLegacy] = useState<LegacyRule[]>([]);
  const [ipRules, setIpRules] = useState<IPAccessRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // WAF rule editor
  const [showWaf, setShowWaf] = useState(false);
  const [editing, setEditing] = useState<RulesetRule | null>(null);
  const [action, setAction] = useState<RulesetAction>('block');
  const [expression, setExpression] = useState('');
  const [description, setDescription] = useState('');
  const [enabled, setEnabled] = useState(true);

  // IP access editor
  const [showIp, setShowIp] = useState(false);
  const [ipValue, setIpValue] = useState('');
  const [ipMode, setIpMode] = useState<IPAccessMode>('block');
  const [ipNotes, setIpNotes] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    let firstError: string | null = null;

    try {
      const res = await api.getWAFCustomRules(id);
      setRulesetId(res.result?.id ?? null);
      setWafRules(res.result?.rules ?? []);
    } catch (e: any) {
      // 404 just means this zone has never had a custom rule.
      if (e?.response?.status !== 404) firstError = errMsg(e);
      setRulesetId(null);
      setWafRules([]);
    }

    try {
      const res = await api.getFirewallRules(id);
      setLegacy((res.result ?? []).map((r: any) => ({
        id: r.id,
        description: r.description ?? r.filter?.description ?? '',
        action: r.action,
        expression: r.filter?.expression ?? '',
        enabled: !r.paused,
      })));
    } catch {
      setLegacy([]);
    }

    try {
      const res = await api.getIPAccessRules(id);
      setIpRules(res.result ?? []);
    } catch {
      setIpRules([]);
    }

    setError(firstError);
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ─── WAF custom rules ──────────────────────────────────────────────────────

  const openNewWaf = () => {
    setEditing(null);
    setAction('block');
    setExpression('');
    setDescription('');
    setEnabled(true);
    setShowWaf(true);
  };

  const openEditWaf = (r: RulesetRule) => {
    setEditing(r);
    setAction(r.action);
    setExpression(r.expression);
    setDescription(r.description ?? '');
    setEnabled(r.enabled !== false);
    setShowWaf(true);
  };

  const submitWaf = async () => {
    const expr = expression.trim();
    if (!expr) return;
    setSaving(true);
    try {
      let target = rulesetId;
      if (!target) {
        const created = await api.createWAFEntrypoint(id);
        target = created.result?.id ?? null;
        setRulesetId(target);
      }
      if (!target) throw new Error('no ruleset');

      const payload = { action, expression: expr, description: description.trim(), enabled };
      const res = editing
        ? await api.updateRulesetRule(id, target, editing.id, payload)
        : await api.createRulesetRule(id, target, payload);
      // Both endpoints return the whole ruleset back, so trust that over local state.
      const rules = res.result?.rules ?? [];
      if (editing) {
        logWafRule(id, target, 'update', editing.id,
          { action: editing.action, expression: editing.expression, description: editing.description ?? '', enabled: editing.enabled !== false },
          payload);
      } else {
        const added = rules.find((r) => !wafRules.some((w) => w.id === r.id));
        logWafRule(id, target, 'create', added?.id, null, payload);
      }
      setWafRules(rules);
      setShowWaf(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const toggleWaf = async (r: RulesetRule, value: boolean) => {
    if (!rulesetId) return;
    setWafRules((prev) => prev.map((x) => (x.id === r.id ? { ...x, enabled: value } : x)));
    try {
      const res = await api.updateRulesetRule(id, rulesetId, r.id, { enabled: value });
      logWafRule(id, rulesetId, 'update', r.id,
        { action: r.action, expression: r.expression, description: r.description ?? '', enabled: !value },
        { action: r.action, expression: r.expression, description: r.description ?? '', enabled: value });
      setWafRules(res.result?.rules ?? []);
    } catch (e: any) {
      setWafRules((prev) => prev.map((x) => (x.id === r.id ? { ...x, enabled: !value } : x)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deleteWaf = (r: RulesetRule) => {
    if (!rulesetId) return;
    Alert.alert(t('firewall.delete_title'), t('firewall.delete_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await api.deleteRulesetRule(id, rulesetId, r.id);
            logWafRule(id, rulesetId, 'delete', r.id,
              { action: r.action, expression: r.expression, description: r.description ?? '', enabled: r.enabled !== false }, null);
            setWafRules(res.result?.rules ?? []);
          } catch (e: any) {
            Alert.alert(t('firewall.delete_error'), errMsg(e));
          }
        },
      },
    ]);
  };

  // ─── Legacy firewall rules ─────────────────────────────────────────────────

  const toggleLegacy = async (r: LegacyRule, value: boolean) => {
    setLegacy((prev) => prev.map((x) => (x.id === r.id ? { ...x, enabled: value } : x)));
    try {
      await api.updateFirewallRule(id, r.id, { paused: !value } as any);
    } catch (e: any) {
      setLegacy((prev) => prev.map((x) => (x.id === r.id ? { ...x, enabled: !value } : x)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deleteLegacy = (r: LegacyRule) => {
    Alert.alert(t('firewall.delete_title'), t('firewall.delete_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteFirewallRule(id, r.id);
            setLegacy((prev) => prev.filter((x) => x.id !== r.id));
          } catch (e: any) {
            Alert.alert(t('firewall.delete_error'), errMsg(e));
          }
        },
      },
    ]);
  };

  // ─── IP access rules ───────────────────────────────────────────────────────

  const submitIp = async () => {
    const value = ipValue.trim();
    if (!value) return;
    setSaving(true);
    try {
      // Cloudflare picks the target from the shape of the value: a bare
      // country code is a country rule, anything with a slash is a range.
      const target = /^[A-Z]{2}$/.test(value.toUpperCase())
        ? 'country'
        : value.includes('/')
          ? 'ip_range'
          : 'ip';
      const res = await api.createIPAccessRule(id, {
        mode: ipMode,
        configuration: { target, value: target === 'country' ? value.toUpperCase() : value },
        notes: ipNotes.trim() || undefined,
      });
      if (res.result) {
        logIpRule(id, 'create', res.result.id, { mode: res.result.mode, configuration: res.result.configuration, notes: res.result.notes || undefined });
        setIpRules((prev) => [res.result, ...prev]);
      }
      setShowIp(false);
      setIpValue('');
      setIpNotes('');
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteIp = (r: IPAccessRule) => {
    Alert.alert(t('firewall.delete_title'), t('firewall.delete_ip_confirm', { value: r.configuration?.value }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteIPAccessRule(id, r.id);
            logIpRule(id, 'delete', r.id, { mode: r.mode, configuration: r.configuration, notes: r.notes || undefined });
            setIpRules((prev) => prev.filter((x) => x.id !== r.id));
          } catch (e: any) {
            Alert.alert(t('firewall.delete_error'), errMsg(e));
          }
        },
      },
    ]);
  };

  if (loading) return <Loading />;

  const actionVariant = (a: string) =>
    ['block'].includes(a) ? 'error'
      : ['skip', 'whitelist', 'allow'].includes(a) ? 'success'
        : a === 'log' ? 'info' : 'warning';

  const trash = (onPress: () => void) => (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={t('common.delete')}
    >
      <Icon name="trash" size={16} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  // One expression rule: action badge, switch and delete on top, then the text.
  const ruleCard = (
    key: string,
    opts: {
      badge: string;
      action: string;
      description?: string;
      expression: string;
      enabled: boolean;
      onToggle: (v: boolean) => void;
      onDelete: () => void;
      onPress?: () => void;
    },
  ) => (
    <Card key={key} onPress={opts.onPress} style={styles.ruleCard}>
      <View style={styles.ruleHeader}>
        <Badge label={opts.badge} variant={actionVariant(opts.action)} />
        <View style={{ flex: 1 }} />
        <Switch
          value={opts.enabled}
          onValueChange={opts.onToggle}
          trackColor={{ true: colors.primary, false: colors.border }}
          thumbColor="#FFF"
        />
        {trash(opts.onDelete)}
      </View>
      {!!opts.description && (
        <Text style={[styles.ruleDesc, { color: colors.text }]}>{opts.description}</Text>
      )}
      <Text style={[styles.ruleExpr, { color: colors.textSecondary, backgroundColor: colors.surfaceSecondary }]}>
        {opts.expression || '-'}
      </Text>
    </Card>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('firewall.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          {/* WAF custom rules — tap a rule to edit it */}
          <SectionHeader title={t('firewall.custom_rules')} />
          {wafRules.length === 0 ? (
            <EmptyState icon="shield" title={t('firewall.no_rules')} message={t('firewall.no_custom_message')} />
          ) : (
            wafRules.map((r) => ruleCard(r.id, {
              badge: t(`firewall.action_${r.action}`, { defaultValue: r.action }),
              action: r.action,
              description: r.description,
              expression: r.expression,
              enabled: r.enabled !== false,
              onToggle: (v) => toggleWaf(r, v),
              onDelete: () => deleteWaf(r),
              onPress: () => openEditWaf(r),
            }))
          )}

          {/* IP access rules */}
          <SectionHeader
            title={t('firewall.ip_access')}
            action={
              <TouchableOpacity
                onPress={() => setShowIp(true)}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={t('firewall.add_ip_rule')}
              >
                <Icon name="plus" size={20} color={colors.primary} />
              </TouchableOpacity>
            }
          />
          {ipRules.length === 0 ? (
            <EmptyState icon="network" title={t('firewall.no_ip_rules')} message={t('firewall.no_ip_rules_message')} />
          ) : (
            <Group>
              {ipRules.map((r) => (
                <ListRow
                  key={r.id}
                  title={r.configuration?.value ?? ''}
                  subtitle={r.notes || undefined}
                  trailing={
                    <View style={styles.rowTrailing}>
                      <Badge label={t(`firewall.mode_${r.mode}`, { defaultValue: r.mode })} variant={actionVariant(r.mode)} />
                      {trash(() => deleteIp(r))}
                    </View>
                  }
                />
              ))}
            </Group>
          )}

          {/* Legacy firewall rules — only shown when the zone still has some */}
          {legacy.length > 0 && (
            <>
              <SectionHeader title={t('firewall.legacy_rules')} />
              <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('firewall.legacy_hint')}</Text>
              {legacy.map((r) => ruleCard(r.id, {
                badge: r.action,
                action: r.action,
                description: r.description,
                expression: r.expression,
                enabled: r.enabled,
                onToggle: (v) => toggleLegacy(r, v),
                onDelete: () => deleteLegacy(r),
              }))}
            </>
          )}
        </ScrollView>

        <Fab label={t('firewall.add_rule')} onPress={openNewWaf} />
      </View>

      {/* WAF rule editor */}
      <Sheet
        visible={showWaf}
        onClose={() => setShowWaf(false)}
        title={editing ? t('firewall.edit_rule') : t('firewall.add_rule')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitWaf}
            loading={saving}
            disabled={!expression.trim()}
          />
        }
      >
        <FieldLabel>{t('firewall.action')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={WAF_ACTIONS.map((a) => ({ value: a, label: t(`firewall.action_${a}`, { defaultValue: a }) }))}
          value={action}
          onChange={setAction}
        />

        <Field
          label={t('firewall.description')}
          placeholder={t('firewall.description_placeholder')}
          value={description}
          onChangeText={setDescription}
        />

        <Field
          label={t('firewall.expression')}
          placeholder='(ip.geoip.country eq "CN")'
          value={expression}
          onChangeText={setExpression}
          multiline
          mono
          autoCapitalize="none"
          autoCorrect={false}
          style={{ fontSize: FontSize.sm }}
        />

        <FieldLabel>{t('firewall.templates')}</FieldLabel>
        <View style={[styles.chips, styles.chipWrap]}>
          {TEMPLATES.map((tpl) => (
            <Chip
              key={tpl.key}
              label={t(`firewall.tpl_${tpl.key}`)}
              onPress={() => setExpression(tpl.expression)}
            />
          ))}
        </View>

        <Group style={styles.sheetGroup}>
          <ToggleRow title={t('firewall.enabled')} value={enabled} onValueChange={setEnabled} />
        </Group>
      </Sheet>

      {/* IP access editor */}
      <Sheet
        visible={showIp}
        onClose={() => setShowIp(false)}
        title={t('firewall.add_ip_rule')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitIp}
            loading={saving}
            disabled={!ipValue.trim()}
          />
        }
      >
        <Field
          label={t('firewall.ip_value')}
          hint={t('firewall.ip_value_hint')}
          placeholder="203.0.113.4, 203.0.113.0/24, ID"
          value={ipValue}
          onChangeText={setIpValue}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />

        <FieldLabel>{t('firewall.action')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={IP_MODES.map((m) => ({ value: m, label: t(`firewall.mode_${m}`, { defaultValue: m }) }))}
          value={ipMode}
          onChange={setIpMode}
        />

        <Field
          label={t('firewall.notes')}
          placeholder={t('firewall.notes_placeholder')}
          value={ipNotes}
          onChangeText={setIpNotes}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg },
  ruleCard: { marginBottom: Spacing.sm, gap: Spacing.sm },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  ruleDesc: { fontSize: FontSize.md, fontWeight: '500' },
  ruleExpr: {
    fontSize: FontSize.xs,
    fontFamily: 'monospace',
    padding: Spacing.sm,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  rowTrailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  hint: {
    fontSize: FontSize.sm,
    lineHeight: 18,
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  chips: { marginTop: 6 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  sheetGroup: { marginTop: Spacing.lg },
});
