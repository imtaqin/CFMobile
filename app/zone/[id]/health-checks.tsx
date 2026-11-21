import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert, Switch,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Banner, ChipRow, Fab, Field, FieldLabel } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { HealthCheck, HealthCheckType, HealthCheckStatus } from '@/services/cloudflare';

const TYPES: HealthCheckType[] = ['HTTP', 'HTTPS', 'TCP'];

const statusVariant = (s: HealthCheckStatus) =>
  s === 'healthy' ? 'success' : s === 'unhealthy' ? 'error' : s === 'suspended' ? 'default' : 'warning';

export default function HealthChecksScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [checks, setChecks] = useState<HealthCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState<HealthCheckType>('HTTPS');
  const [path, setPath] = useState('/');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getHealthChecks(id);
      setChecks(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleSuspended = async (check: HealthCheck, suspended: boolean) => {
    setChecks((prev) => prev.map((c) => (c.id === check.id ? { ...c, suspended } : c)));
    try {
      await api.updateHealthCheck(id, check.id, { suspended });
    } catch (e: any) {
      setChecks((prev) => prev.map((c) => (c.id === check.id ? { ...c, suspended: !suspended } : c)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deleteCheck = (check: HealthCheck) => {
    Alert.alert(t('health_checks.delete_title'), t('health_checks.delete_confirm', { name: check.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteHealthCheck(id, check.id);
            setChecks((prev) => prev.filter((c) => c.id !== check.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const openAdd = () => {
    setName('');
    setAddress('');
    setType('HTTPS');
    setPath('/');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    const n = name.trim();
    const a = address.trim();
    if (!n || !a) return;
    setSaving(true);
    try {
      const res = await api.createHealthCheck(id, {
        name: n,
        address: a,
        type,
        http_config: type !== 'TCP' ? { path: path.trim() || '/' } : undefined,
      });
      if (res.result) setChecks((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('health_checks.title') }} />
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
      <Stack.Screen options={{ title: t('health_checks.title') }} />
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

          {checks.length === 0 ? (
            <EmptyState icon="zap" title={t('health_checks.no_checks')} message={t('health_checks.no_checks_message')} />
          ) : (
            checks.map((c) => (
              <Card key={c.id} style={styles.checkCard}>
                <View style={styles.checkTop}>
                  <View style={styles.checkBody}>
                    <Text style={[styles.checkName, { color: colors.text }]} numberOfLines={1}>{c.name}</Text>
                    <Text style={[styles.checkAddr, { color: colors.textSecondary }]} numberOfLines={1}>
                      {c.address}{c.http_config?.path ? c.http_config.path : ''}
                    </Text>
                  </View>
                  <Switch
                    value={!c.suspended}
                    onValueChange={(v) => toggleSuspended(c, !v)}
                    trackColor={{ true: colors.primary, false: colors.border }}
                    thumbColor="#FFF"
                  />
                </View>

                {!!c.failure_reason && (
                  <Text style={[styles.checkFail, { color: colors.error }]} numberOfLines={2}>{c.failure_reason}</Text>
                )}

                <View style={[styles.checkFoot, { borderTopColor: colors.borderLight }]}>
                  <Badge label={t(`health_checks.status_${c.status}`, { defaultValue: c.status })} variant={statusVariant(c.status)} />
                  <Badge label={c.type} />
                  <Text style={[styles.metaText, { color: colors.textTertiary }]} numberOfLines={1}>
                    {t('health_checks.interval_sec', { count: c.interval })}
                  </Text>
                  <TouchableOpacity
                    onPress={() => deleteCheck(c)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.delete')}
                  >
                    <Icon name="trash" size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          )}
        </ScrollView>

        <Fab label={t('health_checks.add_check')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('health_checks.add_check')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!name.trim() || !address.trim()}
          />
        }
      >
        <Field
          label={t('health_checks.name')}
          placeholder="origin-primary"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Field
          label={t('health_checks.address')}
          placeholder="origin.example.com"
          value={address}
          onChangeText={setAddress}
          mono
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FieldLabel>{t('health_checks.type')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.typeChips}
          options={TYPES.map((tp) => ({ value: tp, label: tp }))}
          value={type}
          onChange={setType}
        />

        {type !== 'TCP' && (
          <Field
            label={t('health_checks.path')}
            placeholder="/health"
            value={path}
            onChangeText={setPath}
            mono
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  banner: { marginBottom: Spacing.md },
  checkCard: { marginBottom: Spacing.sm, gap: Spacing.md },
  checkTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  checkBody: { flex: 1, gap: 2 },
  checkName: { fontSize: FontSize.md, fontWeight: '500' },
  checkAddr: { fontSize: 12, fontFamily: 'monospace' },
  checkFail: { fontSize: FontSize.sm, lineHeight: 18 },
  checkFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  metaText: { flex: 1, fontSize: FontSize.xs },
  typeChips: { marginTop: 6 },
});
