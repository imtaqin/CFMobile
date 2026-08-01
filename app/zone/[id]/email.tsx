import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity,
  Alert, Switch, Modal, TextInput,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
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
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import {
  EmailRoutingSettings, EmailRoutingRule, DestinationAddress,
  EmailRoutingDnsRecord, EmailActionType, EmailAction,
} from '@/services/cloudflare';

const ACTIONS: EmailActionType[] = ['forward', 'worker', 'drop'];

export default function EmailRoutingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [settings, setSettings] = useState<EmailRoutingSettings | null>(null);
  const [rules, setRules] = useState<EmailRoutingRule[]>([]);
  const [catchAll, setCatchAll] = useState<EmailRoutingRule | null>(null);
  const [addresses, setAddresses] = useState<DestinationAddress[]>([]);
  const [dns, setDns] = useState<EmailRoutingDnsRecord[]>([]);
  const [workers, setWorkers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDns, setShowDns] = useState(false);

  // Rule editor — `editing` null means we are creating a new rule.
  const [showRule, setShowRule] = useState(false);
  const [editing, setEditing] = useState<EmailRoutingRule | null>(null);
  const [customAddr, setCustomAddr] = useState('');
  const [action, setAction] = useState<EmailActionType>('forward');
  const [dests, setDests] = useState<string[]>([]);
  const [workerName, setWorkerName] = useState('');
  const [saving, setSaving] = useState(false);

  // Catch-all editor
  const [showCatchAll, setShowCatchAll] = useState(false);
  const [caAction, setCaAction] = useState<EmailActionType>('forward');
  const [caDests, setCaDests] = useState<string[]>([]);

  const [showAddDest, setShowAddDest] = useState(false);
  const [newDest, setNewDest] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';
  const verified = addresses.filter((a) => a.verified);

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const s = await api.getEmailRoutingSettings(id);
      setSettings(s.result);
      if (s.result?.enabled) {
        const [rRes, cRes, dRes] = await Promise.allSettled([
          api.getEmailRoutingRules(id),
          api.getEmailCatchAll(id),
          api.getEmailRoutingDns(id),
        ]);
        if (rRes.status === 'fulfilled') {
          setRules((rRes.value.result ?? []).filter((r) => !r.matchers.some((m) => m.type === 'all')));
        }
        if (cRes.status === 'fulfilled') setCatchAll(cRes.value.result);
        if (dRes.status === 'fulfilled') setDns(dRes.value.result ?? []);
      }
      if (accountId) {
        const [aRes, wRes] = await Promise.allSettled([
          api.getDestinationAddresses(accountId),
          api.getWorkerScripts(accountId),
        ]);
        if (aRes.status === 'fulfilled') setAddresses(aRes.value.result ?? []);
        // Worker actions need a script name; without the permission we just
        // hide that option rather than fail the whole screen.
        if (wRes.status === 'fulfilled') setWorkers((wRes.value.result ?? []).map((w: any) => w.id));
      }
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleEnable = async () => {
    try {
      await api.enableEmailRouting(id);
      setLoading(true);
      fetchAll();
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const handleDisable = () => {
    Alert.alert(t('email.disable'), t('email.disable_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('email.disable'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.disableEmailRouting(id);
            setLoading(true);
            fetchAll();
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const toggleRule = async (rule: EmailRoutingRule, enabled: boolean) => {
    setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, enabled } : r)));
    try {
      await api.updateEmailRoutingRule(id, rule.id, { ...rule, enabled });
    } catch (e: any) {
      setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, enabled: !enabled } : r)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deleteRule = (rule: EmailRoutingRule) => {
    Alert.alert(
      t('email.delete_rule'),
      t('email.delete_rule_confirm', { name: rule.matchers[0]?.value ?? rule.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteEmailRoutingRule(id, rule.id);
              setRules((prev) => prev.filter((r) => r.id !== rule.id));
            } catch (e: any) {
              Alert.alert(t('common.error'), errMsg(e));
            }
          },
        },
      ]
    );
  };

  const openNewRule = () => {
    setEditing(null);
    setCustomAddr('');
    setAction('forward');
    setDests([]);
    setWorkerName('');
    setShowRule(true);
  };

  const openEditRule = (rule: EmailRoutingRule) => {
    const a = rule.actions[0];
    setEditing(rule);
    setCustomAddr(rule.matchers[0]?.value ?? '');
    setAction((a?.type as EmailActionType) ?? 'forward');
    setDests(a?.type === 'forward' ? a.value ?? [] : []);
    setWorkerName(a?.type === 'worker' ? a.value?.[0] ?? '' : '');
    setShowRule(true);
  };

  const buildAction = (type: EmailActionType, forwardTo: string[], worker: string): EmailAction | null => {
    if (type === 'drop') return { type: 'drop' };
    if (type === 'worker') return worker ? { type: 'worker', value: [worker] } : null;
    return forwardTo.length ? { type: 'forward', value: forwardTo } : null;
  };

  const submitRule = async () => {
    const local = customAddr.trim();
    if (!local) return;
    const address = local.includes('@') ? local : `${local}@${settings?.name ?? ''}`;
    const act = buildAction(action, dests, workerName.trim());
    if (!act) return;

    setSaving(true);
    try {
      const payload = {
        name: `${action} ${address}`,
        enabled: editing ? editing.enabled : true,
        matchers: [{ type: 'literal' as const, field: 'to' as const, value: address }],
        actions: [act],
      };
      if (editing) {
        const res = await api.updateEmailRoutingRule(id, editing.id, payload);
        if (res.result) {
          setRules((prev) => prev.map((r) => (r.id === editing.id ? res.result : r)));
        }
      } else {
        const res = await api.createEmailRoutingRule(id, payload);
        if (res.result) setRules((prev) => [...prev, res.result]);
      }
      setShowRule(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const openCatchAll = () => {
    const a = catchAll?.actions[0];
    setCaAction((a?.type as EmailActionType) ?? 'forward');
    setCaDests(a?.type === 'forward' ? a.value ?? [] : []);
    setShowCatchAll(true);
  };

  const saveCatchAll = async (enabled: boolean) => {
    const act = buildAction(caAction, caDests, '');
    if (!act) return;
    setSaving(true);
    try {
      const res = await api.updateEmailCatchAll(id, {
        enabled,
        matchers: [{ type: 'all' }],
        actions: [act],
      });
      if (res.result) setCatchAll(res.result);
      setShowCatchAll(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const toggleCatchAll = async (enabled: boolean) => {
    if (!catchAll) return;
    const act = catchAll.actions[0];
    // Turning it on with nothing to forward to would be rejected by the API,
    // so send the user to the editor instead of showing a raw error.
    if (enabled && act?.type === 'forward' && !act.value?.length) {
      openCatchAll();
      return;
    }
    const prev = catchAll;
    setCatchAll({ ...catchAll, enabled });
    try {
      await api.updateEmailCatchAll(id, {
        enabled,
        matchers: [{ type: 'all' }],
        actions: [act ?? { type: 'drop' }],
      });
    } catch (e: any) {
      setCatchAll(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const submitDestination = async () => {
    const email = newDest.trim();
    if (!email || !accountId) return;
    setSaving(true);
    try {
      const res = await api.createDestinationAddress(accountId, email);
      if (res.result) setAddresses((prev) => [...prev, res.result]);
      setShowAddDest(false);
      setNewDest('');
      Alert.alert(t('common.success'), t('email.verify_sent', { email }));
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteDestination = (addr: DestinationAddress) => {
    if (!accountId) return;
    Alert.alert(t('email.delete_destination'), t('email.delete_destination_confirm', { email: addr.email }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteDestinationAddress(accountId, addr.id);
            setAddresses((prev) => prev.filter((a) => a.id !== addr.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const toggleDest = (email: string) =>
    setDests((prev) => (prev.includes(email) ? prev.filter((d) => d !== email) : [...prev, email]));
  const toggleCaDest = (email: string) =>
    setCaDests((prev) => (prev.includes(email) ? prev.filter((d) => d !== email) : [...prev, email]));

  if (loading) return <Loading />;

  const ruleLabel = (r: EmailRoutingRule) => r.matchers[0]?.value ?? r.name;
  const actionLabel = (a?: EmailAction) => {
    if (!a) return '-';
    if (a.type === 'drop') return t('email.action_drop');
    if (a.type === 'worker') return t('email.action_worker', { name: a.value?.[0] ?? '' });
    return a.value?.join(', ') ?? '-';
  };
  const actionIcon = (a?: EmailAction) =>
    a?.type === 'drop' ? 'trash' : a?.type === 'worker' ? 'code' : 'chevron-right';

  const canSaveRule =
    !!customAddr.trim() &&
    (action === 'drop' || (action === 'worker' ? !!workerName.trim() : dests.length > 0));

  const actionPicker = (
    value: EmailActionType,
    onChange: (a: EmailActionType) => void,
    allowWorker: boolean
  ) => (
    <View style={styles.actionRow}>
      {ACTIONS.filter((a) => a !== 'worker' || allowWorker).map((a) => (
        <TouchableOpacity
          key={a}
          onPress={() => onChange(a)}
          style={[styles.actionChip, {
            borderColor: value === a ? colors.primary : colors.border,
            backgroundColor: value === a ? colors.primary + '12' : 'transparent',
          }]}
        >
          <Text style={{
            color: value === a ? colors.primary : colors.textSecondary,
            fontSize: FontSize.sm,
            fontWeight: '600',
          }}>
            {t(`email.action_${a}_label`)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const destPicker = (selected: string[], onToggle: (e: string) => void) => (
    <>
      {verified.map((a) => (
        <TouchableOpacity
          key={a.id}
          style={[styles.destOption, {
            borderColor: selected.includes(a.email) ? colors.primary : colors.border,
            backgroundColor: selected.includes(a.email) ? colors.primary + '10' : 'transparent',
          }]}
          onPress={() => onToggle(a.email)}
        >
          <Text style={{ color: colors.text, fontSize: FontSize.sm }}>{a.email}</Text>
          {selected.includes(a.email) && <Icon name="check-circle" size={18} color={colors.primary} />}
        </TouchableOpacity>
      ))}
      {verified.length === 0 && (
        <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('email.no_verified_hint')}</Text>
      )}
    </>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('email.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
      >
        {error && (
          <Card style={[styles.errorCard, { borderColor: colors.error }]}>
            <Icon name="error-circle" size={20} color={colors.error} />
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </Card>
        )}

        {!error && settings && !settings.enabled && (
          <Card style={styles.enableCard}>
            <Icon name="mail" size={40} color={colors.textTertiary} />
            <Text style={[styles.enableTitle, { color: colors.text }]}>{t('email.not_enabled')}</Text>
            <Text style={[styles.enableSub, { color: colors.textSecondary }]}>{t('email.not_enabled_message')}</Text>
            <Button title={t('email.enable')} onPress={handleEnable} />
          </Card>
        )}

        {!error && settings?.enabled && (
          <>
            <Card style={styles.statusCard}>
              <View style={[styles.statusIcon, { backgroundColor: colors.success + '15' }]}>
                <Icon name="mail" size={22} color={colors.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.statusName, { color: colors.text }]}>{settings.name}</Text>
                <Text style={[styles.statusMeta, { color: colors.textSecondary }]}>{settings.status}</Text>
              </View>
              <Badge label={t('email.enabled')} variant="success" />
            </Card>

            {/* DNS records Cloudflare needs in the zone */}
            {dns.length > 0 && (
              <Card style={{ marginBottom: Spacing.sm }}>
                <TouchableOpacity style={styles.dnsHeader} onPress={() => setShowDns((v) => !v)}>
                  <Icon name="dns" size={18} color={colors.primary} />
                  <Text style={[styles.dnsTitle, { color: colors.text }]}>
                    {t('email.dns_records', { count: dns.length })}
                  </Text>
                  <Icon name={showDns ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textTertiary} />
                </TouchableOpacity>
                {showDns && (
                  <View style={{ marginTop: Spacing.sm, gap: Spacing.xs }}>
                    <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('email.dns_hint')}</Text>
                    {dns.map((r, i) => (
                      <TouchableOpacity
                        key={`${r.type}-${r.name}-${i}`}
                        style={[styles.dnsRow, { borderColor: colors.border }]}
                        onPress={() => {
                          Clipboard.setStringAsync(r.content);
                          Alert.alert(t('common.success'), t('email.dns_copied'));
                        }}
                      >
                        <Badge label={r.type} variant="info" />
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.dnsName, { color: colors.text }]} numberOfLines={1}>{r.name}</Text>
                          <Text style={[styles.dnsContent, { color: colors.textSecondary }]} numberOfLines={1}>
                            {r.priority != null ? `${r.priority} ` : ''}{r.content}
                          </Text>
                        </View>
                        <Icon name="copy" size={14} color={colors.textTertiary} />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </Card>
            )}

            {/* Rules */}
            <SectionHeader
              title={t('email.rules')}
              action={
                <TouchableOpacity onPress={openNewRule} hitSlop={8}>
                  <Icon name="plus" size={20} color={colors.primary} />
                </TouchableOpacity>
              }
            />
            {rules.length === 0 ? (
              <EmptyState icon="mail" title={t('email.no_rules')} message={t('email.no_rules_message')} />
            ) : (
              rules.map((r) => (
                <Card key={r.id} style={styles.ruleCard}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => openEditRule(r)}>
                    <Text style={[styles.ruleAddr, { color: colors.text }]} numberOfLines={1}>{ruleLabel(r)}</Text>
                    <View style={styles.ruleDestRow}>
                      <Icon name={actionIcon(r.actions[0])} size={12} color={colors.textTertiary} />
                      <Text style={[styles.ruleDest, { color: colors.textSecondary }]} numberOfLines={1}>
                        {actionLabel(r.actions[0])}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Switch
                    value={r.enabled}
                    onValueChange={(v) => toggleRule(r, v)}
                    trackColor={{ true: colors.success, false: colors.border }}
                    thumbColor="#FFF"
                  />
                  <TouchableOpacity onPress={() => deleteRule(r)} hitSlop={8} style={{ padding: 4 }}>
                    <Icon name="trash" size={16} color={colors.error} />
                  </TouchableOpacity>
                </Card>
              ))
            )}

            {/* Catch-all */}
            {catchAll && (
              <>
                <SectionHeader
                  title={t('email.catch_all')}
                  action={
                    <TouchableOpacity onPress={openCatchAll} hitSlop={8}>
                      <Icon name="edit" size={18} color={colors.primary} />
                    </TouchableOpacity>
                  }
                />
                <Card style={styles.ruleCard}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={openCatchAll}>
                    <Text style={[styles.ruleAddr, { color: colors.text }]}>{t('email.catch_all_desc')}</Text>
                    <View style={styles.ruleDestRow}>
                      <Icon name={actionIcon(catchAll.actions[0])} size={12} color={colors.textTertiary} />
                      <Text style={[styles.ruleDest, { color: colors.textSecondary }]} numberOfLines={1}>
                        {actionLabel(catchAll.actions[0])}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Switch
                    value={catchAll.enabled}
                    onValueChange={toggleCatchAll}
                    trackColor={{ true: colors.success, false: colors.border }}
                    thumbColor="#FFF"
                  />
                </Card>
              </>
            )}

            {/* Destination addresses */}
            <SectionHeader
              title={t('email.destinations')}
              action={
                <TouchableOpacity onPress={() => setShowAddDest(true)} hitSlop={8}>
                  <Icon name="plus" size={20} color={colors.primary} />
                </TouchableOpacity>
              }
            />
            {addresses.length === 0 ? (
              <EmptyState icon="user" title={t('email.no_destinations')} message={t('email.no_destinations_message')} />
            ) : (
              addresses.map((a) => (
                <Card key={a.id} style={styles.ruleCard}>
                  <Icon name="user" size={18} color={a.verified ? colors.success : colors.warning} />
                  <Text style={[styles.ruleAddr, { color: colors.text, flex: 1 }]} numberOfLines={1}>{a.email}</Text>
                  <Badge
                    label={a.verified ? t('email.verified') : t('email.pending')}
                    variant={a.verified ? 'success' : 'warning'}
                  />
                  <TouchableOpacity onPress={() => deleteDestination(a)} hitSlop={8} style={{ padding: 4 }}>
                    <Icon name="trash" size={16} color={colors.error} />
                  </TouchableOpacity>
                </Card>
              ))
            )}

            <TouchableOpacity onPress={handleDisable} style={styles.disableRow}>
              <Icon name="power" size={16} color={colors.error} />
              <Text style={{ color: colors.error, fontSize: FontSize.sm, fontWeight: '600' }}>
                {t('email.disable')}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Rule editor */}
      <Modal visible={showRule} transparent animationType="slide" onRequestClose={() => setShowRule(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {editing ? t('email.edit_rule') : t('email.add_rule')}
              </Text>
              <TouchableOpacity onPress={() => setShowRule(false)} hitSlop={8}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 420 }} keyboardShouldPersistTaps="handled">
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('email.custom_address')}</Text>
              <View style={[styles.addrInputRow, { borderColor: colors.border, backgroundColor: colors.surfaceSecondary }]}>
                <TextInput
                  style={[styles.addrInput, { color: colors.text }]}
                  placeholder="hello"
                  placeholderTextColor={colors.textTertiary}
                  value={customAddr}
                  onChangeText={setCustomAddr}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {!customAddr.includes('@') && (
                  <Text style={[styles.addrSuffix, { color: colors.textSecondary }]}>@{settings?.name}</Text>
                )}
              </View>

              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('email.action')}</Text>
              {actionPicker(action, setAction, workers.length > 0)}

              {action === 'forward' && (
                <>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('email.forward_to')}</Text>
                  {destPicker(dests, toggleDest)}
                </>
              )}

              {action === 'worker' && (
                <>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('email.worker_script')}</Text>
                  {workers.map((w) => (
                    <TouchableOpacity
                      key={w}
                      style={[styles.destOption, {
                        borderColor: workerName === w ? colors.primary : colors.border,
                        backgroundColor: workerName === w ? colors.primary + '10' : 'transparent',
                      }]}
                      onPress={() => setWorkerName(w)}
                    >
                      <Text style={{ color: colors.text, fontSize: FontSize.sm }}>{w}</Text>
                      {workerName === w && <Icon name="check-circle" size={18} color={colors.primary} />}
                    </TouchableOpacity>
                  ))}
                </>
              )}

              {action === 'drop' && (
                <Text style={[styles.hint, { color: colors.textTertiary, marginTop: Spacing.sm }]}>
                  {t('email.drop_hint')}
                </Text>
              )}
            </ScrollView>

            <Button
              title={t('common.save')}
              onPress={submitRule}
              loading={saving}
              disabled={!canSaveRule}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        </View>
      </Modal>

      {/* Catch-all editor */}
      <Modal visible={showCatchAll} transparent animationType="slide" onRequestClose={() => setShowCatchAll(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('email.catch_all')}</Text>
              <TouchableOpacity onPress={() => setShowCatchAll(false)} hitSlop={8}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('email.catch_all_hint')}</Text>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('email.action')}</Text>
            {actionPicker(caAction, setCaAction, false)}

            {caAction === 'forward' && (
              <ScrollView style={{ maxHeight: 240 }}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('email.forward_to')}</Text>
                {destPicker(caDests, toggleCaDest)}
              </ScrollView>
            )}

            <Button
              title={t('common.save')}
              onPress={() => saveCatchAll(true)}
              loading={saving}
              disabled={caAction === 'forward' && caDests.length === 0}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        </View>
      </Modal>

      {/* Add destination */}
      <Modal visible={showAddDest} transparent animationType="slide" onRequestClose={() => setShowAddDest(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('email.add_destination')}</Text>
              <TouchableOpacity onPress={() => setShowAddDest(false)} hitSlop={8}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('email.destination_email')}</Text>
            <View style={[styles.addrInputRow, { borderColor: colors.border, backgroundColor: colors.surfaceSecondary }]}>
              <TextInput
                style={[styles.addrInput, { color: colors.text }]}
                placeholder="you@example.com"
                placeholderTextColor={colors.textTertiary}
                value={newDest}
                onChangeText={setNewDest}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <Button
              title={t('common.save')}
              onPress={submitDestination}
              loading={saving}
              disabled={!newDest.includes('@')}
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
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  errorText: { flex: 1, fontSize: FontSize.sm },
  enableCard: {
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.xxl,
  },
  enableTitle: { fontSize: FontSize.lg, fontWeight: '700' },
  enableSub: { fontSize: FontSize.sm, textAlign: 'center' },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusName: { fontSize: FontSize.md, fontWeight: '700' },
  statusMeta: { fontSize: FontSize.xs, marginTop: 2 },
  dnsHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  dnsTitle: { flex: 1, fontSize: FontSize.sm, fontWeight: '700' },
  dnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },
  dnsName: { fontSize: FontSize.xs, fontWeight: '600' },
  dnsContent: { fontSize: FontSize.xs, marginTop: 1 },
  ruleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  ruleAddr: { fontSize: FontSize.sm, fontWeight: '600' },
  ruleDestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  ruleDest: { fontSize: FontSize.xs, flex: 1 },
  disableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xl,
    padding: Spacing.md,
  },
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
  addrInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
  },
  addrInput: {
    flex: 1,
    fontSize: FontSize.md,
    paddingVertical: Spacing.md,
  },
  addrSuffix: { fontSize: FontSize.sm, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: Spacing.xs },
  actionChip: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
  },
  destOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xs,
  },
  hint: { fontSize: FontSize.xs, fontStyle: 'italic' },
});
