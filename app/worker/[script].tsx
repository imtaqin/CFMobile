import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Field, Group, IconCircle, ListRow, ToggleRow, ValueRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import {
  WorkerSettings, WorkerSecret, WorkerSchedule, WorkerDeployment, WorkerVersion,
  WorkerSubdomain,
} from '@/services/cloudflare';

/** A cron expression has exactly 5 whitespace-separated fields. */
const isValidCron = (s: string) => s.trim().split(/\s+/).length === 5;

/** ES-module Workers export a default handler; service-worker ones add a fetch listener. */
const detectModuleSyntax = (c: string) =>
  /\bexport\s+(default|\{|async|function|const|let|var|class)/.test(c) ||
  !/addEventListener\s*\(\s*['"](fetch|scheduled)['"]/.test(c);

export default function WorkerDetailScreen() {
  const { script } = useLocalSearchParams<{ script: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [settings, setSettings] = useState<WorkerSettings | null>(null);
  const [subdomain, setSubdomain] = useState<WorkerSubdomain | null>(null);
  const [secrets, setSecrets] = useState<WorkerSecret[]>([]);
  const [schedules, setSchedules] = useState<WorkerSchedule[]>([]);
  const [deployments, setDeployments] = useState<WorkerDeployment[]>([]);
  const [versions, setVersions] = useState<WorkerVersion[]>([]);
  const [content, setContent] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const [showEditor, setShowEditor] = useState(false);
  const [draftCode, setDraftCode] = useState('');
  const [moduleSyntax, setModuleSyntax] = useState(true);
  const [moduleName, setModuleName] = useState('worker.js');
  const [moduleCount, setModuleCount] = useState(1);

  const [showSecret, setShowSecret] = useState(false);
  const [secretName, setSecretName] = useState('');
  const [secretValue, setSecretValue] = useState('');

  const [showCron, setShowCron] = useState(false);
  const [cronExpr, setCronExpr] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId || !script) return;
    setError(null);
    try {
      const s = await api.getWorkerSettings(accountId, script);
      setSettings(s.result);
    } catch (e: any) {
      setError(errMsg(e));
    }

    const results = await Promise.allSettled([
      api.getWorkerSubdomain(accountId, script),
      api.getWorkerSecrets(accountId, script),
      api.getWorkerSchedules(accountId, script),
      api.getWorkerDeployments(accountId, script),
      api.getWorkerVersions(accountId, script),
    ]);
    if (results[0].status === 'fulfilled') setSubdomain(results[0].value.result);
    if (results[1].status === 'fulfilled') setSecrets(results[1].value.result ?? []);
    if (results[2].status === 'fulfilled') setSchedules(results[2].value.result?.schedules ?? []);
    if (results[3].status === 'fulfilled') setDeployments(results[3].value.result?.deployments ?? []);
    if (results[4].status === 'fulfilled') setVersions(results[4].value.result?.items ?? []);

    setLoading(false);
    setRefreshing(false);
  }, [accountId, script]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const loadCode = async () => {
    if (!accountId || !script) return;
    setShowCode(true);
    if (content !== null) return;
    try {
      const raw = await api.getWorkerContent(accountId, script);
      const { modules, multipart } = api.parseWorkerModules(raw);
      const main = modules[0];
      // Show the (single) module's own source, not the raw multipart envelope.
      setContent(main ? main.content : raw);
      setModuleCount(modules.length);
      if (main?.name) setModuleName(main.name);
      // A multipart bundle is an ES-module Worker; plain text we sniff.
      setModuleSyntax(multipart || detectModuleSyntax(main?.content ?? raw));
    } catch (e: any) {
      setContentError(errMsg(e));
    }
  };

  const copyCode = async () => {
    if (!content) return;
    await Clipboard.setStringAsync(content);
    Alert.alert(t('common.success'), t('worker.code_copied'));
  };

  const openEditor = () => {
    if (content == null) return;
    setDraftCode(content);
    setShowEditor(true);
  };

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/javascript', 'text/javascript', 'application/octet-stream', 'text/plain', '*/*'],
        copyToCacheDirectory: true,
      });
      if (res.canceled || !res.assets?.[0]) return;
      const text = await FileSystem.readAsStringAsync(res.assets[0].uri);
      setDraftCode(text);
      setModuleSyntax(detectModuleSyntax(text));
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const saveCode = () => {
    if (!accountId || !script || !draftCode.trim()) return;
    // Reassure: this writes only the code, so bindings and secrets stay put.
    Alert.alert(t('worker.save_code'), t('worker.save_code_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.save'), onPress: doSaveCode },
    ]);
  };

  const doSaveCode = async () => {
    if (!accountId || !script) return;
    setSaving(true);
    const fileUri = `${FileSystem.cacheDirectory}cf-worker-${Date.now()}.js`;
    try {
      await FileSystem.writeAsStringAsync(fileUri, draftCode);
      const fileName = /\.(js|mjs|ts)$/.test(moduleName) ? moduleName : 'worker.js';
      await api.updateWorkerContent(accountId, script, { fileUri, fileName, moduleSyntax });
      setContent(draftCode);
      setShowEditor(false);
      Alert.alert(t('common.success'), t('worker.code_saved'));
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      await FileSystem.deleteAsync(fileUri, { idempotent: true }).catch(() => {});
      setSaving(false);
    }
  };

  const toggleSubdomain = async (enabled: boolean) => {
    if (!accountId || !script) return;
    const prev = subdomain;
    setSubdomain({ enabled, previews_enabled: enabled });
    try {
      const res = await api.setWorkerSubdomain(accountId, script, enabled);
      setSubdomain(res.result);
    } catch (e: any) {
      setSubdomain(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const submitSecret = async () => {
    if (!accountId || !script) return;
    const name = secretName.trim();
    const text = secretValue;
    if (!name || !text) return;
    setSaving(true);
    try {
      await api.putWorkerSecret(accountId, script, { name, text });
      setSecrets((prev) => [...prev.filter((s) => s.name !== name), { name, type: 'secret_text' }]);
      setShowSecret(false);
      setSecretName('');
      setSecretValue('');
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteSecret = (secret: WorkerSecret) => {
    if (!accountId || !script) return;
    Alert.alert(t('worker.delete_secret'), t('worker.delete_secret_confirm', { name: secret.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteWorkerSecret(accountId, script, secret.name);
            setSecrets((prev) => prev.filter((s) => s.name !== secret.name));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const submitCron = async () => {
    if (!accountId || !script) return;
    const cron = cronExpr.trim();
    if (!isValidCron(cron)) return;
    setSaving(true);
    const next = [...schedules.map((s) => s.cron), cron];
    try {
      const res = await api.putWorkerSchedules(accountId, script, next);
      setSchedules(res.result?.schedules ?? []);
      setShowCron(false);
      setCronExpr('');
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteCron = (cron: string) => {
    if (!accountId || !script) return;
    Alert.alert(t('worker.delete_cron'), t('worker.delete_cron_confirm', { cron }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          const next = schedules.map((s) => s.cron).filter((c) => c !== cron);
          try {
            const res = await api.putWorkerSchedules(accountId, script, next);
            setSchedules(res.result?.schedules ?? []);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const deployVersion = (v: WorkerVersion) => {
    if (!accountId || !script) return;
    Alert.alert(
      t('worker.deploy_version'),
      t('worker.deploy_version_confirm', { number: v.number ?? '?' }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('worker.deploy'),
          onPress: async () => {
            try {
              await api.createWorkerDeployment(accountId, script, v.id);
              const res = await api.getWorkerDeployments(accountId, script);
              setDeployments(res.result?.deployments ?? []);
              Alert.alert(t('common.success'), t('worker.deploy_success'));
            } catch (e: any) {
              Alert.alert(t('common.error'), errMsg(e));
            }
          },
        },
      ]
    );
  };

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

  const addAction = (label: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress} hitSlop={10} accessibilityRole="button" accessibilityLabel={label}>
      <Icon name="plus" size={20} color={colors.primary} />
    </TouchableOpacity>
  );

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: script }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
      >
        {error && <Banner message={error} />}

        {/* Overview */}
        <SectionHeader title={t('worker.overview')} />
        <Group>
          <ValueRow label={t('worker.compatibility_date')} value={settings?.compatibility_date ?? '-'} />
          <ValueRow label={t('worker.usage_model')} value={settings?.usage_model ?? 'standard'} />
          {!!settings?.bindings?.length && (
            <View style={styles.bindings}>
              <Text style={[styles.bindingsLabel, { color: colors.textSecondary }]}>
                {t('worker.bindings', { count: settings.bindings.length })}
              </Text>
              <View style={styles.chipWrap}>
                {settings.bindings.map((b, i) => (
                  <View key={`${b.name}-${i}`} style={[styles.bindingChip, { backgroundColor: colors.surfaceSecondary }]}>
                    <Text style={[styles.bindingName, { color: colors.text }]}>{b.name}</Text>
                    <Text style={[styles.bindingType, { color: colors.textTertiary }]}> · {b.type}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {subdomain && (
            <ToggleRow
              title={t('worker.workers_dev')}
              subtitle={t('worker.workers_dev_hint')}
              value={subdomain.enabled}
              onValueChange={toggleSubdomain}
            />
          )}
        </Group>

        {/* Code */}
        <SectionHeader
          title={t('worker.code')}
          action={
            <TouchableOpacity onPress={loadCode} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('worker.view_code')}>
              <Icon name="code" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          }
        />
        {!showCode ? (
          <Group>
            <ListRow icon="code" title={t('worker.view_code')} onPress={loadCode} />
          </Group>
        ) : contentError ? (
          <Banner message={contentError} />
        ) : content === null ? (
          <Loading fullScreen={false} />
        ) : (
          <Card style={styles.codeCard}>
            <View style={styles.codeActions}>
              {moduleCount <= 1 && (
                <Button
                  title={t('worker.edit_code')}
                  variant="secondary"
                  size="sm"
                  icon={<Icon name="code" size={14} color={colors.text} />}
                  onPress={openEditor}
                />
              )}
              <Button
                title={t('common.copy')}
                variant="secondary"
                size="sm"
                icon={<Icon name="copy" size={14} color={colors.text} />}
                onPress={copyCode}
              />
            </View>
            {moduleCount > 1 && (
              <Text style={[styles.multiNote, { color: colors.textTertiary }]}>{t('worker.multi_module_note')}</Text>
            )}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text style={[styles.code, { color: colors.text, backgroundColor: colors.surfaceSecondary }]}>
                {content}
              </Text>
            </ScrollView>
          </Card>
        )}

        {/* Secrets */}
        <SectionHeader
          title={t('worker.secrets')}
          action={addAction(t('worker.add_secret'), () => setShowSecret(true))}
        />
        {secrets.length === 0 ? (
          <EmptyState icon="key" title={t('worker.no_secrets')} message={t('worker.no_secrets_message')} />
        ) : (
          <Group>
            {secrets.map((s) => (
              <View key={s.name} style={styles.monoRow}>
                <IconCircle name="key" />
                <Text style={[styles.monoText, { color: colors.text }]} numberOfLines={1}>{s.name}</Text>
                {trash(() => deleteSecret(s))}
              </View>
            ))}
          </Group>
        )}

        {/* Cron triggers */}
        <SectionHeader
          title={t('worker.cron_triggers')}
          action={addAction(t('worker.add_cron'), () => setShowCron(true))}
        />
        {schedules.length === 0 ? (
          <EmptyState icon="clock" title={t('worker.no_cron')} message={t('worker.no_cron_message')} />
        ) : (
          <Group>
            {schedules.map((s) => (
              <View key={s.cron} style={styles.monoRow}>
                <IconCircle name="clock" />
                <Text style={[styles.monoText, { color: colors.text }]} numberOfLines={1}>{s.cron}</Text>
                {trash(() => deleteCron(s.cron))}
              </View>
            ))}
          </Group>
        )}

        {/* Deployments / Versions */}
        <SectionHeader title={t('worker.deployments')} />
        {deployments.length === 0 ? (
          <EmptyState icon="cloud-upload" title={t('worker.no_deployments')} message={t('worker.no_deployments_message')} />
        ) : (
          <Group>
            {deployments.slice(0, 5).map((d) => (
              <ListRow
                key={d.id}
                icon="cloud-upload"
                title={d.annotations?.['workers/message'] || d.id}
                subtitle={`${d.author_email ?? d.source} · ${d.created_on ? new Date(d.created_on).toLocaleDateString() : ''}`}
              />
            ))}
          </Group>
        )}

        {versions.length > 0 && (
          <>
            <SectionHeader title={t('worker.versions')} />
            <Group>
              {versions.slice(0, 10).map((v) => (
                <ListRow
                  key={v.id}
                  leading={<View><Badge label={`#${v.number ?? '?'}`} /></View>}
                  title={v.metadata?.author_email ?? v.metadata?.source ?? v.id}
                  subtitle={v.metadata?.created_on ? new Date(v.metadata.created_on).toLocaleString() : undefined}
                  onPress={() => deployVersion(v)}
                />
              ))}
            </Group>
          </>
        )}

        {/* Live logs */}
        <Button
          title={t('worker.view_logs')}
          variant="secondary"
          onPress={() => router.push({ pathname: '/worker-tail/[script]' as any, params: { script } })}
          style={styles.logsBtn}
          icon={<Icon name="activity" size={16} color={colors.text} />}
        />
      </ScrollView>

      {/* Add secret */}
      <Sheet
        visible={showSecret}
        onClose={() => setShowSecret(false)}
        title={t('worker.add_secret')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitSecret}
            loading={saving}
            disabled={!secretName.trim() || !secretValue}
          />
        }
      >
        <Field
          label={t('worker.secret_name')}
          placeholder="API_KEY"
          value={secretName}
          onChangeText={setSecretName}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
        <Field
          label={t('worker.secret_value')}
          placeholder={t('worker.secret_value_placeholder')}
          value={secretValue}
          onChangeText={setSecretValue}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </Sheet>

      {/* Add cron */}
      <Sheet
        visible={showCron}
        onClose={() => setShowCron(false)}
        title={t('worker.add_cron')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitCron}
            loading={saving}
            disabled={!isValidCron(cronExpr)}
          />
        }
      >
        <Field
          label={t('worker.cron_expression')}
          placeholder="*/30 * * * *"
          value={cronExpr}
          onChangeText={setCronExpr}
          autoCapitalize="none"
          autoCorrect={false}
          hint={t('worker.cron_hint')}
          mono
        />
      </Sheet>

      {/* Edit code */}
      <Sheet
        visible={showEditor}
        onClose={() => setShowEditor(false)}
        title={t('worker.edit_code')}
        footer={
          <Button
            title={t('common.save')}
            onPress={saveCode}
            loading={saving}
            disabled={!draftCode.trim()}
          />
        }
      >
        <View style={styles.editorActions}>
          <Button
            title={t('worker.load_file')}
            variant="secondary"
            size="sm"
            icon={<Icon name="cloud-upload" size={14} color={colors.text} />}
            onPress={pickFile}
          />
        </View>
        <Group>
          <ToggleRow
            title={t('worker.module_syntax')}
            subtitle={t('worker.module_syntax_hint')}
            value={moduleSyntax}
            onValueChange={setModuleSyntax}
          />
        </Group>
        <Field
          label={t('worker.code')}
          value={draftCode}
          onChangeText={setDraftCode}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          textAlignVertical="top"
          multiline
          mono
          style={styles.editor}
        />
        <Text style={[styles.editorHint, { color: colors.textTertiary }]}>{t('worker.save_code_confirm')}</Text>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  bindings: { paddingHorizontal: Spacing.lg, paddingVertical: 13, gap: Spacing.sm },
  bindingsLabel: { fontSize: FontSize.sm },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  bindingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  bindingName: { fontSize: 12, fontFamily: 'monospace' },
  bindingType: { fontSize: FontSize.xs },
  codeCard: { gap: Spacing.sm },
  codeActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: Spacing.sm },
  multiNote: { fontSize: FontSize.xs },
  editorActions: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: Spacing.sm },
  editor: { minHeight: 300, fontSize: 12 },
  editorHint: { fontSize: FontSize.xs, marginTop: Spacing.sm },
  code: {
    fontSize: 12,
    fontFamily: 'monospace',
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  monoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
  },
  monoText: { flex: 1, fontSize: FontSize.sm, fontFamily: 'monospace' },
  logsBtn: { marginTop: Spacing.xl },
});
