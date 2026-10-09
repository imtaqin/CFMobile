import { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Linking, Image,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { ChipRow, Field, FieldLabel, Group, ListRow } from '@/components/ui/kit';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DNS_TEMPLATES, DnsTemplate, applyTemplate, brandLogoUrl } from '@/services/dns-templates';

/** The provider's own logo in a neutral circle; falls back to a grey icon. */
function BrandLogo({ template, size }: { template: DnsTemplate; size: number }) {
  const { colors } = useTheme();
  const [failed, setFailed] = useState(false);
  const inner = Math.round(size * 0.6);
  const logo = template.domain ? brandLogoUrl(template.domain) : null;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceSecondary,
      }}
    >
      {logo && !failed ? (
        <Image
          source={{ uri: logo }}
          style={{ width: inner, height: inner, borderRadius: inner / 4 }}
          onError={() => setFailed(true)}
        />
      ) : (
        <Icon name={template.icon as IconName} size={Math.round(size * 0.48)} color={colors.text} />
      )}
    </View>
  );
}

const CATEGORIES: { key: DnsTemplate['category']; label: string }[] = [
  { key: 'hosting', label: 'Hosting' },
  { key: 'email', label: 'Email' },
  { key: 'verification', label: 'Verify' },
  { key: 'security', label: 'Security' },
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
        {/* Category filter */}
        <ChipRow
          style={styles.categories}
          options={CATEGORIES.map((c) => ({ value: c.key, label: c.label }))}
          value={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Templates list */}
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {filtered.map((tmpl) => (
            <Group key={tmpl.id}>
              <ListRow
                leading={<BrandLogo template={tmpl} size={40} />}
                title={tmpl.name}
                subtitle={tmpl.description}
                onPress={() => openTemplate(tmpl)}
              />
            </Group>
          ))}
        </ScrollView>
      </View>

      {/* Apply sheet */}
      <Sheet
        visible={!!selected}
        onClose={closeModal}
        title={selected?.name}
        footer={
          <View style={styles.footer}>
            <Button
              title="Cancel"
              onPress={closeModal}
              variant="secondary"
              style={{ flex: 1 }}
            />
            <Button
              title={applying ? 'Applying…' : 'Review & Apply'}
              onPress={handleApplyConfirm}
              loading={applying}
              style={{ flex: 2 }}
              disabled={previewRecords.length === 0}
            />
          </View>
        }
      >
        {selected && (
          <>
            <View style={styles.sheetHead}>
              <BrandLogo template={selected} size={44} />
              <Text style={[styles.sheetDesc, { color: colors.textSecondary }]}>{selected.description}</Text>
            </View>

            {selected.docs && (
              <TouchableOpacity
                style={styles.docsLink}
                onPress={() => Linking.openURL(selected.docs!)}
                hitSlop={8}
                accessibilityRole="link"
              >
                <Icon name="link" size={14} color={colors.primary} />
                <Text style={[styles.docsLinkText, { color: colors.primary }]}>View official documentation</Text>
              </TouchableOpacity>
            )}

            {/* Target picker (only for choosable templates) */}
            {selected.targetMode === 'choosable' && (
              <>
                <FieldLabel>Where to install</FieldLabel>
                <ChipRow
                  wrap
                  style={styles.control}
                  options={[
                    { value: 'apex', label: 'Apex (root domain)' },
                    { value: 'subdomain', label: 'Subdomain' },
                  ]}
                  value={targetMode}
                  onChange={setTargetMode}
                />
                {targetMode === 'subdomain' && (
                  <Field
                    label="Subdomain name *"
                    placeholder="www, app, api, blog…"
                    value={targetName}
                    onChangeText={setTargetName}
                    autoCapitalize="none"
                    autoCorrect={false}
                    mono
                  />
                )}
              </>
            )}

            {selected.placeholders.length > 0 && (
              <>
                <Text style={[styles.groupTitle, { color: colors.text }]}>Required values</Text>
                {selected.placeholders.map((p) => (
                  <Field
                    key={p.key}
                    label={p.required ? `${p.label} *` : p.label}
                    placeholder={p.placeholder}
                    value={values[p.key] || ''}
                    onChangeText={(v) => setValues((prev) => ({ ...prev, [p.key]: v }))}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                ))}
              </>
            )}

            <Text style={[styles.groupTitle, { color: colors.text }]}>
              Records to create ({previewRecords.length})
            </Text>
            {previewRecords.length === 0 ? (
              <Text style={[styles.emptyPreview, { color: colors.textSecondary }]}>
                No records for this configuration.
              </Text>
            ) : (
              <Group style={styles.preview}>
                {previewRecords.map((r, i) => (
                  <ListRow
                    key={i}
                    leading={
                      <View style={[styles.typeBadge, { backgroundColor: colors.surfaceSecondary }]}>
                        <Text style={[styles.typeText, { color: colors.text }]} numberOfLines={1}>{r.type}</Text>
                      </View>
                    }
                    title={r.name}
                    subtitle={`→ ${r.content}`}
                    mono
                    trailing={r.proxied ? <Icon name="cloud" size={18} color={colors.primary} /> : undefined}
                  />
                ))}
              </Group>
            )}
          </>
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  categories: { marginHorizontal: Spacing.lg, marginVertical: Spacing.md },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.sm },

  footer: { flexDirection: 'row', gap: Spacing.sm },
  sheetHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  sheetDesc: { flex: 1, fontSize: FontSize.sm, lineHeight: 18 },
  docsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
  },
  docsLinkText: { fontSize: FontSize.sm, fontWeight: '500' },
  control: { marginTop: 6 },
  groupTitle: { fontSize: FontSize.md, fontWeight: '500', marginTop: Spacing.xl },
  emptyPreview: { fontSize: FontSize.sm, marginTop: Spacing.sm },
  preview: { marginTop: Spacing.sm },
  typeBadge: {
    width: 52,
    height: 30,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3 },
});
