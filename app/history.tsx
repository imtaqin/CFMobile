import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChangeDiff } from '@/components/ui/change-diff';
import { EmptyState } from '@/components/ui/empty-state';
import { HeaderButton } from '@/components/ui/header-button';
import { Loading } from '@/components/ui/loading';
import { Banner } from '@/components/ui/kit';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import {
  ChangeEntry, IpRuleSnapshot, SETTING_LABELS, WafRuleSnapshot, clearHistory, entryChanges, getHistory, markReverted,
} from '@/services/change-history';

const ACTION_KEYS: Record<ChangeEntry['action'], string> = {
  create: 'history.created',
  update: 'history.updated',
  delete: 'history.deleted',
};

/** Changes made from this app on this device, newest first, each with an undo. */
export default function HistoryScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [entries, setEntries] = useState<ChangeEntry[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => setEntries(await getHistory()), []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  // Undo puts the record back the way it was: restore the old values, recreate
  // a deleted record, or delete one that was created.
  const undo = async (entry: ChangeEntry) => {
    setBusyId(entry.id);
    try {
      const kind = entry.kind ?? 'dns';
      const waf = entry.valueBefore as WafRuleSnapshot | null;
      if (kind === 'setting' && entry.target) {
        await api.updateZoneSetting(entry.zoneId, entry.target, entry.valueBefore);
      } else if (kind === 'waf_rule' && entry.rulesetId) {
        if (entry.action === 'create' && entry.target) await api.deleteRulesetRule(entry.zoneId, entry.rulesetId, entry.target);
        else if (entry.action === 'update' && entry.target && waf) await api.updateRulesetRule(entry.zoneId, entry.rulesetId, entry.target, waf as any);
        else if (entry.action === 'delete' && waf) await api.createRulesetRule(entry.zoneId, entry.rulesetId, waf as any);
        else throw new Error(t('history.undo_failed'));
      } else if (kind === 'ip_rule') {
        if (entry.action === 'create' && entry.target) await api.deleteIPAccessRule(entry.zoneId, entry.target);
        else if (entry.action === 'delete' && entry.valueBefore) await api.createIPAccessRule(entry.zoneId, entry.valueBefore as IpRuleSnapshot as any);
        else throw new Error(t('history.undo_failed'));
      } else if (entry.action === 'update' && entry.recordId && entry.before) {
        await api.updateDnsRecord(entry.zoneId, entry.recordId, entry.before);
      } else if (entry.action === 'delete' && entry.before) {
        await api.createDnsRecord(entry.zoneId, entry.before);
      } else if (entry.action === 'create' && entry.recordId) {
        await api.deleteDnsRecord(entry.zoneId, entry.recordId);
      } else {
        throw new Error(t('history.undo_failed'));
      }
      await markReverted(entry.id);
      await load();
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('history.undo_failed'));
    } finally {
      setBusyId(null);
    }
  };

  const confirmUndo = (entry: ChangeEntry) => {
    Alert.alert(t('history.undo_title'), t(`history.undo_${entry.action}`, { name: titleOf(entry) }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('history.undo'), style: entry.action === 'create' ? 'destructive' : 'default', onPress: () => undo(entry) },
    ]);
  };

  const confirmClear = () => {
    Alert.alert(t('history.clear'), t('history.clear_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('history.clear'), style: 'destructive', onPress: async () => { await clearHistory(); await load(); } },
    ]);
  };

  /** One line naming what changed. */
  const titleOf = (entry: ChangeEntry): string => {
    const kind = entry.kind ?? 'dns';
    if (kind === 'setting') return SETTING_LABELS[entry.target ?? ''] ? t(SETTING_LABELS[entry.target!]) : entry.target ?? '';
    if (kind === 'waf_rule') {
      const r = (entry.valueAfter ?? entry.valueBefore) as WafRuleSnapshot | null;
      return `${t('history.kind_waf')}: ${r?.description || r?.expression || ''}`;
    }
    if (kind === 'ip_rule') {
      const r = (entry.valueAfter ?? entry.valueBefore) as IpRuleSnapshot | null;
      return `${t('history.kind_ip')}: ${r?.mode ?? ''} ${r?.configuration?.value ?? ''}`;
    }
    const record = entry.after ?? entry.before;
    return `${record?.type ?? ''} ${record?.name ?? ''}`;
  };

  if (entries === null) return <Loading />;

  return (
    <>
      <Stack.Screen
        options={{
          title: t('history.title'),
          headerRight: () => (entries.length ? <HeaderButton icon="trash" label={t('history.clear')} onPress={confirmClear} /> : null),
        }}
      />
      <FlatList
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.list}
        data={entries}
        keyExtractor={(e) => e.id}
        ListHeaderComponent={<View style={styles.note}><Banner tone="info" message={t('history.note')} /></View>}
        ListEmptyComponent={<EmptyState icon="clock" title={t('history.empty')} message={t('history.empty_sub')} />}
        renderItem={({ item }) => {
          const reverted = !!item.revertedAt;
          return (
            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              <View style={styles.head}>
                <Badge
                  label={t(ACTION_KEYS[item.action])}
                  variant={item.action === 'delete' ? 'error' : item.action === 'create' ? 'success' : 'default'}
                />
                {reverted && <Badge label={t('history.undone')} variant="warning" />}
                <Text style={[styles.time, { color: colors.textTertiary }]}>{new Date(item.at).toLocaleString()}</Text>
              </View>
              <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
                {titleOf(item)}
              </Text>
              {!!item.zoneName && <Text style={[styles.zone, { color: colors.textSecondary }]}>{item.zoneName}</Text>}
              <View style={styles.diff}>
                <ChangeDiff changes={entryChanges(item)} />
              </View>
              {!reverted && (
                <Button
                  title={t('history.undo')}
                  variant="secondary"
                  size="sm"
                  loading={busyId === item.id}
                  disabled={busyId !== null}
                  onPress={() => confirmUndo(item)}
                  style={styles.undo}
                />
              )}
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.md, flexGrow: 1 },
  note: { marginBottom: Spacing.xs },
  card: { borderWidth: 1, borderRadius: Radius.lg, padding: Spacing.lg },
  head: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap' },
  time: { fontSize: FontSize.xs, marginLeft: 'auto' },
  name: { fontSize: FontSize.md, fontWeight: '500', marginTop: Spacing.md, fontFamily: 'monospace' },
  zone: { fontSize: FontSize.sm, marginTop: 2 },
  diff: { marginTop: Spacing.md },
  undo: { marginTop: Spacing.md, alignSelf: 'flex-start' },
});
