import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { OriginCACertificate, CertificatePack, MtlsCertificate, OriginCARequestType } from '@/services/cloudflare';

const REQUEST_TYPES: OriginCARequestType[] = ['origin-rsa', 'origin-ecc'];

const packStatusVariant = (s: string) =>
  s === 'active' ? 'success' : s.startsWith('pending') ? 'warning' : s === 'expired' || s === 'deleted' ? 'error' : 'default';

export default function CertificatesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [originCerts, setOriginCerts] = useState<OriginCACertificate[]>([]);
  const [packs, setPacks] = useState<CertificatePack[]>([]);
  const [mtlsCerts, setMtlsCerts] = useState<MtlsCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [csr, setCsr] = useState('');
  const [hostnames, setHostnames] = useState('');
  const [requestType, setRequestType] = useState<OriginCARequestType>('origin-rsa');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getOriginCACertificates(id);
      setOriginCerts(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    }
    const tasks: Promise<any>[] = [api.getCertificatePacks(id)];
    if (accountId) tasks.push(api.getMtlsCertificates(accountId));
    const [pRes, mRes] = await Promise.allSettled(tasks);
    if (pRes.status === 'fulfilled') setPacks(pRes.value.result ?? []);
    if (mRes?.status === 'fulfilled') setMtlsCerts(mRes.value.result ?? []);
    setLoading(false);
    setRefreshing(false);
  }, [id, accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => {
    setCsr('');
    setHostnames('');
    setRequestType('origin-rsa');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    const csrValue = csr.trim();
    const hostList = hostnames.split(',').map((h) => h.trim()).filter(Boolean);
    if (!csrValue || hostList.length === 0) return;
    setSaving(true);
    try {
      const res = await api.createOriginCACertificate({ csr: csrValue, hostnames: hostList, request_type: requestType });
      if (res.result) setOriginCerts((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const revokeOriginCert = (cert: OriginCACertificate) => {
    Alert.alert(t('certificates.revoke_title'), t('certificates.revoke_confirm', { hosts: cert.hostnames.join(', ') }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('certificates.revoke'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.revokeOriginCACertificate(cert.id);
            setOriginCerts((prev) => prev.filter((c) => c.id !== cert.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const deletePack = (pack: CertificatePack) => {
    Alert.alert(t('certificates.delete_pack_title'), t('certificates.delete_pack_confirm', { hosts: pack.hosts.join(', ') }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteCertificatePack(id, pack.id);
            setPacks((prev) => prev.filter((p) => p.id !== pack.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const deleteMtlsCert = (cert: MtlsCertificate) => {
    if (!accountId) return;
    Alert.alert(t('certificates.delete_mtls_title'), t('certificates.delete_mtls_confirm', { name: cert.name ?? cert.id }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteMtlsCertificate(accountId, cert.id);
            setMtlsCerts((prev) => prev.filter((c) => c.id !== cert.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('certificates.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <View style={styles.content}>
            <SkeletonHeading />
            <SkeletonRows count={3} />
            <SkeletonHeading />
            <SkeletonRows count={3} />
          </View>
        </View>
      </>
    );
  }

  const trashButton = (onPress: () => void, label: string) => (
    <TouchableOpacity onPress={onPress} hitSlop={10} accessibilityRole="button" accessibilityLabel={label}>
      <Icon name="trash" size={16} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('certificates.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('certificates.origin_ca')} />
          {originCerts.length > 0 ? (
            <Group>
              {originCerts.map((c) => (
                <ListRow
                  key={c.id}
                  icon="lock"
                  title={c.hostnames.join(', ')}
                  subtitle={`${c.request_type} · ${c.expires_on ? new Date(c.expires_on).toLocaleDateString() : t('certificates.pending')}`}
                  trailing={trashButton(() => revokeOriginCert(c), t('certificates.revoke'))}
                />
              ))}
            </Group>
          ) : !error ? (
            <EmptyState icon="lock" title={t('certificates.no_origin_certs')} message={t('certificates.no_origin_certs_message')} />
          ) : null}

          <SectionHeader title={t('certificates.certificate_packs')} />
          {packs.length === 0 ? (
            <EmptyState icon="shield-check" title={t('certificates.no_packs')} message={t('certificates.no_packs_message')} />
          ) : (
            <Group>
              {packs.map((p) => (
                <ListRow
                  key={p.id}
                  icon="shield-check"
                  title={p.hosts.join(', ')}
                  subtitle={p.type}
                  trailing={
                    <View style={styles.trailing}>
                      <Badge label={t(`certificates.pack_status_${p.status}`, { defaultValue: p.status })} variant={packStatusVariant(p.status)} />
                      {trashButton(() => deletePack(p), t('common.delete'))}
                    </View>
                  }
                />
              ))}
            </Group>
          )}

          {accountId && (
            <>
              <SectionHeader title={t('certificates.mtls_certs')} />
              {mtlsCerts.length === 0 ? (
                <EmptyState icon="key" title={t('certificates.no_mtls_certs')} message={t('certificates.no_mtls_certs_message')} />
              ) : (
                <Group>
                  {mtlsCerts.map((c) => (
                    <ListRow
                      key={c.id}
                      icon="key"
                      title={c.name ?? c.id}
                      subtitle={c.type}
                      trailing={trashButton(() => deleteMtlsCert(c), t('common.delete'))}
                    />
                  ))}
                </Group>
              )}
            </>
          )}
        </ScrollView>

        <Fab label={t('certificates.add_origin_cert')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('certificates.add_origin_cert')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!csr.trim() || !hostnames.trim()}
          />
        }
      >
        <Field
          label={t('certificates.hostnames')}
          placeholder="example.com, *.example.com"
          value={hostnames}
          onChangeText={setHostnames}
          mono
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Field
          label={t('certificates.csr')}
          hint={t('certificates.csr_hint')}
          placeholder="-----BEGIN CERTIFICATE REQUEST-----..."
          value={csr}
          onChangeText={setCsr}
          multiline
          mono
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.csrInput}
        />

        <FieldLabel>{t('certificates.request_type')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.typeChips}
          options={REQUEST_TYPES.map((rt) => ({ value: rt, label: rt }))}
          value={requestType}
          onChange={setRequestType}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  csrInput: { minHeight: 120, fontSize: 12 },
  typeChips: { marginTop: 6 },
});
