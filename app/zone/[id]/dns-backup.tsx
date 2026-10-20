import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { HeaderButton } from '@/components/ui/header-button';
import { Loading } from '@/components/ui/loading';
import { SectionHeader } from '@/components/ui/section-header';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Group, ListRow, StatCard, ToggleRow } from '@/components/ui/kit';
import { PremiumPaywall } from '@/components/ui/premium-gate';
import { useTheme } from '@/hooks/use-theme';
import { useUnlocked } from '@/services/ad-reward';
import * as snapshots from '@/services/dns-snapshot';
import { FontSize, Spacing } from '@/constants/theme';

/**
 * Snapshot a zone's DNS, then compare and put it back.
 *
 * The compare step is the point: it names every record that moved before
 * anything is written, and the restore itself is one batch call.
 */
export default function DnsBackupScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const unlocked = useUnlocked('dns-backup');

  const [list, setList] = useState<snapshots.SnapshotMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState<snapshots.Snapshot | null>(null);
  const [diff, setDiff] = useState<snapshots.SnapshotDiff | null>(null);
  const [options, setOptions] = useState<snapshots.RestoreOptions>({
    restoreMissing: true,
    fixChanged: true,
    deleteExtra: false,
  });

  const zoneName = name ?? id;

  const refresh = useCallback(async () => {
    if (!unlocked) { setLoading(false); return; }
    setList(await snapshots.listSnapshots(id));
    setLoading(false);
  }, [id, unlocked]);

  useEffect(() => { refresh(); }, [refresh]);

  const fail = (e: any, fallback: string) =>
    setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? fallback);

  const take = async () => {
    setBusy(true);
    setError(null);
    try {
      const snap = await snapshots.takeSnapshot(id, zoneName);
      await refresh();
      Alert.alert(t('dns_backup.taken'), t('dns_backup.taken_message', { count: snap.records.length }));
    } catch (e: any) {
      fail(e, t('dns_backup.take_error'));
    } finally {
      setBusy(false);
    }
  };

  // Comparing reads the zone fresh — a snapshot is only useful against what is live now.
  const compare = async (meta: snapshots.SnapshotMeta) => {
    setBusy(true);
    setError(null);
    try {
      const snap = await snapshots.readSnapshot(meta.id);
      if (!snap) { setError(t('dns_backup.unreadable')); return; }
      const live = await snapshots.fetchAllRecords(id);
      setDiff(snapshots.diff(snap, live));
      setOpen(snap);
    } catch (e: any) {
      fail(e, t('dns_backup.compare_error'));
    } finally {
      setBusy(false);
    }
  };

  const restore = () => {
    if (!open || !diff) return;
    const p = snapshots.plan(diff, options);
    const total = snapshots.planSize(p);
    if (total === 0) {
      Alert.alert(t('dns_backup.nothing_title'), t('dns_backup.nothing_message'));
      return;
    }
    Alert.alert(
      t('dns_backup.restore_title'),
      t('dns_backup.restore_confirm', {
        create: p.posts.length,
        update: p.patches.length,
        remove: p.deletes.length,
      }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('dns_backup.restore_action'),
          style: p.deletes.length > 0 ? 'destructive' : 'default',
          onPress: async () => {
            setBusy(true);
            setError(null);
            try {
              await snapshots.applyPlan(id, p);
              setOpen(null);
              setDiff(null);
              Alert.alert(t('common.success'), t('dns_backup.restored', { count: total }));
            } catch (e: any) {
              fail(e, t('dns_backup.restore_error'));
            } finally {
              setBusy(false);
            }
          },
        },
      ],
    );
  };

  const share = async (snap: snapshots.Snapshot) => {
    setError(null);
    try {
      const uri = await snapshots.writeExport(snap);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/json', dialogTitle: t('dns_backup.share_title') });
      }
    } catch (e: any) {
      fail(e, t('dns_backup.share_error'));
    }
  };

  const importFile = async () => {
    const picked = await DocumentPicker.getDocumentAsync({
      type: ['application/json', 'application/octet-stream', '*/*'],
      copyToCacheDirectory: true,
    });
    if (picked.canceled || !picked.assets?.[0]) return;
    setBusy(true);
    setError(null);
    try {
      const body = await FileSystem.readAsStringAsync(picked.assets[0].uri);
      const snap = await snapshots.importSnapshot(body, id);
      if (!snap) { setError(t('dns_backup.not_a_snapshot')); return; }
      await refresh();
    } catch (e: any) {
      fail(e, t('dns_backup.import_error'));
    } finally {
      setBusy(false);
    }
  };

  const remove = (meta: snapshots.SnapshotMeta) => {
    Alert.alert(t('dns_backup.delete_title'), t('dns_backup.delete_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          await snapshots.deleteSnapshot(meta.id);
          refresh();
        },
      },
    ]);
  };

  if (!unlocked) {
    return (
      <>
        <Stack.Screen options={{ title: t('dns_backup.title') }} />
        <PremiumPaywall feature="dns-backup" />
      </>
    );
  }

  if (loading) return <Loading message={t('common.loading')} />;

  const stamp = (iso: string) => new Date(iso).toLocaleString();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('dns_backup.title'),
          headerRight: () => <HeaderButton icon="download" label={t('dns_backup.import')} onPress={importFile} />,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {error && <Banner message={error} />}

        <Text style={[styles.intro, { color: colors.textSecondary }]}>{t('dns_backup.intro')}</Text>

        <Button
          title={t('dns_backup.take')}
          onPress={take}
          loading={busy}
          disabled={busy}
          style={{ marginTop: Spacing.md }}
        />

        <SectionHeader title={t('dns_backup.saved')} />
        {list.length === 0 ? (
          <EmptyState icon="clock" title={t('dns_backup.none')} message={t('dns_backup.none_message')} />
        ) : (
          <Group>
            {list.map((meta) => (
              <ListRow
                key={meta.id}
                icon="clock"
                title={stamp(meta.takenAt)}
                subtitle={t('dns_backup.record_count', { count: meta.count })}
                onPress={() => compare(meta)}
                onLongPress={() => remove(meta)}
                meta={meta.zoneName !== zoneName ? t('dns_backup.from_zone', { zone: meta.zoneName }) : undefined}
              />
            ))}
          </Group>
        )}

        {list.length > 0 && (
          <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('dns_backup.hint')}</Text>
        )}
      </ScrollView>

      <Sheet
        visible={!!open && !!diff}
        onClose={() => { setOpen(null); setDiff(null); }}
        title={open ? stamp(open.takenAt) : undefined}
        footer={
          diff && !snapshots.isClean(diff) ? (
            <Button title={t('dns_backup.restore_action')} onPress={restore} loading={busy} disabled={busy} />
          ) : undefined
        }
      >
        {diff && (
          <>
            {snapshots.isClean(diff) ? (
              <EmptyState icon="check-circle" title={t('dns_backup.in_sync')} message={t('dns_backup.in_sync_message')} />
            ) : (
              <>
                <View style={styles.stats}>
                  <StatCard label={t('dns_backup.missing')} value={String(diff.missing.length)} style={styles.stat} />
                  <StatCard label={t('dns_backup.changed')} value={String(diff.changed.length)} style={styles.stat} />
                  <StatCard label={t('dns_backup.extra')} value={String(diff.extra.length)} style={styles.stat} />
                </View>

                <SectionHeader title={t('dns_backup.what_to_do')} />
                <Group>
                  <ToggleRow
                    title={t('dns_backup.opt_missing')}
                    subtitle={t('dns_backup.opt_missing_sub', { count: diff.missing.length })}
                    value={options.restoreMissing}
                    disabled={diff.missing.length === 0}
                    onValueChange={(v) => setOptions((o) => ({ ...o, restoreMissing: v }))}
                  />
                  <ToggleRow
                    title={t('dns_backup.opt_changed')}
                    subtitle={t('dns_backup.opt_changed_sub', { count: diff.changed.length })}
                    value={options.fixChanged}
                    disabled={diff.changed.length === 0}
                    onValueChange={(v) => setOptions((o) => ({ ...o, fixChanged: v }))}
                  />
                  <ToggleRow
                    title={t('dns_backup.opt_extra')}
                    subtitle={t('dns_backup.opt_extra_sub', { count: diff.extra.length })}
                    value={options.deleteExtra}
                    disabled={diff.extra.length === 0}
                    onValueChange={(v) => setOptions((o) => ({ ...o, deleteExtra: v }))}
                  />
                </Group>

                {diff.missing.length > 0 && (
                  <>
                    <SectionHeader title={t('dns_backup.missing')} />
                    <Group>
                      {diff.missing.slice(0, 20).map((r, i) => (
                        <ListRow
                          key={`m${i}`}
                          title={`${r.type}  ${r.name}`}
                          subtitle={r.content || undefined}
                          mono
                        />
                      ))}
                    </Group>
                  </>
                )}

                {diff.changed.length > 0 && (
                  <>
                    <SectionHeader title={t('dns_backup.changed')} />
                    <Group>
                      {diff.changed.slice(0, 20).map(({ live, snap }, i) => (
                        <ListRow
                          key={`c${i}`}
                          title={`${live.type}  ${live.name}`}
                          subtitle={t('dns_backup.drift', {
                            now: describe(live.ttl, live.proxied),
                            was: describe(snap.ttl ?? 1, snap.proxied ?? false),
                          })}
                          mono
                        />
                      ))}
                    </Group>
                  </>
                )}

                {diff.extra.length > 0 && (
                  <>
                    <SectionHeader title={t('dns_backup.extra')} />
                    <Group>
                      {diff.extra.slice(0, 20).map((r) => (
                        <ListRow key={r.id} title={`${r.type}  ${r.name}`} subtitle={r.content || undefined} mono />
                      ))}
                    </Group>
                  </>
                )}
              </>
            )}

            <Button
              title={t('dns_backup.share')}
              variant="secondary"
              onPress={() => open && share(open)}
              style={{ marginTop: Spacing.lg }}
            />
          </>
        )}
      </Sheet>
    </>
  );
}

/** "auto, proxied" — the two fields that drift most, in one short line. */
function describe(ttl: number, proxied: boolean): string {
  return `${ttl === 1 ? 'auto' : ttl}${proxied ? ', proxied' : ''}`;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  intro: { fontSize: FontSize.sm, lineHeight: 19 },
  hint: { fontSize: FontSize.xs, marginTop: Spacing.sm, paddingHorizontal: Spacing.xs },
  stats: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  stat: { flex: 1 },
});
