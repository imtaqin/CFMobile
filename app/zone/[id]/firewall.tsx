import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, Alert, TouchableOpacity,
  Modal, TextInput, Switch,
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
import { Button } from '@/components/ui/button';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import * as api from '@/services/cloudflare';
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
      setWafRules(res.result?.rules ?? []);
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
      if (res.result) setIpRules((prev) => [res.result, ...prev]);
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

  const chips = <T extends string>(options: T[], value: T, onChange: (v: T) => void, label: (v: T) => string) => (
    <View style={styles.chipWrap}>
      {options.map((o) => (
        <TouchableOpacity
          key={o}
          onPress={() => onChange(o)}
          style={[styles.chip, {
            borderColor: value === o ? colors.primary : colors.border,
            backgroundColor: value === o ? colors.primary + '12' : 'transparent',
          }]}
        >
          <Text style={{
            color: value === o ? colors.primary : colors.textSecondary,
            fontSize: FontSize.xs,
            fontWeight: '600',
          }}>
            {label(o)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('firewall.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
      >
        {error && (
          <View style={[styles.errorBanner, { backgroundColor: colors.error + '15' }]}>
            <Icon name="error-circle" size={16} color={colors.error} />
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </View>
        )}

        {/* WAF custom rules */}
        <SectionHeader
          title={t('firewall.custom_rules')}
          action={
            <TouchableOpacity onPress={openNewWaf} hitSlop={8}>
              <Icon name="plus" size={20} color={colors.primary} />
            </TouchableOpacity>
          }
        />
        {wafRules.length === 0 ? (
          <EmptyState icon="shield" title={t('firewall.no_rules')} message={t('firewall.no_custom_message')} />
        ) : (
          wafRules.map((r) => (
            <Card key={r.id} style={styles.ruleCard}>
              <View style={styles.ruleHeader}>
                <Badge label={t(`firewall.action_${r.action}`, { defaultValue: r.action })} variant={actionVariant(r.action)} />
                <View style={{ flex: 1 }} />
                <Switch
                  value={r.enabled !== false}
                  onValueChange={(v) => toggleWaf(r, v)}
                  trackColor={{ true: colors.success, false: colors.border }}
                  thumbColor="#FFF"
                />
                <TouchableOpacity onPress={() => openEditWaf(r)} hitSlop={8} style={{ padding: 4 }}>
                  <Icon name="edit" size={16} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteWaf(r)} hitSlop={8} style={{ padding: 4 }}>
                  <Icon name="trash" size={16} color={colors.error} />
                </TouchableOpacity>
              </View>
              {!!r.description && (
                <Text style={[styles.ruleDesc, { color: colors.text }]}>{r.description}</Text>
              )}
              <Text style={[styles.ruleExpr, { color: colors.textSecondary, backgroundColor: colors.surfaceSecondary }]}>
                {r.expression || '-'}
              </Text>
            </Card>
          ))
        )}

        {/* IP access rules */}
        <SectionHeader
          title={t('firewall.ip_access')}
          action={
            <TouchableOpacity onPress={() => setShowIp(true)} hitSlop={8}>
              <Icon name="plus" size={20} color={colors.primary} />
            </TouchableOpacity>
          }
        />
        {ipRules.length === 0 ? (
          <EmptyState icon="network" title={t('firewall.no_ip_rules')} message={t('firewall.no_ip_rules_message')} />
        ) : (
          ipRules.map((r) => (
            <Card key={r.id} style={styles.ipCard}>
              <Badge label={t(`firewall.mode_${r.mode}`, { defaultValue: r.mode })} variant={actionVariant(r.mode)} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.ruleDesc, { color: colors.text }]} numberOfLines={1}>
                  {r.configuration?.value}
                </Text>
                {!!r.notes && (
                  <Text style={[styles.ruleMetaText, { color: colors.textTertiary }]} numberOfLines={1}>{r.notes}</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => deleteIp(r)} hitSlop={8} style={{ padding: 4 }}>
                <Icon name="trash" size={16} color={colors.error} />
              </TouchableOpacity>
            </Card>
          ))
        )}

        {/* Legacy firewall rules — only shown when the zone still has some */}
        {legacy.length > 0 && (
          <>
            <SectionHeader title={t('firewall.legacy_rules')} />
            <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('firewall.legacy_hint')}</Text>
            {legacy.map((r) => (
              <Card key={r.id} style={styles.ruleCard}>
                <View style={styles.ruleHeader}>
                  <Badge label={r.action} variant={actionVariant(r.action)} />
                  <View style={{ flex: 1 }} />
                  <Switch
                    value={r.enabled}
                    onValueChange={(v) => toggleLegacy(r, v)}
                    trackColor={{ true: colors.success, false: colors.border }}
                    thumbColor="#FFF"
                  />
                  <TouchableOpacity onPress={() => deleteLegacy(r)} hitSlop={8} style={{ padding: 4 }}>
                    <Icon name="trash" size={16} color={colors.error} />
                  </TouchableOpacity>
                </View>
                {!!r.description && <Text style={[styles.ruleDesc, { color: colors.text }]}>{r.description}</Text>}
                <Text style={[styles.ruleExpr, { color: colors.textSecondary, backgroundColor: colors.surfaceSecondary }]}>
                  {r.expression || '-'}
                </Text>
              </Card>
            ))}
          </>
        )}
      </ScrollView>

      {/* WAF rule editor */}
      <Modal visible={showWaf} transparent animationType="slide" onRequestClose={() => setShowWaf(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {editing ? t('firewall.edit_rule') : t('firewall.add_rule')}
              </Text>
              <TouchableOpacity onPress={() => setShowWaf(false)} hitSlop={8}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 440 }} keyboardShouldPersistTaps="handled">
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('firewall.action')}</Text>
              {chips(WAF_ACTIONS, action, setAction, (a) => t(`firewall.action_${a}`, { defaultValue: a }))}

              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('firewall.description')}</Text>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surfaceSecondary }]}
                placeholder={t('firewall.description_placeholder')}
                placeholderTextColor={colors.textTertiary}
                value={description}
                onChangeText={setDescription}
              />

              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('firewall.expression')}</Text>
              <TextInput
                style={[styles.input, styles.exprInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surfaceSecondary }]}
                placeholder='(ip.geoip.country eq "CN")'
                placeholderTextColor={colors.textTertiary}
                value={expression}
                onChangeText={setExpression}
                multiline
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('firewall.templates')}</Text>
              <View style={styles.chipWrap}>
                {TEMPLATES.map((tpl) => (
                  <TouchableOpacity
                    key={tpl.key}
                    onPress={() => setExpression(tpl.expression)}
                    style={[styles.chip, { borderColor: colors.border }]}
                  >
                    <Text style={{ color: colors.textSecondary, fontSize: FontSize.xs }}>
                      {t(`firewall.tpl_${tpl.key}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.switchRow}>
                <Text style={{ color: colors.text, fontSize: FontSize.sm }}>{t('firewall.enabled')}</Text>
                <Switch
                  value={enabled}
                  onValueChange={setEnabled}
                  trackColor={{ true: colors.success, false: colors.border }}
                  thumbColor="#FFF"
                />
              </View>
            </ScrollView>

            <Button
              title={t('common.save')}
              onPress={submitWaf}
              loading={saving}
              disabled={!expression.trim()}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        </View>
      </Modal>

      {/* IP access editor */}
      <Modal visible={showIp} transparent animationType="slide" onRequestClose={() => setShowIp(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('firewall.add_ip_rule')}</Text>
              <TouchableOpacity onPress={() => setShowIp(false)} hitSlop={8}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('firewall.ip_value')}</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surfaceSecondary }]}
              placeholder="203.0.113.4, 203.0.113.0/24, ID"
              placeholderTextColor={colors.textTertiary}
              value={ipValue}
              onChangeText={setIpValue}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('firewall.ip_value_hint')}</Text>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('firewall.action')}</Text>
            {chips(IP_MODES, ipMode, setIpMode, (m) => t(`firewall.mode_${m}`, { defaultValue: m }))}

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('firewall.notes')}</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surfaceSecondary }]}
              placeholder={t('firewall.notes_placeholder')}
              placeholderTextColor={colors.textTertiary}
              value={ipNotes}
              onChangeText={setIpNotes}
            />

            <Button
              title={t('common.save')}
              onPress={submitIp}
              loading={saving}
              disabled={!ipValue.trim()}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  ruleCard: { marginBottom: Spacing.sm },
  ipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  ruleDesc: { fontSize: FontSize.sm, fontWeight: '600', marginBottom: Spacing.xs },
  ruleExpr: {
    fontSize: FontSize.xs,
    fontFamily: 'monospace',
    padding: Spacing.sm,
    borderRadius: 6,
    overflow: 'hidden',
  },
  ruleMetaText: { fontSize: FontSize.xs },
  hint: { fontSize: FontSize.xs, fontStyle: 'italic', marginBottom: Spacing.sm },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  errorText: { flex: 1, fontSize: FontSize.sm },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalTitle: { fontSize: FontSize.lg, fontWeight: '700' },
  inputLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.sm,
  },
  exprInput: { fontFamily: 'monospace', minHeight: 80, textAlignVertical: 'top' },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  chip: {
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
});
