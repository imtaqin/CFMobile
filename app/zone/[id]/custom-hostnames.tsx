import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { CustomHostname, DcvMethod } from '@/services/cloudflare';

const METHODS: DcvMethod[] = ['http', 'txt', 'email'];

const statusVariant = (s: string) =>
  s === 'active' ? 'success' : s.startsWith('pending') ? 'warning' : s === 'deleted' ? 'default' : 'error';

export default function CustomHostnamesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [hostnames, setHostnames] = useState<CustomHostname[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [hostname, setHostname] = useState('');
  const [originServer, setOriginServer] = useState('');
  const [method, setMethod] = useState<DcvMethod>('http');
  const [wildcard, setWildcard] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getCustomHostnames(id);
      setHostnames(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => {
    setHostname('');
    setOriginServer('');
    setMethod('http');
    setWildcard(false);
    setShowAdd(true);
  };

  const submitAdd = async () => {
    const h = hostname.trim();
    if (!h) return;
    setSaving(true);
    try {
      const res = await api.createCustomHostname(id, {
        hostname: h,
        custom_origin_server: originServer.trim() || undefined,
        ssl: { method, type: 'dv', wildcard },
      });
      if (res.result) setHostnames((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteHostname = (h: CustomHostname) => {
    Alert.alert(t('custom_hostnames.delete_title'), t('custom_hostnames.delete_confirm', { name: h.hostname }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteCustomHostname(id, h.id);
            setHostnames((prev) => prev.filter((x) => x.id !== h.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const copyValue = async (value?: string) => {
    if (!value) return;
    await Clipboard.setStringAsync(value);
    Alert.alert(t('common.success'), t('custom_hostnames.copied'));
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('custom_hostnames.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <View style={styles.content}>
            <SkeletonRows count={6} />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('custom_hostnames.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && (
            <View style={styles.banner}>
              <Banner message={error} />
            </View>
          )}

          {hostnames.length === 0 && !error ? (
            <EmptyState icon="globe" title={t('custom_hostnames.no_hostnames')} message={t('custom_hostnames.no_hostnames_message')} />
          ) : (
            hostnames.map((h) => {
              const expanded = expandedId === h.id;
              const rec = h.ownership_verification;
              return (
                <Group key={h.id} style={styles.item}>
                  <ListRow
                    icon="globe"
                    title={h.hostname}
                    subtitle={h.custom_origin_server ? `→ ${h.custom_origin_server}` : undefined}
                    mono
                    onPress={() => setExpandedId(expanded ? null : h.id)}
                    trailing={
                      <View style={styles.trailing}>
                        <Badge label={t(`custom_hostnames.status_${h.status}`, { defaultValue: h.status })} variant={statusVariant(h.status)} />
                        <TouchableOpacity
                          onPress={() => deleteHostname(h)}
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

                  {expanded && h.status !== 'active' && rec?.value ? (
                    <View style={styles.verify}>
                      <Text style={[styles.verifyLabel, { color: colors.textSecondary }]}>
                        {t('custom_hostnames.verification_record')}
                      </Text>
                      <TouchableOpacity style={styles.verifyRow} onPress={() => copyValue(rec.name)} activeOpacity={0.7}>
                        <Text style={[styles.verifyValue, { color: colors.text }]} numberOfLines={1}>{rec.type}: {rec.name}</Text>
                        <Icon name="copy" size={14} color={colors.textTertiary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.verifyRow} onPress={() => copyValue(rec.value)} activeOpacity={0.7}>
                        <Text style={[styles.verifyValue, { color: colors.text }]} numberOfLines={2}>{rec.value}</Text>
                        <Icon name="copy" size={14} color={colors.textTertiary} />
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  {h.verification_errors?.length ? (
                    <Text style={[styles.verifyError, { color: colors.error }]} numberOfLines={2}>
                      {h.verification_errors[0]}
                    </Text>
                  ) : null}
                </Group>
              );
            })
          )}
        </ScrollView>

        <Fab label={t('custom_hostnames.add_hostname')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('custom_hostnames.add_hostname')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!hostname.trim()}
          />
        }
      >
        <Field
          label={t('custom_hostnames.hostname')}
          placeholder="app.customer.com"
          value={hostname}
          onChangeText={setHostname}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
        <Field
          label={t('custom_hostnames.origin_server')}
          placeholder="fallback.yourapp.com"
          value={originServer}
          onChangeText={setOriginServer}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />

        <FieldLabel>{t('custom_hostnames.validation_method')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={METHODS.map((m) => ({ value: m, label: t(`custom_hostnames.method_${m}`) }))}
          value={method}
          onChange={setMethod}
        />

        <Group style={styles.sheetGroup}>
          <ToggleRow title={t('custom_hostnames.wildcard')} value={wildcard} onValueChange={setWildcard} />
        </Group>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  banner: { marginBottom: Spacing.md },
  item: { marginBottom: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  iconButton: { padding: 4 },
  verify: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, gap: Spacing.sm },
  verifyLabel: { fontSize: FontSize.sm },
  verifyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  verifyValue: { flex: 1, fontSize: FontSize.sm, fontFamily: 'monospace' },
  verifyError: { fontSize: FontSize.sm, lineHeight: 18, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  chips: { marginTop: 6 },
  sheetGroup: { marginTop: Spacing.lg },
});
