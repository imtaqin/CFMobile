import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { GatewayRule } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

const ACTIONS: GatewayRule['action'][] = ['allow', 'block', 'scan', 'noscan', 'safesearch', 'ytrestricted', 'on', 'off'];
const FILTER_TYPES = ['dns', 'http', 'l4', 'egress'];

export default function GatewayRulesScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = useUnlocked('gateway-rules');

  const [rules, setRules] = useState<GatewayRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<GatewayRule | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState<GatewayRule['action']>('block');
  const [filter, setFilter] = useState('dns');
  const [traffic, setTraffic] = useState('');
  const [enabled, setEnabled] = useState(true);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchRules = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getGatewayRules(accountId);
      setRules((res.result ?? []).slice().sort((a, b) => a.precedence - b.precedence));
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchRules(); }, [fetchRules]);

  const openAdd = () => {
    setEditing(null);
    setName('');
    setDescription('');
    setAction('block');
    setFilter('dns');
    setTraffic('');
    setEnabled(true);
    setShowAdd(true);
  };

  const openEdit = (rule: GatewayRule) => {
    setEditing(rule);
    setName(rule.name);
    setDescription(rule.description ?? '');
    setEnabled(rule.enabled);
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const n = name.trim();
    if (!n) return;
    setSaving(true);
    try {
      if (editing) {
        const res = await api.updateGatewayRule(accountId, editing.id, {
          name: n,
          description: description.trim() || undefined,
          enabled,
        });
        if (res.result) setRules((prev) => prev.map((r) => (r.id === editing.id ? res.result : r)));
      } else {
        const res = await api.createGatewayRule(accountId, {
          name: n,
          description: description.trim() || undefined,
          action,
          filters: [filter],
          traffic: traffic.trim() || undefined,
          enabled,
        });
        if (res.result) setRules((prev) => [...prev, res.result]);
      }
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const toggleEnabled = async (rule: GatewayRule, value: boolean) => {
    if (!accountId) return;
    setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, enabled: value } : r)));
    try {
      await api.updateGatewayRule(accountId, rule.id, { enabled: value });
    } catch (e: any) {
      setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, enabled: !value } : r)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deleteRule = (rule: GatewayRule) => {
    if (!accountId) return;
    Alert.alert(t('gateway_rules.delete_title'), t('gateway_rules.delete_confirm', { name: rule.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteGatewayRule(accountId, rule.id);
            setRules((prev) => prev.filter((r) => r.id !== rule.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('gateway_rules.title') }} />
        <PremiumPaywall feature="gateway-rules" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('gateway_rules.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchRules(); }} tintColor={colors.primary} />}
        >
          {!!error && <Banner message={error} />}

          <SectionHeader title={t('gateway_rules.rules')} />
          {rules.length === 0 ? (
            <EmptyState icon="shield" title={t('gateway_rules.no_rules')} message={t('gateway_rules.no_rules_message')} />
          ) : (
            rules.map((rule) => (
              // The whole card opens the editor; the switch and the trash icon act on their own.
              <TouchableOpacity
                key={rule.id}
                activeOpacity={0.7}
                onPress={() => openEdit(rule)}
                style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              >
                <ListRow
                  icon="shield"
                  title={rule.name}
                  trailing={
                    <>
                      <Switch
                        value={rule.enabled}
                        onValueChange={(v) => toggleEnabled(rule, v)}
                        trackColor={{ true: colors.primary, false: colors.border }}
                        thumbColor="#FFF"
                      />
                      <TouchableOpacity
                        onPress={() => deleteRule(rule)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.delete')}
                      >
                        <Icon name="trash" size={16} color={colors.textTertiary} />
                      </TouchableOpacity>
                    </>
                  }
                />
                <View style={styles.badges}>
                  <Badge label={rule.action} />
                  {!!rule.filters?.[0] && <Badge label={rule.filters[0]} variant="default" />}
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        <Fab label={t('gateway_rules.add_rule')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={editing ? t('gateway_rules.edit_rule') : t('gateway_rules.add_rule')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!name.trim()}
          />
        }
      >
        <Field label={t('gateway_rules.name')} value={name} onChangeText={setName} />
        <Field label={t('gateway_rules.description')} value={description} onChangeText={setDescription} />

        {!editing && (
          <>
            <FieldLabel>{t('gateway_rules.action')}</FieldLabel>
            <ChipRow
              wrap
              style={styles.chips}
              options={ACTIONS.map((a) => ({ value: a, label: a }))}
              value={action}
              onChange={setAction}
            />

            <FieldLabel>{t('gateway_rules.filter')}</FieldLabel>
            <ChipRow
              wrap
              style={styles.chips}
              options={FILTER_TYPES.map((f) => ({ value: f, label: f }))}
              value={filter}
              onChange={setFilter}
            />

            <Field
              label={t('gateway_rules.traffic_expr')}
              placeholder='any(dns.domains[*] == "example.com")'
              value={traffic}
              onChangeText={setTraffic}
              autoCapitalize="none"
              autoCorrect={false}
              multiline
              mono
            />
          </>
        )}

        <Group style={styles.enabledGroup}>
          <ToggleRow title={t('gateway_rules.enabled')} value={enabled} onValueChange={setEnabled} />
        </Group>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
  // Lines up with the row text: row padding + icon circle + gap.
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    paddingLeft: Spacing.lg + 36 + Spacing.md,
    paddingRight: Spacing.lg,
    paddingBottom: 13,
    marginTop: -5,
  },
  chips: { marginTop: 6 },
  enabledGroup: { marginTop: Spacing.lg },
});
