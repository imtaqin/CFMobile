import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, ScrollView, RefreshControl, TouchableOpacity,
  Alert, TextInput, Modal, Switch, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { addChange, snapshot } from '@/services/change-history';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Skeleton, SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Card } from '@/components/ui/card';
import { HeaderButton } from '@/components/ui/header-button';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DNSRecord, DNSRecordType } from '@/services/types';

const RECORD_TYPES: DNSRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV', 'CAA'];

export default function DNSScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [records, setRecords] = useState<DNSRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [porting, setPorting] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [usage, setUsage] = useState<{ record_usage: number; record_quota: number | null } | null>(null);
  const [dnsSettings, setDnsSettings] = useState<api.DnsZoneSettings | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);

  const fetchRecords = useCallback(async () => {
    try {
      const res = await api.getDnsRecords(id, 1, filter, search || undefined);
      setRecords(res.result ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, filter, search]);

  const fetchExtra = useCallback(async () => {
    const [usageRes, settingsRes] = await Promise.allSettled([
      api.getDnsRecordUsage(id),
      api.getDnsSettings(id),
    ]);
    if (usageRes.status === 'fulfilled') setUsage(usageRes.value.result);
    if (settingsRes.status === 'fulfilled') setDnsSettings(settingsRes.value.result);
  }, [id]);

  useEffect(() => { fetchRecords(); fetchExtra(); }, [fetchRecords, fetchExtra]);

  const onRefresh = () => { setRefreshing(true); fetchRecords(); };

  const handleDelete = (record: DNSRecord) => {
    Alert.alert(
      t('dns.delete_title'),
      t('dns.delete_confirm', { name: record.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteDnsRecord(id, record.id);
              await addChange({
                zoneId: id, zoneName: record.zone_name, action: 'delete', recordId: record.id,
                before: snapshot(record), after: null,
              });
              setRecords((prev) => prev.filter((r) => r.id !== record.id));
            } catch {
              Alert.alert(t('common.error'), t('dns.delete_error'));
            }
          },
        },
      ]
    );
  };

  const handleExport = async () => {
    if (porting) return;
    setPorting(true);
    try {
      const bind = await api.exportDnsRecords(id);
      const fileUri = `${FileSystem.cacheDirectory}dns-records-${Date.now()}.txt`;
      await FileSystem.writeAsStringAsync(fileUri, bind);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { mimeType: 'text/plain', dialogTitle: t('dns.export_title') });
      }
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('dns.export_error'));
    } finally {
      setPorting(false);
    }
  };

  const handleImport = async () => {
    if (porting) return;
    const picked = await DocumentPicker.getDocumentAsync({ type: ['text/plain', 'application/octet-stream', '*/*'], copyToCacheDirectory: true });
    if (picked.canceled || !picked.assets?.[0]) return;
    const asset = picked.assets[0];
    Alert.alert(
      t('dns.import_title'),
      t('dns.import_confirm', { file: asset.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('dns.import_action'),
          onPress: async () => {
            setPorting(true);
            try {
              const res = await api.importDnsRecords(id, asset.uri);
              Alert.alert(
                t('common.success'),
                t('dns.import_result', { added: res.result?.recs_added ?? 0, parsed: res.result?.total_records_parsed ?? 0 })
              );
              setLoading(true);
              fetchRecords();
            } catch (e: any) {
              Alert.alert(t('common.error'), e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('dns.import_error'));
            } finally {
              setPorting(false);
            }
          },
        },
      ]
    );
  };

  const handleScan = () => {
    Alert.alert(
      t('dns.scan_title'),
      t('dns.scan_confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('dns.scan_action'),
          onPress: async () => {
            setScanning(true);
            try {
              const res = await api.scanDnsRecords(id);
              const added = res.result?.recs_added ?? 0;
              const parsed = res.result?.total_records_parsed ?? 0;
              Alert.alert(t('common.success'), t('dns.scan_result', { added, parsed }));
              setLoading(true);
              fetchRecords();
            } catch (e: any) {
              Alert.alert(t('common.error'), e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('dns.scan_error'));
            } finally {
              setScanning(false);
            }
          },
        },
      ]
    );
  };

  const updateDnsSetting = async <K extends keyof api.DnsZoneSettings>(key: K, value: api.DnsZoneSettings[K]) => {
    if (!dnsSettings) return;
    const prev = dnsSettings;
    setDnsSettings({ ...dnsSettings, [key]: value });
    setSettingsSaving(true);
    try {
      await api.updateDnsSettings(id, { [key]: value });
    } catch {
      setDnsSettings(prev);
      Alert.alert(t('common.error'), t('dns.settings_update_error'));
    } finally {
      setSettingsSaving(false);
    }
  };

  const stripZone = (name: string, zone: string) => {
    if (name === zone) return '@';
    if (name.endsWith(`.${zone}`)) return name.slice(0, -(zone.length + 1));
    return name;
  };

  // Secondary actions live in one sheet instead of a row of coloured buttons.
  const menu: { icon: IconName; label: string; onPress: () => void }[] = [
    { icon: 'layers', label: t('dns.templates'), onPress: () => router.push({ pathname: `/zone/[id]/dns-templates` as any, params: { id } }) },
    { icon: 'search', label: t('dns.scan_title'), onPress: handleScan },
    { icon: 'cloud-upload', label: t('dns.import_title'), onPress: handleImport },
    { icon: 'download', label: t('dns.export_title'), onPress: handleExport },
    { icon: 'clock', label: t('history.title'), onPress: () => router.push('/history' as any) },
    { icon: 'settings', label: t('dns.settings_title'), onPress: () => setShowSettings(true) },
  ];

  const renderRecord = ({ item }: { item: DNSRecord }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push({ pathname: `/zone/[id]/dns-edit` as any, params: { id, recordId: item.id } })}
      onLongPress={() => handleDelete(item)}
      style={[styles.record, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
    >
      <View style={[styles.typeBadge, { backgroundColor: colors.surfaceSecondary }]}>
        <Text style={[styles.typeText, { color: colors.text }]} numberOfLines={1}>{item.type}</Text>
      </View>

      <View style={styles.recordBody}>
        <Text style={[styles.recordName, { color: colors.text }]} numberOfLines={1}>
          {stripZone(item.name, item.zone_name)}
        </Text>
        <Text style={[styles.recordContent, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.content}
        </Text>
        <Text style={[styles.recordMeta, { color: colors.textTertiary }]} numberOfLines={1}>
          {item.ttl === 1 ? 'Auto' : `${item.ttl}s`}
          {item.priority !== undefined ? ` · Priority ${item.priority}` : ''}
          {item.proxiable ? ` · ${item.proxied ? 'Proxied' : 'DNS only'}` : ''}
        </Text>
      </View>

      {item.proxiable && (
        <Icon
          name={item.proxied ? 'cloud' : 'cloud-off'}
          size={18}
          color={item.proxied ? colors.primary : colors.textTertiary}
        />
      )}
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={t('common.delete')}
      >
        <Icon name="trash" size={16} color={colors.textTertiary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('dns.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <View style={{ paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, gap: Spacing.md }}>
            <Skeleton height={44} radius={Radius.lg} />
            <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} width={56} height={30} radius={Radius.lg} />
              ))}
            </View>
          </View>
          <View style={[styles.list, { marginTop: Spacing.md }]}>
            <SkeletonRows count={7} />
          </View>
        </View>
      </>
    );
  }

  const busy = porting || scanning;

  return (
    <>
      <Stack.Screen
        options={{
          title: t('dns.title'),
          headerRight: () => (
            <HeaderButton icon="menu" label={t('dns.more_actions')} onPress={() => setShowMenu(true)} />
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <Icon name="search" size={18} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('dns.search')}
            placeholderTextColor={colors.textTertiary}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={fetchRecords}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => { setSearch(''); fetchRecords(); }} hitSlop={8}>
              <Icon name="close" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Type filter. flexGrow 0 keeps the row from being squeezed by the list below. */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chips}
        >
          {[undefined, ...RECORD_TYPES].map((rt) => {
            const active = filter === rt;
            return (
              <TouchableOpacity
                key={rt ?? 'all'}
                onPress={() => { setFilter(rt); setLoading(true); }}
                style={[
                  styles.chip,
                  {
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor: active ? colors.primary : colors.borderLight,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, { color: active ? '#FFF' : colors.textSecondary }]}>
                  {rt ?? t('dns.all')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {(records.length > 0 || usage) && (
          <View style={styles.countRow}>
            <Text style={[styles.countText, { color: colors.textTertiary }]}>
              {records.length} {records.length === 1 ? 'record' : 'records'}
              {filter ? ` · ${filter}` : ''}
              {usage ? ` · ${usage.record_usage}${usage.record_quota ? `/${usage.record_quota}` : ''}` : ''}
            </Text>
            {busy && <ActivityIndicator size="small" color={colors.textTertiary} />}
          </View>
        )}

        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderRecord}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
          ListEmptyComponent={
            <View style={{ paddingTop: 40 }}>
              <EmptyState icon="dns" title={t('dns.no_records')} message={t('dns.no_records_message')} />
            </View>
          }
        />

        {/* Add record */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary, bottom: insets.bottom + Spacing.lg }]}
          onPress={() => router.push({ pathname: `/zone/[id]/dns-edit` as any, params: { id } })}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={t('dns.add_record')}
        >
          <Icon name="plus" size={18} color="#FFF" />
          <Text style={styles.fabText}>{t('dns.add_record')}</Text>
        </TouchableOpacity>

        {/* More actions sheet */}
        <Modal visible={showMenu} animationType="slide" transparent onRequestClose={() => setShowMenu(false)}>
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMenu(false)}>
            <View style={[styles.sheet, { backgroundColor: colors.background, paddingBottom: insets.bottom + Spacing.lg }]}>
              <View style={[styles.grabber, { backgroundColor: colors.border }]} />
              <View style={[styles.sheetGroup, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
                {menu.map((m, i) => (
                  <TouchableOpacity
                    key={m.label}
                    style={[styles.sheetRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.borderLight }]}
                    onPress={() => { setShowMenu(false); m.onPress(); }}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.sheetIcon, { backgroundColor: colors.surfaceSecondary }]}>
                      <Icon name={m.icon} size={16} color={colors.text} />
                    </View>
                    <Text style={[styles.sheetLabel, { color: colors.text }]}>{m.label}</Text>
                    <Icon name="chevron-right" size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* DNS Settings Modal */}
        <Modal visible={showSettings} animationType="slide" transparent onRequestClose={() => setShowSettings(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>{t('dns.settings_title')}</Text>
                <TouchableOpacity onPress={() => setShowSettings(false)} hitSlop={8}>
                  <Icon name="close" size={22} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.modalBody}>
                {dnsSettings ? (
                  <>
                    <SectionHeader title={t('dns.settings_general')} />
                    <Card>
                      <View style={styles.toggleRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.toggleTitle, { color: colors.text }]}>{t('dns.flatten_cnames')}</Text>
                          <Text style={[styles.toggleDesc, { color: colors.textSecondary }]}>{t('dns.flatten_cnames_desc')}</Text>
                        </View>
                        <Switch
                          value={dnsSettings.flatten_all_cnames}
                          onValueChange={(v) => updateDnsSetting('flatten_all_cnames', v)}
                          trackColor={{ true: colors.primary }}
                          disabled={settingsSaving}
                        />
                      </View>
                      <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />
                      <View style={styles.toggleRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.toggleTitle, { color: colors.text }]}>{t('dns.multi_provider')}</Text>
                          <Text style={[styles.toggleDesc, { color: colors.textSecondary }]}>{t('dns.multi_provider_desc')}</Text>
                        </View>
                        <Switch
                          value={dnsSettings.multi_provider}
                          onValueChange={(v) => updateDnsSetting('multi_provider', v)}
                          trackColor={{ true: colors.primary }}
                          disabled={settingsSaving}
                        />
                      </View>
                      <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />
                      <View style={styles.toggleRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.toggleTitle, { color: colors.text }]}>{t('dns.secondary_overrides')}</Text>
                          <Text style={[styles.toggleDesc, { color: colors.textSecondary }]}>{t('dns.secondary_overrides_desc')}</Text>
                        </View>
                        <Switch
                          value={dnsSettings.secondary_overrides}
                          onValueChange={(v) => updateDnsSetting('secondary_overrides', v)}
                          trackColor={{ true: colors.primary }}
                          disabled={settingsSaving}
                        />
                      </View>
                    </Card>

                    <SectionHeader title={t('dns.settings_soa')} />
                    <Card>
                      {([
                        ['dns.soa_ttl', dnsSettings.soa?.ttl],
                        ['dns.soa_refresh', dnsSettings.soa?.refresh],
                        ['dns.soa_retry', dnsSettings.soa?.retry],
                        ['dns.soa_expire', dnsSettings.soa?.expire],
                        ['dns.soa_min_ttl', dnsSettings.soa?.min_ttl],
                      ] as [string, number | undefined][]).map(([key, value], i) => (
                        <View key={key}>
                          {i > 0 && <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />}
                          <View style={styles.settingsRow}>
                            <Text style={[styles.settingsLabel, { color: colors.textSecondary }]}>{t(key)}</Text>
                            <Text style={[styles.settingsValue, { color: colors.text }]}>{value ?? '—'}s</Text>
                          </View>
                        </View>
                      ))}
                    </Card>

                    <SectionHeader title={t('dns.settings_ns')} />
                    <Card>
                      <View style={styles.settingsRow}>
                        <Text style={[styles.settingsLabel, { color: colors.textSecondary }]}>{t('dns.ns_ttl')}</Text>
                        <Text style={[styles.settingsValue, { color: colors.text }]}>{dnsSettings.ns_ttl ?? '—'}s</Text>
                      </View>
                      <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />
                      <View style={styles.settingsRow}>
                        <Text style={[styles.settingsLabel, { color: colors.textSecondary }]}>{t('dns.zone_mode')}</Text>
                        <Text style={[styles.settingsValue, { color: colors.text }]}>{dnsSettings.zone_mode}</Text>
                      </View>
                      <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />
                      <View style={styles.settingsRow}>
                        <Text style={[styles.settingsLabel, { color: colors.textSecondary }]}>{t('dns.ns_type')}</Text>
                        <Text style={[styles.settingsValue, { color: colors.text }]}>{dnsSettings.nameservers?.type ?? '—'}</Text>
                      </View>
                    </Card>
                  </>
                ) : (
                  <View style={{ paddingTop: 40 }}>
                    <EmptyState icon="dns" title={t('dns.settings_unavailable')} message={t('dns.settings_unavailable_desc')} />
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    borderWidth: 1,
    gap: Spacing.sm,
    height: 46,
  },
  searchInput: { flex: 1, fontSize: FontSize.md },
  chipScroll: { flexGrow: 0, flexShrink: 0 },
  chips: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  chip: {
    height: 34,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: { fontSize: FontSize.sm, fontWeight: '500' },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg + Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  countText: { fontSize: FontSize.xs },
  list: { paddingHorizontal: Spacing.lg },
  record: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  typeBadge: {
    width: 52,
    height: 30,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3 },
  recordBody: { flex: 1, gap: 2 },
  recordName: { fontSize: FontSize.md, fontWeight: '500' },
  recordContent: { fontSize: FontSize.xs, fontFamily: 'monospace' },
  recordMeta: { fontSize: 11 },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 50,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  fabText: { color: '#FFF', fontSize: FontSize.md, fontWeight: '600' },

  // Sheets
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  grabber: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: Spacing.lg },
  sheetGroup: { borderRadius: Radius.lg, borderWidth: 1, overflow: 'hidden' },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
  },
  sheetIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  sheetLabel: { flex: 1, fontSize: FontSize.md, fontWeight: '500' },
  modalContent: {
    maxHeight: '85%',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  modalTitle: { fontSize: FontSize.lg, fontWeight: '500' },
  modalBody: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  toggleTitle: { fontSize: FontSize.md, fontWeight: '500' },
  toggleDesc: { fontSize: FontSize.xs, marginTop: 2 },
  separator: { height: 1, marginVertical: Spacing.xs },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  settingsLabel: { fontSize: FontSize.sm },
  settingsValue: { fontSize: FontSize.sm, fontWeight: '500', fontFamily: 'monospace' },
});
