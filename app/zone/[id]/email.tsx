import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity,
  Alert, Switch, Modal, TextInput,
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
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { EmailRoutingSettings, EmailRoutingRule, DestinationAddress } from '@/services/cloudflare';

export default function EmailRoutingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [settings, setSettings] = useState<EmailRoutingSettings | null>(null);
  const [rules, setRules] = useState<EmailRoutingRule[]>([]);
  const [catchAll, setCatchAll] = useState<EmailRoutingRule | null>(null);
  const [addresses, setAddresses] = useState<DestinationAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add-rule modal
  const [showAdd, setShowAdd] = useState(false);
  const [customAddr, setCustomAddr] = useState('');
  const [destAddr, setDestAddr] = useState('');
  const [saving, setSaving] = useState(false);

  // Add-destination modal
  const [showAddDest, setShowAddDest] = useState(false);
  const [newDest, setNewDest] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const s = await api.getEmailRoutingSettings(id);
      setSettings(s.result);
      if (s.result?.enabled) {
        const [rRes, cRes] = await Promise.allSettled([
          api.getEmailRoutingRules(id),
          api.getEmailCatchAll(id),
        ]);
        if (rRes.status === 'fulfilled') {
          setRules((rRes.value.result ?? []).filter((r) => !r.matchers.some((m) => m.type === 'all')));
        }
        if (cRes.status === 'fulfilled') setCatchAll(cRes.value.result);
      }
      if (accountId) {
        try {
          const aRes = await api.getDestinationAddresses(accountId);
          setAddresses(aRes.result ?? []);
        } catch {
          // account-level perm may be missing
        }
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

  const toggleCatchAll = async (enabled: boolean) => {
    if (!catchAll) return;
    const dest = catchAll.actions[0]?.value?.[0] ?? addresses.find((a) => a.verified)?.email;
    if (enabled && !dest) {
      Alert.alert(t('common.error'), t('email.no_destination'));
      return;
    }
    const prev = catchAll;
    setCatchAll({ ...catchAll, enabled });
    try {
      await api.updateEmailCatchAll(id, {
        enabled,
        matchers: [{ type: 'all' }],
        actions: [{ type: 'forward', value: dest ? [dest] : [] }],
      });
    } catch (e: any) {
      setCatchAll(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const submitRule = async () => {
    const local = customAddr.trim();
    const dest = destAddr.trim();
    if (!local || !dest) return;
    const address = local.includes('@') ? local : `${local}@${settings?.name ?? ''}`;
    setSaving(true);
    try {
      const res = await api.createEmailRoutingRule(id, {
        name: `Forward ${address}`,
        enabled: true,
        matchers: [{ type: 'literal', field: 'to', value: address }],
        actions: [{ type: 'forward', value: [dest] }],
      });
      if (res.result) setRules((prev) => [...prev, res.result]);
      setShowAdd(false);
      setCustomAddr('');
      setDestAddr('');
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
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

  if (loading) return <Loading />;

  const ruleLabel = (r: EmailRoutingRule) => r.matchers[0]?.value ?? r.name;
  const ruleDest = (r: EmailRoutingRule) => r.actions[0]?.value?.[0] ?? (r.actions[0]?.type === 'drop' ? t('email.action_drop') : '-');

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
            {/* Status */}
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

            {/* Rules */}
            <SectionHeader
              title={t('email.rules')}
              action={
                <TouchableOpacity onPress={() => setShowAdd(true)} hitSlop={8}>
                  <Icon name="plus" size={20} color={colors.primary} />
                </TouchableOpacity>
              }
            />
            {rules.length === 0 ? (
              <EmptyState icon="mail" title={t('email.no_rules')} message={t('email.no_rules_message')} />
            ) : (
              rules.map((r) => (
                <Card key={r.id} style={styles.ruleCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.ruleAddr, { color: colors.text }]} numberOfLines={1}>{ruleLabel(r)}</Text>
                    <View style={styles.ruleDestRow}>
                      <Icon name="chevron-right" size={12} color={colors.textTertiary} />
                      <Text style={[styles.ruleDest, { color: colors.textSecondary }]} numberOfLines={1}>{ruleDest(r)}</Text>
                    </View>
                  </View>
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
                <SectionHeader title={t('email.catch_all')} />
                <Card style={styles.ruleCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.ruleAddr, { color: colors.text }]}>{t('email.catch_all_desc')}</Text>
                    <View style={styles.ruleDestRow}>
                      <Icon name="chevron-right" size={12} color={colors.textTertiary} />
                      <Text style={[styles.ruleDest, { color: colors.textSecondary }]} numberOfLines={1}>{ruleDest(catchAll)}</Text>
                    </View>
                  </View>
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
                </Card>
              ))
            )}
          </>
        )}
      </ScrollView>

      {/* Add rule modal */}
      <Modal visible={showAdd} transparent animationType="slide" onRequestClose={() => setShowAdd(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('email.add_rule')}</Text>
              <TouchableOpacity onPress={() => setShowAdd(false)} hitSlop={8}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
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
              <Text style={[styles.addrSuffix, { color: colors.textSecondary }]}>@{settings?.name}</Text>
            </View>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>{t('email.forward_to')}</Text>
            {addresses.filter((a) => a.verified).map((a) => (
              <TouchableOpacity
                key={a.id}
                style={[styles.destOption, {
                  borderColor: destAddr === a.email ? colors.primary : colors.border,
                  backgroundColor: destAddr === a.email ? colors.primary + '10' : 'transparent',
                }]}
                onPress={() => setDestAddr(a.email)}
              >
                <Text style={{ color: colors.text, fontSize: FontSize.sm }}>{a.email}</Text>
                {destAddr === a.email && <Icon name="check-circle" size={18} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            {addresses.filter((a) => a.verified).length === 0 && (
              <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('email.no_verified_hint')}</Text>
            )}
            <Button
              title={t('common.save')}
              onPress={submitRule}
              loading={saving}
              disabled={!customAddr.trim() || !destAddr}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        </View>
      </Modal>

      {/* Add destination modal */}
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
