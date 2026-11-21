import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity,
  Alert, Switch, TextInput,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton, SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import {
  Banner, ChipRow, Fab, Field, FieldLabel, Group, IconCircle, ListRow,
} from '@/components/ui/kit';
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
  const insets = useSafeAreaInsets();
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

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('email.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <View style={styles.content}>
            <Skeleton height={76} radius={Radius.lg} />
            <SkeletonHeading />
            <SkeletonRows count={3} />
            <SkeletonHeading />
            <SkeletonRows count={3} />
          </View>
        </View>
      </>
    );
  }

  const ruleLabel = (r: EmailRoutingRule) => r.matchers[0]?.value ?? r.name;
  const actionLabel = (a?: EmailAction) => {
    if (!a) return '-';
    if (a.type === 'drop') return t('email.action_drop');
    if (a.type === 'worker') return t('email.action_worker', { name: a.value?.[0] ?? '' });
    return a.value?.join(', ') ?? '-';
  };
  const actionIcon = (a?: EmailAction): IconName =>
    a?.type === 'drop' ? 'close' : a?.type === 'worker' ? 'code' : 'mail';

  const canSaveRule =
    !!customAddr.trim() &&
    (action === 'drop' || (action === 'worker' ? !!workerName.trim() : dests.length > 0));

  const routingOn = !error && !!settings?.enabled;

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

  const toggle = (value: boolean, onValueChange: (v: boolean) => void) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ true: colors.primary, false: colors.border }}
      thumbColor="#FFF"
    />
  );

  const hint = (text: string) => (
    <Text style={[styles.hint, { color: colors.textTertiary }]}>{text}</Text>
  );

  const actionPicker = (
    value: EmailActionType,
    onChange: (a: EmailActionType) => void,
    allowWorker: boolean
  ) => (
    <ChipRow
      wrap
      style={styles.control}
      options={ACTIONS.filter((a) => a !== 'worker' || allowWorker).map((a) => ({
        value: a,
        label: t(`email.action_${a}_label`),
      }))}
      value={value}
      onChange={onChange}
    />
  );

  // Rows that can be ticked: destinations (several) or a worker script (one).
  const checkList = (items: string[], isSelected: (v: string) => boolean, onPick: (v: string) => void) => (
    <Group style={styles.control}>
      {items.map((item) => (
        <ListRow
          key={item}
          title={item}
          onPress={() => onPick(item)}
          chevron={false}
          trailing={isSelected(item) ? <Icon name="check-circle" size={18} color={colors.primary} /> : undefined}
        />
      ))}
    </Group>
  );

  const destPicker = (selected: string[], onToggle: (e: string) => void) =>
    verified.length === 0
      ? <View style={styles.control}>{hint(t('email.no_verified_hint'))}</View>
      : checkList(verified.map((a) => a.email), (e) => selected.includes(e), onToggle);

  return (
    <>
      <Stack.Screen options={{ title: t('email.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: routingOn ? insets.bottom + 96 : Spacing.xxxl },
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          {!error && settings && !settings.enabled && (
            <Card style={styles.enableCard}>
              <IconCircle name="mail" size={56} />
              <Text style={[styles.enableTitle, { color: colors.text }]}>{t('email.not_enabled')}</Text>
              <Text style={[styles.enableSub, { color: colors.textSecondary }]}>{t('email.not_enabled_message')}</Text>
              <Button title={t('email.enable')} onPress={handleEnable} style={{ alignSelf: 'stretch' }} />
            </Card>
          )}

          {!error && settings?.enabled && (
            <>
              {/* Summary */}
              <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
                <IconCircle name="mail" size={44} tone="success" />
                <View style={styles.heroBody}>
                  <Text style={[styles.heroName, { color: colors.text }]} numberOfLines={1}>{settings.name}</Text>
                  <Text style={[styles.heroMeta, { color: colors.textTertiary }]} numberOfLines={1}>{settings.status}</Text>
                </View>
                <Badge label={t('email.enabled')} variant="success" />
              </View>

              {/* DNS records Cloudflare needs in the zone */}
              {dns.length > 0 && (
                <Group style={styles.dnsGroup}>
                  <ListRow
                    icon="dns"
                    title={t('email.dns_records', { count: dns.length })}
                    subtitle={showDns ? t('email.dns_hint') : undefined}
                    onPress={() => setShowDns((v) => !v)}
                    trailing={<Icon name={showDns ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textTertiary} />}
                  />
                  {showDns && dns.map((r, i) => (
                    <ListRow
                      key={`${r.type}-${r.name}-${i}`}
                      leading={
                        <View style={[styles.typeBadge, { backgroundColor: colors.surfaceSecondary }]}>
                          <Text style={[styles.typeText, { color: colors.text }]} numberOfLines={1}>{r.type}</Text>
                        </View>
                      }
                      title={r.name}
                      subtitle={`${r.priority != null ? `${r.priority} ` : ''}${r.content}`}
                      mono
                      onPress={() => {
                        Clipboard.setStringAsync(r.content);
                        Alert.alert(t('common.success'), t('email.dns_copied'));
                      }}
                      trailing={<Icon name="copy" size={16} color={colors.textTertiary} />}
                    />
                  ))}
                </Group>
              )}

              {/* Rules — tap a rule to edit it */}
              <SectionHeader title={t('email.rules')} />
              {rules.length === 0 ? (
                <EmptyState icon="mail" title={t('email.no_rules')} message={t('email.no_rules_message')} />
              ) : (
                <Group>
                  {rules.map((r) => (
                    <ListRow
                      key={r.id}
                      icon={actionIcon(r.actions[0])}
                      title={ruleLabel(r)}
                      subtitle={actionLabel(r.actions[0])}
                      onPress={() => openEditRule(r)}
                      trailing={
                        <View style={styles.rowTrailing}>
                          {toggle(r.enabled, (v) => toggleRule(r, v))}
                          {trash(() => deleteRule(r))}
                        </View>
                      }
                    />
                  ))}
                </Group>
              )}

              {/* Catch-all */}
              {catchAll && (
                <>
                  <SectionHeader title={t('email.catch_all')} />
                  <Group>
                    <ListRow
                      icon={actionIcon(catchAll.actions[0])}
                      title={t('email.catch_all_desc')}
                      subtitle={actionLabel(catchAll.actions[0])}
                      onPress={openCatchAll}
                      trailing={toggle(catchAll.enabled, toggleCatchAll)}
                    />
                  </Group>
                </>
              )}

              {/* Destination addresses */}
              <SectionHeader
                title={t('email.destinations')}
                action={
                  <TouchableOpacity
                    onPress={() => setShowAddDest(true)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={t('email.add_destination')}
                  >
                    <Icon name="plus" size={20} color={colors.primary} />
                  </TouchableOpacity>
                }
              />
              {addresses.length === 0 ? (
                <EmptyState icon="user" title={t('email.no_destinations')} message={t('email.no_destinations_message')} />
              ) : (
                <Group>
                  {addresses.map((a) => (
                    <ListRow
                      key={a.id}
                      icon="user"
                      title={a.email}
                      trailing={
                        <View style={styles.rowTrailing}>
                          <Badge
                            label={a.verified ? t('email.verified') : t('email.pending')}
                            variant={a.verified ? 'success' : 'warning'}
                          />
                          {trash(() => deleteDestination(a))}
                        </View>
                      }
                    />
                  ))}
                </Group>
              )}

              {/* Turn routing off */}
              <Group style={styles.disableGroup}>
                <TouchableOpacity style={styles.disableRow} onPress={handleDisable} activeOpacity={0.7}>
                  <Icon name="power" size={16} color={colors.error} />
                  <Text style={[styles.disableText, { color: colors.error }]}>{t('email.disable')}</Text>
                </TouchableOpacity>
              </Group>
            </>
          )}
        </ScrollView>

        {routingOn && <Fab label={t('email.add_rule')} onPress={openNewRule} />}
      </View>

      {/* Rule editor */}
      <Sheet
        visible={showRule}
        onClose={() => setShowRule(false)}
        title={editing ? t('email.edit_rule') : t('email.add_rule')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitRule}
            loading={saving}
            disabled={!canSaveRule}
          />
        }
      >
        <FieldLabel>{t('email.custom_address')}</FieldLabel>
        {/* Field cannot show the "@domain" suffix, so this one input is laid out here. */}
        <View style={[styles.addrRow, styles.control, { borderColor: colors.border, backgroundColor: colors.surface }]}>
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
            <Text style={[styles.addrSuffix, { color: colors.textSecondary }]} numberOfLines={1}>@{settings?.name}</Text>
          )}
        </View>

        <FieldLabel>{t('email.action')}</FieldLabel>
        {actionPicker(action, setAction, workers.length > 0)}

        {action === 'forward' && (
          <>
            <FieldLabel>{t('email.forward_to')}</FieldLabel>
            {destPicker(dests, toggleDest)}
          </>
        )}

        {action === 'worker' && (
          <>
            <FieldLabel>{t('email.worker_script')}</FieldLabel>
            {checkList(workers, (w) => workerName === w, setWorkerName)}
          </>
        )}

        {action === 'drop' && (
          <View style={{ marginTop: Spacing.md }}>{hint(t('email.drop_hint'))}</View>
        )}
      </Sheet>

      {/* Catch-all editor */}
      <Sheet
        visible={showCatchAll}
        onClose={() => setShowCatchAll(false)}
        title={t('email.catch_all')}
        footer={
          <Button
            title={t('common.save')}
            onPress={() => saveCatchAll(true)}
            loading={saving}
            disabled={caAction === 'forward' && caDests.length === 0}
          />
        }
      >
        {hint(t('email.catch_all_hint'))}

        <FieldLabel>{t('email.action')}</FieldLabel>
        {actionPicker(caAction, setCaAction, false)}

        {caAction === 'forward' && (
          <>
            <FieldLabel>{t('email.forward_to')}</FieldLabel>
            {destPicker(caDests, toggleCaDest)}
          </>
        )}
      </Sheet>

      {/* Add destination */}
      <Sheet
        visible={showAddDest}
        onClose={() => setShowAddDest(false)}
        title={t('email.add_destination')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitDestination}
            loading={saving}
            disabled={!newDest.includes('@')}
          />
        }
      >
        <Field
          label={t('email.destination_email')}
          placeholder="you@example.com"
          value={newDest}
          onChangeText={setNewDest}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },

  enableCard: { alignItems: 'center', gap: Spacing.md, padding: Spacing.xxl },
  enableTitle: { fontSize: FontSize.lg, fontWeight: '500', textAlign: 'center' },
  enableSub: { fontSize: FontSize.sm, lineHeight: 19, textAlign: 'center' },

  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  heroBody: { flex: 1, gap: 4 },
  heroName: { fontSize: FontSize.lg, fontWeight: '500', letterSpacing: -0.2 },
  heroMeta: { fontSize: FontSize.xs },

  dnsGroup: { marginTop: Spacing.sm },
  typeBadge: {
    width: 52,
    height: 30,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3 },

  rowTrailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },

  disableGroup: { marginTop: Spacing.xl },
  disableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
  },
  disableText: { fontSize: FontSize.md, fontWeight: '500' },

  // Sheets
  control: { marginTop: 6 },
  hint: { fontSize: FontSize.sm, lineHeight: 18 },
  addrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
  },
  addrInput: { flex: 1, fontSize: FontSize.md, paddingVertical: 11 },
  addrSuffix: { fontSize: FontSize.sm, flexShrink: 1 },
});
