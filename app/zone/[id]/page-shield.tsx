import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert, Switch } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonHeading, SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import {
  PageShieldSettings, PageShieldConnection, PageShieldCookie,
  PageShieldPolicy, PageShieldPolicyAction,
} from '@/services/cloudflare';

const ACTIONS: PageShieldPolicyAction[] = ['allow', 'log', 'add_reporting_directives'];

export default function PageShieldScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [settings, setSettings] = useState<PageShieldSettings | null>(null);
  const [connections, setConnections] = useState<PageShieldConnection[]>([]);
  const [cookies, setCookies] = useState<PageShieldCookie[]>([]);
  const [policies, setPolicies] = useState<PageShieldPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [description, setDescription] = useState('');
  const [expression, setExpression] = useState('');
  const [action, setAction] = useState<PageShieldPolicyAction>('log');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const s = await api.getPageShieldSettings(id);
      setSettings(s.result);
    } catch (e: any) {
      setError(errMsg(e));
    }
    const [cRes, kRes, pRes] = await Promise.allSettled([
      api.getPageShieldConnections(id),
      api.getPageShieldCookies(id),
      api.getPageShieldPolicies(id),
    ]);
    if (cRes.status === 'fulfilled') setConnections(cRes.value.result ?? []);
    if (kRes.status === 'fulfilled') setCookies(kRes.value.result ?? []);
    if (pRes.status === 'fulfilled') setPolicies(pRes.value.result ?? []);
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleEnabled = async (value: boolean) => {
    if (!settings) return;
    const prev = settings;
    setSettings({ ...settings, enabled: value });
    try {
      await api.updatePageShieldSettings(id, { enabled: value });
    } catch (e: any) {
      setSettings(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const openAdd = () => {
    setDescription('');
    setExpression('');
    setAction('log');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    const desc = description.trim();
    const expr = expression.trim();
    if (!desc || !expr) return;
    setSaving(true);
    try {
      const res = await api.createPageShieldPolicy(id, {
        description: desc,
        expression: expr,
        action,
        enabled: true,
        value: action === 'allow' ? 'allow' : action,
      });
      if (res.result) setPolicies((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const togglePolicy = async (policy: PageShieldPolicy, enabled: boolean) => {
    setPolicies((prev) => prev.map((p) => (p.id === policy.id ? { ...p, enabled } : p)));
    try {
      await api.updatePageShieldPolicy(id, policy.id, { enabled });
    } catch (e: any) {
      setPolicies((prev) => prev.map((p) => (p.id === policy.id ? { ...p, enabled: !enabled } : p)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deletePolicy = (policy: PageShieldPolicy) => {
    Alert.alert(t('page_shield.delete_policy_title'), t('page_shield.delete_policy_confirm', { name: policy.description }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deletePageShieldPolicy(id, policy.id);
            setPolicies((prev) => prev.filter((p) => p.id !== policy.id));
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
        <Stack.Screen options={{ title: t('page_shield.title') }} />
        <ScrollView
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
          accessibilityLabel={t('common.loading')}
        >
          <SkeletonHeading />
          <SkeletonRows count={1} avatar={false} />
          <SkeletonHeading />
          <SkeletonRows count={4} />
          <SkeletonHeading />
          <SkeletonRows count={3} />
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('page_shield.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          {settings && (
            <>
              <SectionHeader title={t('page_shield.settings')} />
              <Group>
                <ToggleRow
                  icon="shield"
                  title={t('page_shield.enabled')}
                  subtitle={t('page_shield.enabled_desc')}
                  value={settings.enabled}
                  onValueChange={toggleEnabled}
                />
              </Group>
            </>
          )}

          <SectionHeader title={t('page_shield.policies')} />
          {policies.length === 0 ? (
            <EmptyState icon="shield" title={t('page_shield.no_policies')} message={t('page_shield.no_policies_message')} />
          ) : (
            <Group>
              {policies.map((p) => (
                <ListRow
                  key={p.id}
                  title={p.description}
                  subtitle={p.expression}
                  mono
                  meta={t(`page_shield.action_${p.action}`, { defaultValue: p.action })}
                  trailing={
                    <View style={styles.trailing}>
                      <Switch
                        value={p.enabled}
                        onValueChange={(v) => togglePolicy(p, v)}
                        trackColor={{ true: colors.primary, false: colors.border }}
                        thumbColor="#FFF"
                      />
                      <TouchableOpacity
                        onPress={() => deletePolicy(p)}
                        hitSlop={10}
                        style={styles.iconButton}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.delete')}
                      >
                        <Icon name="trash" size={16} color={colors.textTertiary} />
                      </TouchableOpacity>
                    </View>
                  }
                />
              ))}
            </Group>
          )}

          <SectionHeader title={t('page_shield.connections', { count: connections.length })} />
          {connections.length === 0 ? (
            <EmptyState icon="link" title={t('page_shield.no_connections')} message={t('page_shield.no_connections_message')} />
          ) : (
            <Group>
              {connections.slice(0, 20).map((c) => (
                <ListRow
                  key={c.id}
                  icon="link"
                  iconTone={c.url_reported_malicious ? 'error' : 'neutral'}
                  title={c.host}
                  subtitle={c.url}
                  mono
                  trailing={c.url_reported_malicious ? <Badge label={t('page_shield.malicious')} variant="error" /> : undefined}
                />
              ))}
            </Group>
          )}

          <SectionHeader title={t('page_shield.cookies', { count: cookies.length })} />
          {cookies.length === 0 ? (
            <EmptyState icon="info" title={t('page_shield.no_cookies')} message={t('page_shield.no_cookies_message')} />
          ) : (
            <Group>
              {cookies.slice(0, 20).map((c) => (
                <ListRow
                  key={c.id}
                  icon="info"
                  title={c.name}
                  subtitle={c.host}
                  mono
                  trailing={<Badge label={c.type} />}
                />
              ))}
            </Group>
          )}
        </ScrollView>

        <Fab label={t('page_shield.add_policy')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('page_shield.add_policy')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!description.trim() || !expression.trim()}
          />
        }
      >
        <Field
          label={t('page_shield.description')}
          placeholder={t('page_shield.description_placeholder')}
          value={description}
          onChangeText={setDescription}
        />
        <Field
          label={t('page_shield.expression')}
          placeholder='(page_shield.url matches "cdn\\.example\\.com")'
          value={expression}
          onChangeText={setExpression}
          multiline
          mono
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FieldLabel>{t('page_shield.action')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={ACTIONS.map((a) => ({ value: a, label: t(`page_shield.action_${a}`) }))}
          value={action}
          onChange={setAction}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  iconButton: { padding: 4 },
  chips: { marginTop: 6 },
});
