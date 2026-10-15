import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Banner, Fab, Field, Group, ListRow, ValueRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import type { AccessServiceToken, AccessServiceTokenWithSecret } from '@/services/cloudflare';
import { usePremium } from '@/services/premium';
import { PremiumPaywall } from '@/components/ui/premium-gate';

const DEFAULT_DURATION = '8760h';
const GRACE_MS = 24 * 60 * 60 * 1000;

export default function AccessServiceTokensScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = usePremium();

  const [tokens, setTokens] = useState<AccessServiceToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AccessServiceToken | null>(null);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [saving, setSaving] = useState(false);

  const [selected, setSelected] = useState<AccessServiceToken | null>(null);
  const [busy, setBusy] = useState(false);
  const [secret, setSecret] = useState<AccessServiceTokenWithSecret | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';
  const fmtDate = (d?: string) => (d ? new Date(d).toLocaleDateString() : '-');
  const isExpired = (tok: AccessServiceToken) => !!tok.expires_at && new Date(tok.expires_at).getTime() < Date.now();

  const fetchTokens = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getAccessServiceTokens(accountId);
      setTokens(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchTokens(); }, [fetchTokens]);

  const openCreate = () => {
    setEditing(null);
    setName('');
    setDuration(DEFAULT_DURATION);
    setShowForm(true);
  };

  const openEdit = (tok: AccessServiceToken) => {
    setSelected(null);
    setEditing(tok);
    setName(tok.name);
    setDuration(tok.duration ?? DEFAULT_DURATION);
    setShowForm(true);
  };

  const submit = async () => {
    if (!accountId) return;
    const n = name.trim();
    const d = duration.trim();
    if (!n) return;
    setSaving(true);
    try {
      if (editing) {
        const id = editing.id;
        const res = await api.updateAccessServiceToken(accountId, id, { name: n, ...(d ? { duration: d } : {}) });
        if (res.result) setTokens((prev) => prev.map((x) => (x.id === id ? res.result : x)));
        setShowForm(false);
      } else {
        const res = await api.createAccessServiceToken(accountId, { name: n, ...(d ? { duration: d } : {}) });
        setShowForm(false);
        if (res.result) {
          const { client_secret: _omit, ...rest } = res.result;
          setTokens((prev) => [...prev, rest]);
          setSecret(res.result);
        }
      }
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const refreshToken = async (tok: AccessServiceToken) => {
    if (!accountId) return;
    setBusy(true);
    try {
      const res = await api.refreshAccessServiceToken(accountId, tok.id);
      if (res.result) {
        setTokens((prev) => prev.map((x) => (x.id === tok.id ? res.result : x)));
        setSelected(res.result);
      }
      Alert.alert(t('access_tokens.refreshed'), t('access_tokens.refreshed_message', { date: fmtDate(res.result?.expires_at) }));
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  const doRotate = async (tok: AccessServiceToken, keepOld: boolean) => {
    if (!accountId) return;
    setBusy(true);
    try {
      const body = keepOld ? { previous_client_secret_expires_at: new Date(Date.now() + GRACE_MS).toISOString() } : {};
      const res = await api.rotateAccessServiceToken(accountId, tok.id, body);
      setSelected(null);
      if (res.result) setSecret(res.result);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  const confirmRotate = (tok: AccessServiceToken) => {
    Alert.alert(t('access_tokens.rotate_title'), t('access_tokens.rotate_confirm', { name: tok.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('access_tokens.rotate_keep_old'), onPress: () => doRotate(tok, true) },
      { text: t('access_tokens.rotate_now'), style: 'destructive', onPress: () => doRotate(tok, false) },
    ]);
  };

  const confirmDelete = (tok: AccessServiceToken) => {
    if (!accountId) return;
    Alert.alert(t('access_tokens.delete_title'), t('access_tokens.delete_confirm', { name: tok.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteAccessServiceToken(accountId, tok.id);
            setTokens((prev) => prev.filter((x) => x.id !== tok.id));
            setSelected(null);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const copy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert(t('access_tokens.copied'));
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('access_tokens.title') }} />
        <PremiumPaywall />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('access_tokens.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchTokens(); }} tintColor={colors.primary} />}
        >
          {!!error && <Banner message={error} />}

          <SectionHeader title={t('access_tokens.tokens')} />
          {tokens.length === 0 ? (
            <EmptyState icon="key" title={t('access_tokens.no_tokens')} message={t('access_tokens.no_tokens_message')} />
          ) : (
            tokens.map((tok) => (
              <View
                key={tok.id}
                style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              >
                <ListRow
                  icon="key"
                  title={tok.name}
                  subtitle={tok.client_id}
                  meta={t('access_tokens.expires_on', { date: fmtDate(tok.expires_at) })}
                  mono
                  onPress={() => setSelected(tok)}
                  chevron
                  trailing={isExpired(tok) ? <View><Badge label={t('access_tokens.expired')} variant="error" /></View> : undefined}
                />
              </View>
            ))
          )}
        </ScrollView>

        <Fab label={t('access_tokens.add')} onPress={openCreate} />
      </View>

      {/* Token actions */}
      <Sheet visible={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {!!selected && (
          <>
            <Group>
              <ValueRow label={t('access_tokens.client_id')} value={selected.client_id} mono />
              <ValueRow label={t('access_tokens.duration')} value={selected.duration ?? '-'} mono />
              <ValueRow label={t('access_tokens.expires')} value={fmtDate(selected.expires_at)} />
              <ValueRow label={t('access_tokens.last_seen')} value={fmtDate(selected.last_seen_at)} />
              <ValueRow label={t('access_tokens.created')} value={fmtDate(selected.created_at)} />
            </Group>
            <Group style={styles.spaced}>
              <ListRow icon="copy" title={t('access_tokens.copy_client_id')} onPress={() => copy(selected.client_id)} />
              <ListRow icon="edit" title={t('access_tokens.edit')} onPress={() => openEdit(selected)} />
              <ListRow
                icon="refresh"
                title={t('access_tokens.refresh')}
                subtitle={t('access_tokens.refresh_sub')}
                onPress={busy ? undefined : () => refreshToken(selected)}
              />
              <ListRow
                icon="cached"
                title={t('access_tokens.rotate')}
                subtitle={t('access_tokens.rotate_sub')}
                onPress={busy ? undefined : () => confirmRotate(selected)}
              />
            </Group>
            <Button
              title={t('common.delete')}
              variant="danger"
              onPress={() => confirmDelete(selected)}
              style={styles.spaced}
            />
          </>
        )}
      </Sheet>

      {/* Create / edit */}
      <Sheet
        visible={showForm}
        onClose={() => setShowForm(false)}
        title={editing ? t('access_tokens.edit') : t('access_tokens.add')}
        footer={<Button title={t('common.save')} onPress={submit} loading={saving} disabled={!name.trim()} />}
      >
        <Field
          label={t('access_tokens.name')}
          placeholder="CI deploy bot"
          value={name}
          onChangeText={setName}
        />
        <Field
          label={t('access_tokens.duration')}
          placeholder={DEFAULT_DURATION}
          hint={t('access_tokens.duration_hint')}
          value={duration}
          onChangeText={setDuration}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
      </Sheet>

      {/* One-time secret */}
      <Sheet
        visible={!!secret}
        onClose={() => setSecret(null)}
        title={t('access_tokens.secret_title')}
        footer={<Button title={t('common.dismiss')} onPress={() => setSecret(null)} />}
      >
        {!!secret && (
          <>
            <Banner tone="warning" message={t('access_tokens.secret_once')} />
            <Group style={styles.spaced}>
              <ValueRow label="CF-Access-Client-Id" value={secret.client_id} mono />
              <ValueRow label="CF-Access-Client-Secret" value={secret.client_secret} mono />
            </Group>
            <Group style={styles.spaced}>
              <ListRow icon="copy" title={t('access_tokens.copy_client_id')} onPress={() => copy(secret.client_id)} />
              <ListRow icon="copy" title={t('access_tokens.copy_client_secret')} onPress={() => copy(secret.client_secret)} />
              <ListRow
                icon="code"
                title={t('access_tokens.copy_headers')}
                onPress={() => copy(`CF-Access-Client-Id: ${secret.client_id}\nCF-Access-Client-Secret: ${secret.client_secret}`)}
              />
            </Group>
          </>
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
  spaced: { marginTop: Spacing.md },
});
