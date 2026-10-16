import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Banner, Fab, Field, ListRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { InfraTarget } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function InfraTargetsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = useUnlocked('infra-targets');

  const [targets, setTargets] = useState<InfraTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editing, setEditing] = useState<InfraTarget | null>(null);
  const [hostname, setHostname] = useState('');
  const [ipv4, setIpv4] = useState('');
  const [ipv6, setIpv6] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchTargets = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getInfraTargets(accountId);
      setTargets(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchTargets(); }, [fetchTargets]);

  const openAdd = () => {
    setEditing(null);
    setHostname('');
    setIpv4('');
    setIpv6('');
    setShowEdit(true);
  };

  const openEdit = (target: InfraTarget) => {
    setEditing(target);
    setHostname(target.hostname);
    setIpv4(target.ip?.ipv4?.ip_addr ?? '');
    setIpv6(target.ip?.ipv6?.ip_addr ?? '');
    setShowEdit(true);
  };

  const submitEdit = async () => {
    if (!accountId) return;
    const h = hostname.trim();
    const v4 = ipv4.trim();
    const v6 = ipv6.trim();
    if (!h || (!v4 && !v6)) return;
    const ip: InfraTarget['ip'] = {};
    if (v4) ip.ipv4 = { ip_addr: v4 };
    if (v6) ip.ipv6 = { ip_addr: v6 };
    setSaving(true);
    try {
      if (editing) {
        const res = await api.updateInfraTarget(accountId, editing.id, { hostname: h, ip });
        if (res.result) setTargets((prev) => prev.map((t) => (t.id === editing.id ? res.result : t)));
      } else {
        const res = await api.createInfraTarget(accountId, { hostname: h, ip });
        if (res.result) setTargets((prev) => [...prev, res.result]);
      }
      setShowEdit(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteTarget = (target: InfraTarget) => {
    if (!accountId) return;
    Alert.alert(t('infra_targets.delete_title'), t('infra_targets.delete_confirm', { name: target.hostname }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteInfraTarget(accountId, target.id);
            setTargets((prev) => prev.filter((x) => x.id !== target.id));
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
        <Stack.Screen options={{ title: t('infra_targets.title') }} />
        <PremiumPaywall feature="infra-targets" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('infra_targets.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchTargets(); }} tintColor={colors.primary} />}
        >
          {!!error && <Banner message={error} />}

          <SectionHeader title={t('infra_targets.targets')} />
          {targets.length === 0 ? (
            <EmptyState icon="server" title={t('infra_targets.no_targets')} message={t('infra_targets.no_targets_message')} />
          ) : (
            targets.map((target) => (
              <View
                key={target.id}
                style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              >
                <ListRow
                  icon="server"
                  title={target.hostname}
                  subtitle={target.ip?.ipv4?.ip_addr ?? target.ip?.ipv6?.ip_addr ?? '—'}
                  mono
                  onPress={() => openEdit(target)}
                  trailing={
                    <TouchableOpacity
                      onPress={() => deleteTarget(target)}
                      hitSlop={10}
                      accessibilityRole="button"
                      accessibilityLabel={t('common.delete')}
                    >
                      <Icon name="trash" size={16} color={colors.textTertiary} />
                    </TouchableOpacity>
                  }
                />
              </View>
            ))
          )}
        </ScrollView>

        <Fab label={t('infra_targets.add_target')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showEdit}
        onClose={() => setShowEdit(false)}
        title={editing ? t('infra_targets.edit_target') : t('infra_targets.add_target')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitEdit}
            loading={saving}
            disabled={!hostname.trim() || (!ipv4.trim() && !ipv6.trim())}
          />
        }
      >
        <Field
          label={t('infra_targets.hostname')}
          placeholder="server-01"
          value={hostname}
          onChangeText={setHostname}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
        <Field
          label={t('infra_targets.ipv4')}
          placeholder="10.0.0.1"
          value={ipv4}
          onChangeText={setIpv4}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
        <Field
          label={t('infra_targets.ipv6')}
          placeholder="2001:db8::1"
          value={ipv6}
          onChangeText={setIpv6}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
});
