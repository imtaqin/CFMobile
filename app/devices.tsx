import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Group, ListRow, ValueRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { ZeroTrustDevice } from '@/services/cloudflare';
import type { IconName } from '@/components/ui/icon';

const iconFor = (type?: string): IconName =>
  /ios|android|iphone|mobile/i.test(type ?? '') ? 'smartphone' : 'monitor';
const day = (iso?: string) => (iso ?? '').slice(0, 10);

export default function DevicesScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [devices, setDevices] = useState<ZeroTrustDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [available, setAvailable] = useState(true);
  const [selected, setSelected] = useState<ZeroTrustDevice | null>(null);
  const [busy, setBusy] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getZeroTrustDevices(accountId);
      setDevices(res.result ?? []);
      setAvailable(true);
    } catch {
      setDevices([]);
      setAvailable(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const revoke = (d: ZeroTrustDevice) => {
    if (!accountId) return;
    Alert.alert(t('devices.revoke'), t('devices.revoke_confirm', { name: d.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('devices.revoke'),
        style: 'destructive',
        onPress: async () => {
          setBusy(true);
          try {
            await api.revokeZeroTrustDevice(accountId, d.id);
            setDevices((prev) => prev.map((x) => (x.id === d.id ? { ...x, active_registrations: 0 } : x)));
            setSelected(null);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          } finally {
            setBusy(false);
          }
        },
      },
    ]);
  };

  const remove = (d: ZeroTrustDevice) => {
    if (!accountId) return;
    Alert.alert(t('devices.delete'), t('devices.delete_confirm', { name: d.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          setBusy(true);
          try {
            await api.deleteZeroTrustDevice(accountId, d.id);
            setDevices((prev) => prev.filter((x) => x.id !== d.id));
            setSelected(null);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          } finally {
            setBusy(false);
          }
        },
      },
    ]);
  };

  if (loading) return <Loading />;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xxxl }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
    >
      <Stack.Screen options={{ title: t('devices.title') }} />

      {!accountId || !available ? (
        <EmptyState icon="shield" title={t('devices.unavailable_title')} message={t('devices.unavailable_message')} />
      ) : devices.length === 0 ? (
        <EmptyState icon="smartphone" title={t('devices.empty_title')} message={t('devices.empty_message')} />
      ) : (
        <>
          <SectionHeader title={t('devices.enrolled', { count: devices.length })} />
          <Group>
            {devices.map((d) => (
              <ListRow
                key={d.id}
                icon={iconFor(d.device_type)}
                title={d.name}
                subtitle={[d.device_type, d.os_version, d.last_seen_user?.email].filter(Boolean).join(' · ') || undefined}
                meta={t('devices.last_seen', { date: day(d.last_seen_at) })}
                onPress={() => setSelected(d)}
              />
            ))}
          </Group>
        </>
      )}

      <Sheet visible={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ''}>
        {selected && (
          <>
            <Group>
              <ValueRow label={t('devices.type')} value={selected.device_type ?? '—'} />
              {!!selected.model && <ValueRow label={t('devices.model')} value={selected.model} />}
              {!!selected.manufacturer && <ValueRow label={t('devices.manufacturer')} value={selected.manufacturer} />}
              {!!selected.os_version && <ValueRow label={t('devices.os')} value={selected.os_version} />}
              {!!selected.client_version && <ValueRow label={t('devices.client')} value={selected.client_version} />}
              {!!selected.serial_number && <ValueRow label={t('devices.serial')} value={selected.serial_number} mono />}
              {!!selected.mac_address && <ValueRow label={t('devices.mac')} value={selected.mac_address} mono />}
              {!!selected.last_seen_user?.email && <ValueRow label={t('devices.user')} value={selected.last_seen_user.email} />}
              <ValueRow label={t('devices.active_registrations')} value={String(selected.active_registrations)} />
              <ValueRow label={t('devices.last_seen_label')} value={day(selected.last_seen_at)} />
            </Group>
            <View style={styles.actions}>
              {selected.active_registrations > 0 && (
                <Button title={t('devices.revoke')} variant="secondary" onPress={() => revoke(selected)} loading={busy} />
              )}
              <Button title={t('devices.delete')} variant="danger" onPress={() => remove(selected)} loading={busy} />
            </View>
          </>
        )}
      </Sheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  actions: { gap: Spacing.sm, marginTop: Spacing.lg },
});
