import { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Modal, Linking, TextInput, Image,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DNS_TEMPLATES, DnsTemplate, applyTemplate, brandLogoUrl } from '@/services/dns-templates';

function BrandLogo({ template, size, color }: { template: DnsTemplate; size: number; color: string }) {
  const [failed, setFailed] = useState(false);
  if (template.domain && !failed) {
    return (
      <Image
        source={{ uri: brandLogoUrl(template.domain) }}
        style={{ width: size, height: size, borderRadius: size / 4 }}
        onError={() => setFailed(true)}
      />
    );
  }
  return <Icon name={template.icon as IconName} size={size * 0.55} color={color} />;
}

const CATEGORIES: { key: DnsTemplate['category']; label: string; icon: IconName; color: string }[] = [
  { key: 'hosting', label: 'Hosting', icon: 'cloud', color: '#3B82F6' },
  { key: 'email', label: 'Email', icon: 'mail', color: '#EC4899' },
  { key: 'verification', label: 'Verify', icon: 'check-circle', color: '#10B981' },
  { key: 'security', label: 'Security', icon: 'shield', color: '#F59E0B' },
];

export default function DnsTemplatesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [activeCategory, setActiveCategory] = useState<DnsTemplate['category']>('hosting');
  const [selected, setSelected] = useState<DnsTemplate | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [targetMode, setTargetMode] = useState<'apex' | 'subdomain'>('apex');
  const [targetName, setTargetName] = useState('www');
  const [applying, setApplying] = useState(false);

  const filtered = DNS_TEMPLATES.filter((tmpl) => tmpl.category === activeCategory);

  const openTemplate = (tmpl: DnsTemplate) => {
    setSelected(tmpl);
    const initial: Record<string, string> = {};
    for (const p of tmpl.placeholders) initial[p.key] = '';
    setValues(initial);
    setTargetMode('apex');
    setTargetName('www');
  };

  const closeModal = () => {
    setSelected(null);
    setValues({});
  };

  const previewRecords = selected
    ? applyTemplate(selected, { values, targetMode, targetName })
    : [];

  const handleApplyConfirm = () => {
    if (!selected) return;

    // Validate required placeholders
    const missingPh = selected.placeholders
      .filter((p) => p.required && !values[p.key]?.trim());
    if (missingPh.length > 0) {
      Alert.alert('Missing field', `Please fill in: ${missingPh.map((p) => p.label).join(', ')}`);
      return;
    }

    if (targetMode === 'subdomain' && !targetName.trim()) {
      Alert.alert('Missing field', 'Please enter a subdomain name (e.g. www, app, api)');
      return;
    }

    if (selected.targetMode === 'choosable') {
      const wantedSet = targetMode === 'subdomain'
        ? selected.subdomainRecords
        : selected.apexRecords;
      if (!wantedSet || wantedSet.length === 0) {
        Alert.alert('Not supported', `${selected.name} does not support ${targetMode === 'apex' ? 'apex domain' : 'subdomain'} configuration.`);
        return;
      }
    }

    const records = previewRecords;
    const where = targetMode === 'subdomain'
      ? `subdomain "${targetName}"`
      : 'apex (root domain)';

    Alert.alert(
      `Apply ${selected.name}?`,
      `${records.length} DNS record${records.length === 1 ? '' : 's'} will be created on ${where}.\n\nThis cannot be undone automatically — you'll need to delete records manually if needed.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Apply', style: 'default', onPress: doApply },
      ],
      { cancelable: true }
    );
  };

  const doApply = async () => {
    if (!selected) return;
    setApplying(true);
    try {
      const records = previewRecords;
      const results = await Promise.allSettled(
        records.map((r) => api.createDnsRecord(id, r))
      );
      const succeeded = results.filter((r) => r.status === 'fulfilled').length;
      const failed = results.length - succeeded;

      if (failed > 0) {
        const firstError = results.find((r) => r.status === 'rejected') as PromiseRejectedResult | undefined;
        const msg = (firstError?.reason as any)?.response?.data?.errors?.[0]?.message ?? 'Some records failed';
        Alert.alert(
          `Applied ${succeeded}/${records.length}`,
          msg,
          [{ text: 'OK', onPress: () => { closeModal(); router.back(); } }]
        );
      } else {
        Alert.alert(
          'Template Applied',
          `${succeeded} record${succeeded === 1 ? '' : 's'} created successfully.`,
          [{ text: 'OK', onPress: () => { closeModal(); router.back(); } }]
        );
      }
    } catch (e: any) {
      const msg = e?.response?.data?.errors?.[0]?.message ?? 'Failed to apply template';
      Alert.alert('Error', msg);
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: t('dns.templates') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Category tabs — fixed equal-width */}
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                onPress={() => setActiveCategory(cat.key)}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: active ? cat.color : colors.surface,
                    borderColor: active ? cat.color : colors.border,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Icon name={cat.icon} size={14} color={active ? '#FFF' : cat.color} />
                <Text
                  style={[
                    styles.categoryLabel,
                    { color: active ? '#FFF' : colors.text },
                  ]}
                  numberOfLines={1}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Templates list */}
        <ScrollView contentContainerStyle={styles.list}>
          {filtered.map((tmpl) => (
            <TouchableOpacity
              key={tmpl.id}
              onPress={() => openTemplate(tmpl)}
              activeOpacity={0.7}
            >
              <Card style={styles.templateCard}>
                <View style={[styles.templateIcon, { backgroundColor: tmpl.color + '15' }]}>
                  <BrandLogo template={tmpl} size={28} color={tmpl.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.templateHeader}>
                    <Text style={[styles.templateName, { color: colors.text }]} numberOfLines={1}>{tmpl.name}</Text>
                  </View>
                  <Text style={[styles.templateDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                    {tmpl.description}
                  </Text>
                </View>
                <Icon name="chevron-right" size={18} color={colors.textTertiary} />
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Apply Modal */}
        <Modal
          visible={!!selected}
          transparent
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalSheet, { backgroundColor: colors.surface }]}>
              {selected && (
                <ScrollView contentContainerStyle={{ padding: Spacing.lg, gap: Spacing.md }} keyboardShouldPersistTaps="handled">
                  <View style={styles.modalHeader}>
                    <View style={[styles.templateIconLarge, { backgroundColor: selected.color + '15' }]}>
                      <BrandLogo template={selected} size={36} color={selected.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.modalTitle, { color: colors.text }]}>{selected.name}</Text>
                      <Text style={[styles.modalDesc, { color: colors.textSecondary }]}>{selected.description}</Text>
                    </View>
                    <TouchableOpacity onPress={closeModal} hitSlop={10}>
                      <Icon name="close" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  {selected.docs && (
                    <TouchableOpacity
                      style={[styles.docsLink, { backgroundColor: colors.info + '15' }]}
                      onPress={() => Linking.openURL(selected.docs!)}
                    >
                      <Icon name="link" size={14} color={colors.info} />
                      <Text style={[styles.docsLinkText, { color: colors.info }]}>View official documentation</Text>
                    </TouchableOpacity>
                  )}

                  {/* Target picker (only for choosable templates) */}
                  {selected.targetMode === 'choosable' && (
                    <View style={{ gap: Spacing.sm }}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                        Where to install
                      </Text>
                      <View style={styles.targetRow}>
                        <TouchableOpacity
                          onPress={() => setTargetMode('apex')}
                          style={[
                            styles.targetChip,
                            {
                              backgroundColor: targetMode === 'apex' ? colors.primary : colors.surfaceSecondary,
                              borderColor: targetMode === 'apex' ? colors.primary : colors.border,
                            },
                          ]}
                          activeOpacity={0.7}
                        >
                          <Text style={[
                            styles.targetChipText,
                            { color: targetMode === 'apex' ? '#FFF' : colors.text },
                          ]}>
                            Apex (root domain)
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setTargetMode('subdomain')}
                          style={[
                            styles.targetChip,
                            {
                              backgroundColor: targetMode === 'subdomain' ? colors.primary : colors.surfaceSecondary,
                              borderColor: targetMode === 'subdomain' ? colors.primary : colors.border,
                            },
                          ]}
                          activeOpacity={0.7}
                        >
                          <Text style={[
                            styles.targetChipText,
                            { color: targetMode === 'subdomain' ? '#FFF' : colors.text },
                          ]}>
                            Subdomain
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {targetMode === 'subdomain' && (
                        <View>
                          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                            Subdomain name <Text style={{ color: colors.error }}>*</Text>
                          </Text>
                          <TextInput
                            style={[styles.fieldInput, {
                              backgroundColor: colors.surfaceSecondary,
                              borderColor: colors.border,
                              color: colors.text,
                            }]}
                            placeholder="www, app, api, blog…"
                            placeholderTextColor={colors.textTertiary}
                            value={targetName}
                            onChangeText={setTargetName}
                            autoCapitalize="none"
                            autoCorrect={false}
                          />
                        </View>
                      )}
                    </View>
                  )}

                  {selected.placeholders.length > 0 && (
                    <View style={{ gap: Spacing.sm }}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Required values</Text>
                      {selected.placeholders.map((p) => (
                        <View key={p.key}>
                          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                            {p.label} {p.required && <Text style={{ color: colors.error }}>*</Text>}
                          </Text>
                          <TextInput
                            style={[styles.fieldInput, {
                              backgroundColor: colors.surfaceSecondary,
                              borderColor: colors.border,
                              color: colors.text,
                            }]}
                            placeholder={p.placeholder}
                            placeholderTextColor={colors.textTertiary}
                            value={values[p.key] || ''}
                            onChangeText={(v) => setValues((prev) => ({ ...prev, [p.key]: v }))}
                            autoCapitalize="none"
                            autoCorrect={false}
                          />
                        </View>
                      ))}
                    </View>
                  )}

                  <Text style={[styles.sectionLabel, { color: colors.textSecondary, marginTop: Spacing.sm }]}>
                    Records to create ({previewRecords.length})
                  </Text>
                  {previewRecords.length === 0 ? (
                    <View style={[styles.previewBox, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, padding: Spacing.md }]}>
                      <Text style={{ color: colors.textSecondary, fontSize: FontSize.xs }}>
                        No records for this configuration.
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.previewBox, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                      {previewRecords.map((r, i) => (
                        <View key={i} style={[styles.previewRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
                          <View style={[styles.typeBadge, { backgroundColor: colors.primary + '20' }]}>
                            <Text style={[styles.typeBadgeText, { color: colors.primary }]}>{r.type}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={[styles.previewName, { color: colors.text }]} numberOfLines={1}>{r.name}</Text>
                            <Text style={[styles.previewContent, { color: colors.textSecondary }]} numberOfLines={1}>
                              → {r.content}
                            </Text>
                          </View>
                          {r.proxied && <Icon name="cloud" size={14} color={colors.warning} />}
                        </View>
                      ))}
                    </View>
                  )}

                  <View style={{ flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm }}>
                    <Button
                      title="Cancel"
                      onPress={closeModal}
                      variant="secondary"
                      size="lg"
                      style={{ flex: 1 }}
                    />
                    <Button
                      title={applying ? 'Applying…' : 'Review & Apply'}
                      onPress={handleApplyConfirm}
                      loading={applying}
                      size="lg"
                      style={{ flex: 2 }}
                      disabled={previewRecords.length === 0}
                    />
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  categoryChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
    height: 36,
  },
  categoryLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.sm },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  templateIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateIconLarge: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 2,
  },
  templateName: { fontSize: FontSize.md, fontWeight: '600', flex: 1 },
  templateDesc: { fontSize: FontSize.xs, lineHeight: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: '92%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  modalTitle: { fontSize: FontSize.xl, fontWeight: '700' },
  modalDesc: { fontSize: FontSize.sm, marginTop: 2 },
  docsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.sm,
    borderRadius: Radius.md,
    alignSelf: 'flex-start',
  },
  docsLinkText: { fontSize: FontSize.xs, fontWeight: '600' },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldLabel: { fontSize: FontSize.sm, marginBottom: 4 },
  fieldInput: {
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
  },
  targetRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  targetChip: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  targetChipText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  previewBox: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.sm,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    minWidth: 50,
    alignItems: 'center',
  },
  typeBadgeText: { fontSize: 11, fontWeight: '700' },
  previewName: { fontSize: FontSize.sm, fontWeight: '600' },
  previewContent: { fontSize: FontSize.xs, marginTop: 1 },
});
