import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { TurnstileWidget, TurnstileMode } from '@/services/cloudflare';

const MODES: TurnstileMode[] = ['managed', 'non-interactive', 'invisible'];

export default function TurnstileScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [widgets, setWidgets] = useState<TurnstileWidget[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [domains, setDomains] = useState('');
  const [mode, setMode] = useState<TurnstileMode>('managed');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    setError(null);
    try {
      const res = await api.getTurnstileWidgets(accountId);
      setWidgets(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => {
    setName('');
    setDomains('');
    setMode('managed');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const n = name.trim();
    const domainList = domains.split(',').map((d) => d.trim()).filter(Boolean);
    if (!n || domainList.length === 0) return;
    setSaving(true);
    try {
      const res = await api.createTurnstileWidget(accountId, { name: n, domains: domainList, mode });
      if (res.result) {
        setWidgets((prev) => [...prev, res.result]);
        setShowAdd(false);
        if (res.result.secret) {
          Alert.alert(t('turnstile.secret_title'), t('turnstile.secret_shown_once', { secret: res.result.secret }));
        }
      }
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteWidget = (w: TurnstileWidget) => {
    if (!accountId) return;
    Alert.alert(t('turnstile.delete_title'), t('turnstile.delete_confirm', { name: w.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteTurnstileWidget(accountId, w.sitekey);
            setWidgets((prev) => prev.filter((x) => x.sitekey !== w.sitekey));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const rotateSecret = (w: TurnstileWidget) => {
    if (!accountId) return;
    Alert.alert(t('turnstile.rotate_title'), t('turnstile.rotate_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('turnstile.rotate'),
        onPress: async () => {
          try {
            const res = await api.rotateTurnstileSecret(accountId, w.sitekey, false);
            if (res.result?.secret) {
              Alert.alert(t('turnstile.secret_title'), t('turnstile.secret_shown_once', { secret: res.result.secret }));
            }
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const copySitekey = async (sitekey: string) => {
    await Clipboard.setStringAsync(sitekey);
    Alert.alert(t('common.success'), t('turnstile.sitekey_copied'));
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('turnstile.title') }} />
        <View style={[styles.container, styles.content, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <SkeletonHeading />
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('turnstile.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('turnstile.widgets')} />
          {widgets.length === 0 ? (
            <EmptyState icon="shield-check" title={t('turnstile.no_widgets')} message={t('turnstile.no_widgets_message')} />
          ) : (
            widgets.map((w) => (
              <Group key={w.sitekey} style={styles.widget}>
                <ListRow
                  icon="shield-check"
                  title={w.name}
                  subtitle={w.domains.join(', ')}
                  trailing={<View><Badge label={t(`turnstile.mode_${w.mode.replace('-', '_')}`, { defaultValue: w.mode })} /></View>}
                />
                <TouchableOpacity style={styles.sitekeyRow} onPress={() => copySitekey(w.sitekey)} activeOpacity={0.7}>
                  <Icon name="key" size={14} color={colors.textTertiary} />
                  <Text style={[styles.sitekey, { color: colors.textSecondary }]} numberOfLines={1}>{w.sitekey}</Text>
                  <Icon name="copy" size={14} color={colors.textTertiary} />
                </TouchableOpacity>
                <View style={styles.actionsRow}>
                  <Button
                    title={t('turnstile.rotate')}
                    variant="secondary"
                    size="sm"
                    icon={<Icon name="refresh" size={14} color={colors.text} />}
                    onPress={() => rotateSecret(w)}
                  />
                  <TouchableOpacity
                    onPress={() => deleteWidget(w)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.delete')}
                  >
                    <Icon name="trash" size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>
              </Group>
            ))
          )}
        </ScrollView>

        <Fab label={t('turnstile.add_widget')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('turnstile.add_widget')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!name.trim() || !domains.trim()}
          />
        }
      >
        <Field
          label={t('turnstile.name')}
          placeholder="login-form"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Field
          label={t('turnstile.domains')}
          placeholder="example.com, app.example.com"
          value={domains}
          onChangeText={setDomains}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FieldLabel>{t('turnstile.mode')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={MODES.map((m) => ({ value: m, label: t(`turnstile.mode_${m.replace('-', '_')}`) }))}
          value={mode}
          onChange={setMode}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  widget: { marginBottom: Spacing.sm },
  sitekeyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    minHeight: 44,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  sitekey: { flex: 1, fontSize: 12, fontFamily: 'monospace' },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
  },
  chips: { marginTop: 6 },
});
