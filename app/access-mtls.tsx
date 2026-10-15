import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Alert, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Banner, Fab, Field, Group, ListRow, ToggleRow, ValueRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import type { AccessMtlsCertificate, AccessMtlsHostnameSettings } from '@/services/cloudflare';
import { usePremium } from '@/services/premium';
import { PremiumPaywall } from '@/components/ui/premium-gate';

const parseHostnames = (text: string) => text.split(/[\s,]+/).map((h) => h.trim()).filter(Boolean);

export default function AccessMtlsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = usePremium();

  const [certs, setCerts] = useState<AccessMtlsCertificate[]>([]);
  // null = the settings call failed (often a scoped-token 403); hide that section.
  const [settings, setSettings] = useState<AccessMtlsHostnameSettings[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AccessMtlsCertificate | null>(null);
  const [name, setName] = useState('');
  const [pem, setPem] = useState('');
  const [hostnames, setHostnames] = useState('');
  const [saving, setSaving] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';
  const fmtDate = (d?: string) => (d ? new Date(d).toLocaleDateString() : '-');

  const fetchAll = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    const [c, s] = await Promise.allSettled([
      api.getAccessMtlsCertificates(accountId),
      api.getAccessMtlsHostnameSettings(accountId),
    ]);
    if (c.status === 'fulfilled') {
      setCerts(c.value.result ?? []);
      setError(null);
    } else {
      setError(errMsg(c.reason));
    }
    setSettings(s.status === 'fulfilled' ? s.value.result ?? [] : null);
    setLoading(false);
    setRefreshing(false);
  }, [accountId, premium]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openCreate = () => {
    setEditing(null);
    setName('');
    setPem('');
    setHostnames('');
    setShowForm(true);
  };

  const openEdit = (cert: AccessMtlsCertificate) => {
    setEditing(cert);
    setName(cert.name);
    setPem('');
    setHostnames((cert.associated_hostnames ?? []).join('\n'));
    setShowForm(true);
  };

  const canSave = editing ? true : !!name.trim() && !!pem.trim();

  const submit = async () => {
    if (!accountId || !canSave) return;
    const hosts = parseHostnames(hostnames);
    setSaving(true);
    try {
      if (editing) {
        const id = editing.id;
        const res = await api.updateAccessMtlsCertificate(accountId, id, {
          associated_hostnames: hosts,
          ...(name.trim() ? { name: name.trim() } : {}),
        });
        if (res.result) setCerts((prev) => prev.map((x) => (x.id === id ? res.result : x)));
      } else {
        const res = await api.createAccessMtlsCertificate(accountId, {
          name: name.trim(),
          certificate: pem.trim(),
          ...(hosts.length ? { associated_hostnames: hosts } : {}),
        });
        if (res.result) setCerts((prev) => [...prev, res.result]);
      }
      setShowForm(false);
      // Hostname settings follow associated hostnames; reload them quietly.
      api.getAccessMtlsHostnameSettings(accountId).then((r) => setSettings(r.result ?? [])).catch(() => {});
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (cert: AccessMtlsCertificate) => {
    if (!accountId) return;
    Alert.alert(t('access_mtls.delete_title'), t('access_mtls.delete_confirm', { name: cert.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteAccessMtlsCertificate(accountId, cert.id);
            setCerts((prev) => prev.filter((x) => x.id !== cert.id));
            setShowForm(false);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const toggleSetting = async (
    hostname: string,
    key: 'china_network' | 'client_certificate_forwarding',
    value: boolean,
  ) => {
    if (!accountId || !settings) return;
    const prev = settings;
    const next = settings.map((s) => (s.hostname === hostname ? { ...s, [key]: value } : s));
    setSettings(next);
    try {
      const res = await api.updateAccessMtlsHostnameSettings(accountId, { settings: next });
      if (res.result) setSettings(res.result);
    } catch (e: any) {
      setSettings(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('access_mtls.title') }} />
        <PremiumPaywall />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('access_mtls.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {!!error && <Banner message={error} />}

          <SectionHeader title={t('access_mtls.certificates')} />
          {certs.length === 0 ? (
            <EmptyState icon="fingerprint" title={t('access_mtls.no_certs')} message={t('access_mtls.no_certs_message')} />
          ) : (
            certs.map((cert) => {
              const expired = !!cert.expires_on && new Date(cert.expires_on).getTime() < Date.now();
              const hosts = cert.associated_hostnames ?? [];
              return (
                <View
                  key={cert.id}
                  style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
                >
                  <ListRow
                    icon="fingerprint"
                    title={cert.name}
                    subtitle={hosts.length ? hosts.join(', ') : t('access_mtls.no_hostnames')}
                    meta={t('access_mtls.expires_on', { date: fmtDate(cert.expires_on) })}
                    onPress={() => openEdit(cert)}
                    chevron
                    trailing={expired ? <View><Badge label={t('access_mtls.expired')} variant="error" /></View> : undefined}
                  />
                </View>
              );
            })
          )}

          {settings !== null && (
            <>
              <SectionHeader title={t('access_mtls.hostname_settings')} />
              {settings.length === 0 ? (
                <Text style={[styles.note, { color: colors.textSecondary }]}>{t('access_mtls.no_settings')}</Text>
              ) : (
                settings.map((s) => (
                  <View key={s.hostname} style={styles.settingBlock}>
                    <Text style={[styles.hostLabel, { color: colors.textSecondary }]} numberOfLines={1}>{s.hostname}</Text>
                    <Group>
                      <ToggleRow
                        title={t('access_mtls.cert_forwarding')}
                        subtitle={t('access_mtls.cert_forwarding_sub')}
                        value={s.client_certificate_forwarding}
                        onValueChange={(v) => toggleSetting(s.hostname, 'client_certificate_forwarding', v)}
                      />
                      <ToggleRow
                        title={t('access_mtls.china_network')}
                        subtitle={t('access_mtls.china_network_sub')}
                        value={s.china_network}
                        onValueChange={(v) => toggleSetting(s.hostname, 'china_network', v)}
                      />
                    </Group>
                  </View>
                ))
              )}
            </>
          )}
        </ScrollView>

        <Fab label={t('access_mtls.add')} onPress={openCreate} />
      </View>

      <Sheet
        visible={showForm}
        onClose={() => setShowForm(false)}
        title={editing ? editing.name : t('access_mtls.add')}
        footer={<Button title={t('common.save')} onPress={submit} loading={saving} disabled={!canSave} />}
      >
        {!!editing && (
          <Group>
            {!!editing.fingerprint && <ValueRow label={t('access_mtls.fingerprint')} value={editing.fingerprint} mono />}
            <ValueRow label={t('access_mtls.expires')} value={fmtDate(editing.expires_on)} />
            <ValueRow label="ID" value={editing.id} mono />
          </Group>
        )}
        <Field
          label={t('access_mtls.name')}
          placeholder="Corporate device CA"
          value={name}
          onChangeText={setName}
        />
        {!editing && (
          <Field
            label={t('access_mtls.certificate')}
            placeholder="-----BEGIN CERTIFICATE-----"
            hint={t('access_mtls.certificate_hint')}
            value={pem}
            onChangeText={setPem}
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            mono
          />
        )}
        <Field
          label={t('access_mtls.hostnames')}
          placeholder="app.example.com"
          hint={t('access_mtls.hostnames_hint')}
          value={hostnames}
          onChangeText={setHostnames}
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          mono
        />
        {!!editing && (
          <Button
            title={t('common.delete')}
            variant="danger"
            onPress={() => confirmDelete(editing)}
            style={styles.spaced}
          />
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
  note: { fontSize: FontSize.sm, marginBottom: Spacing.sm },
  settingBlock: { marginBottom: Spacing.md },
  hostLabel: { fontSize: FontSize.sm, fontWeight: '600', marginBottom: Spacing.xs },
  spaced: { marginTop: Spacing.md },
});
