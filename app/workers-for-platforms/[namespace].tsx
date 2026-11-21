import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Field, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DispatchScript, DispatchScriptSecret } from '@/services/cloudflare';

export default function DispatchNamespaceScreen() {
  const { namespace } = useLocalSearchParams<{ namespace: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [scripts, setScripts] = useState<DispatchScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [detailScript, setDetailScript] = useState<DispatchScript | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [secrets, setSecrets] = useState<DispatchScriptSecret[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [secretName, setSecretName] = useState('');
  const [secretValue, setSecretValue] = useState('');
  const [savingSecret, setSavingSecret] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchScripts = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getDispatchScripts(accountId, namespace);
      setScripts(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, namespace]);

  useEffect(() => { fetchScripts(); }, [fetchScripts]);

  const openScript = async (script: DispatchScript) => {
    if (!accountId) return;
    setDetailScript(script);
    setDetailLoading(true);
    setContent(null);
    setSecrets([]);
    setSecretName('');
    setSecretValue('');
    try {
      const [contentRes, secretsRes] = await Promise.allSettled([
        api.getDispatchScriptContent(accountId, namespace, script.id),
        api.getDispatchScriptSecrets(accountId, namespace, script.id),
      ]);
      if (contentRes.status === 'fulfilled') setContent(contentRes.value);
      if (secretsRes.status === 'fulfilled') setSecrets(secretsRes.value.result ?? []);
    } finally {
      setDetailLoading(false);
    }
  };

  const addSecret = async () => {
    if (!accountId || !detailScript) return;
    const n = secretName.trim();
    const v = secretValue.trim();
    if (!n || !v) return;
    setSavingSecret(true);
    try {
      await api.putDispatchScriptSecret(accountId, namespace, detailScript.id, { name: n, text: v });
      setSecrets((prev) => [...prev.filter((s) => s.name !== n), { name: n, type: 'secret_text' }]);
      setSecretName('');
      setSecretValue('');
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSavingSecret(false);
    }
  };

  const deleteSecret = (name: string) => {
    if (!accountId || !detailScript) return;
    Alert.alert(t('wfp.delete_secret_title'), t('wfp.delete_secret_confirm', { name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteDispatchScriptSecret(accountId, namespace, detailScript.id, name);
            setSecrets((prev) => prev.filter((s) => s.name !== name));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const deleteScript = (script: DispatchScript) => {
    if (!accountId) return;
    Alert.alert(t('wfp.delete_script_title'), t('wfp.delete_script_confirm', { name: script.id }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteDispatchScript(accountId, namespace, script.id);
            setScripts((prev) => prev.filter((s) => s.id !== script.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const trash = (onPress: () => void) => (
    <TouchableOpacity onPress={onPress} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('common.delete')}>
      <Icon name="trash" size={16} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  const renderScript = ({ item }: { item: DispatchScript }) => (
    <Group style={styles.item}>
      <ListRow
        icon="code"
        title={item.id}
        onPress={() => openScript(item)}
        trailing={trash(() => deleteScript(item))}
      />
    </Group>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: namespace }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: namespace }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={scripts}
          keyExtractor={(item) => item.id}
          renderItem={renderScript}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchScripts(); }} tintColor={colors.primary} />}
          ListEmptyComponent={<EmptyState icon="code" title={error ? t('common.error') : t('wfp.no_scripts')} message={error ?? t('wfp.no_scripts_message')} />}
        />
      </View>

      <Sheet
        visible={!!detailScript}
        onClose={() => setDetailScript(null)}
        title={detailScript?.id}
        footer={detailLoading ? undefined : (
          <Button
            title={t('wfp.add_secret')}
            onPress={addSecret}
            loading={savingSecret}
            disabled={!secretName.trim() || !secretValue.trim()}
          />
        )}
      >
        {detailLoading ? <Loading fullScreen={false} /> : (
          <>
            <SectionHeader title={t('wfp.content')} />
            <View style={[styles.contentBox, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              <Text style={[styles.contentText, { color: colors.text }]} numberOfLines={12}>{content ?? '—'}</Text>
            </View>

            <SectionHeader title={t('wfp.secrets')} />
            {secrets.length === 0 ? (
              <Text style={[styles.note, { color: colors.textTertiary }]}>{t('wfp.no_secrets')}</Text>
            ) : (
              <Group>
                {secrets.map((s) => (
                  <ListRow
                    key={s.name}
                    icon="key"
                    title={s.name}
                    trailing={trash(() => deleteSecret(s.name))}
                  />
                ))}
              </Group>
            )}

            <Field
              label={t('wfp.secret_name')}
              placeholder="API_KEY"
              value={secretName}
              onChangeText={setSecretName}
              autoCapitalize="none"
              autoCorrect={false}
              mono
            />
            <Field
              label={t('wfp.secret_value')}
              placeholder="••••••"
              value={secretValue}
              onChangeText={setSecretValue}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
          </>
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { marginBottom: Spacing.sm },
  contentBox: { borderWidth: 1, borderRadius: Radius.md, padding: Spacing.md },
  contentText: { fontSize: FontSize.xs, fontFamily: 'monospace', lineHeight: 16 },
  note: { fontSize: FontSize.sm, paddingHorizontal: Spacing.xs },
});
