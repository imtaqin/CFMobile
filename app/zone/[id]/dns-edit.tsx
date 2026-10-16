import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { SectionHeader } from '@/components/ui/section-header';
import { ChipRow, Field, FieldLabel, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { ChangeDiff } from '@/components/ui/change-diff';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { recordHappyMoment } from '@/services/review-prompt';
import { DNSRecordType, DNSRecordInput, DNSRecordData } from '@/services/types';
import { addChange, diffFields, DnsSnapshot, FieldChange, snapshot } from '@/services/change-history';

const RECORD_TYPES: DNSRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV', 'CAA'];

type CaaTag = 'issue' | 'issuewild' | 'iodef';
const CAA_TAGS: CaaTag[] = ['issue', 'issuewild', 'iodef'];

/** Cloudflare makes `content` read-only for these and reads `data` instead. */
const DATA_TYPES: DNSRecordType[] = ['SRV', 'CAA'];

const TYPE_DESCRIPTIONS: Partial<Record<DNSRecordType, string>> = {
  A: 'IPv4 address',
  AAAA: 'IPv6 address',
  CNAME: 'Alias to another domain',
  MX: 'Mail server',
  TXT: 'Text record (SPF, DMARC, verification)',
  NS: 'Name server delegation',
  SRV: 'Service location record',
  CAA: 'Certificate authority authorization',
};

export default function DNSEditScreen() {
  const { id, recordId } = useLocalSearchParams<{ id: string; recordId?: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const isEdit = !!recordId;

  const [type, setType] = useState<DNSRecordType>('A');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState('1');
  const [proxied, setProxied] = useState(true);
  const [priority, setPriority] = useState('10');
  // SRV and CAA send these through `data` instead of `content`.
  const [weight, setWeight] = useState('1');
  const [port, setPort] = useState('');
  const [target, setTarget] = useState('');
  const [caaFlags, setCaaFlags] = useState('0');
  const [caaTag, setCaaTag] = useState<CaaTag>('issue');
  const [caaValue, setCaaValue] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  // The record as it was loaded, so the review sheet can show old against new.
  const [original, setOriginal] = useState<DnsSnapshot | null>(null);
  const [zoneName, setZoneName] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState<{ record: DNSRecordInput; changes: FieldChange[] } | null>(null);

  useEffect(() => {
    if (isEdit && recordId) {
      (async () => {
        try {
          const res = await api.getDnsRecord(id, recordId);
          const r = res.result;
          setOriginal(snapshot(r));
          setZoneName(r.zone_name);
          setType(r.type);
          setName(r.name);
          setContent(r.content);
          setTtl(String(r.ttl));
          setProxied(r.proxied);
          if (r.priority !== undefined) setPriority(String(r.priority));
          const d = r.data ?? {};
          if (d.priority !== undefined) setPriority(String(d.priority));
          if (d.weight !== undefined) setWeight(String(d.weight));
          if (d.port !== undefined) setPort(String(d.port));
          if (d.target !== undefined) setTarget(String(d.target));
          if (d.flags !== undefined) setCaaFlags(String(d.flags));
          if (d.tag !== undefined) setCaaTag(d.tag as CaaTag);
          if (d.value !== undefined) setCaaValue(String(d.value));
          if (r.comment) setComment(r.comment);
        } catch {
          Alert.alert(t('common.error'), t('dns.fetch_error'));
          router.back();
        } finally {
          setFetching(false);
        }
      })();
    }
  }, [id, recordId, isEdit, t]);

  /** The `data` map for the type being edited, with the numbers coerced. */
  const buildData = (): DNSRecordData => {
    if (type === 'SRV') {
      return {
        priority: parseInt(priority) || 0,
        weight: parseInt(weight) || 0,
        port: parseInt(port) || 0,
        target: target.trim(),
      };
    }
    return {
      flags: parseInt(caaFlags) || 0,
      tag: caaTag,
      value: caaValue.trim(),
    };
  };

  // Save does not write anything yet: it opens a sheet with exactly what will change.
  const handleSave = () => {
    const dataType = DATA_TYPES.includes(type);

    if (!name.trim()) {
      Alert.alert(t('common.error'), t('dns.fields_required'));
      return;
    }
    if (type === 'SRV' && (!target.trim() || !port.trim())) {
      Alert.alert(t('common.error'), t('dns.srv_fields_required'));
      return;
    }
    if (type === 'CAA' && !caaValue.trim()) {
      Alert.alert(t('common.error'), t('dns.caa_fields_required'));
      return;
    }
    if (!dataType && !content.trim()) {
      Alert.alert(t('common.error'), t('dns.fields_required'));
      return;
    }

    const record: DNSRecordInput = {
      type,
      name: name.trim(),
      ttl: parseInt(ttl) || 1,
      proxied: ['A', 'AAAA', 'CNAME'].includes(type) ? proxied : false,
      comment: comment.trim() || undefined,
    };
    if (dataType) {
      record.data = buildData();
    } else {
      record.content = content.trim();
    }
    // MX keeps the top-level field; for SRV the priority rides along in `data`.
    if (type === 'MX') {
      record.priority = parseInt(priority) || 10;
    }

    const changes = diffFields(isEdit ? original : null, snapshot(record));
    if (isEdit && changes.length === 0) {
      Alert.alert(t('history.no_changes'), t('history.no_changes_sub'));
      return;
    }
    setPending({ record, changes });
  };

  const applyPending = async () => {
    if (!pending) return;
    const { record } = pending;
    setLoading(true);
    try {
      if (isEdit && recordId) {
        const res = await api.updateDnsRecord(id, recordId, record);
        await addChange({
          zoneId: id, zoneName: res.result?.zone_name ?? zoneName, action: 'update', recordId,
          before: original, after: snapshot(record),
        });
      } else {
        const res = await api.createDnsRecord(id, record);
        await addChange({
          zoneId: id, zoneName: res.result?.zone_name, action: 'create', recordId: res.result?.id,
          before: null, after: snapshot(record),
        });
      }
      setPending(null);
      recordHappyMoment();
      router.back();
    } catch (e: any) {
      const msg = e?.response?.data?.errors?.[0]?.message ?? t('dns.save_error');
      Alert.alert(t('common.error'), msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Loading />;

  const showProxyToggle = ['A', 'AAAA', 'CNAME'].includes(type);
  const showPriority = ['MX', 'SRV'].includes(type);
  const usesData = DATA_TYPES.includes(type);

  const placeholderForType = (t: DNSRecordType): string => {
    switch (t) {
      case 'A': return '192.168.1.1';
      case 'AAAA': return '2001:db8::1';
      case 'CNAME': return 'target.example.com';
      case 'MX': return 'mail.example.com';
      case 'TXT': return 'v=spf1 include:_spf.google.com ~all';
      case 'NS': return 'ns1.example.com';
      case 'SRV': return '_service._proto.name';
      case 'CAA': return '0 issue "letsencrypt.org"';
      default: return '';
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: isEdit ? t('dns.edit_record') : t('dns.add_record') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Quick template suggestion */}
        {!isEdit && (
          <Group>
            <ListRow
              icon="layers"
              title="Use a template instead"
              subtitle="One-tap setup for Vercel, Netlify, GitHub Pages, Google Workspace…"
              onPress={() => router.replace({ pathname: `/zone/[id]/dns-templates` as any, params: { id } })}
            />
          </Group>
        )}

        {/* Type */}
        <SectionHeader title="Record Type" />
        <ChipRow
          wrap
          options={RECORD_TYPES.map((rt) => ({ value: rt, label: rt }))}
          value={type}
          onChange={setType}
        />
        <Text style={[styles.typeDesc, { color: colors.textSecondary }]}>
          {TYPE_DESCRIPTIONS[type]}
        </Text>

        {/* Name + Content */}
        <SectionHeader title="Record Details" />
        <View style={styles.fields}>
          <Field
            label={t('dns.name')}
            placeholder="@, www, app.example.com"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
            mono
          />
          {!usesData && (
            <Field
              label={t('dns.content')}
              placeholder={placeholderForType(type)}
              value={content}
              onChangeText={setContent}
              autoCapitalize="none"
              autoCorrect={false}
              multiline={type === 'TXT'}
              mono
            />
          )}

          {type === 'SRV' && (
            <>
              <Field
                label={t('dns.srv_target')}
                placeholder="server.example.com"
                value={target}
                onChangeText={setTarget}
                autoCapitalize="none"
                autoCorrect={false}
                mono
              />
              <Field
                label={t('dns.srv_port')}
                placeholder="8806"
                value={port}
                onChangeText={setPort}
                keyboardType="numeric"
              />
              <Field
                label={t('dns.srv_weight')}
                placeholder="1"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </>
          )}

          {type === 'CAA' && (
            <>
              <FieldLabel>{t('dns.caa_tag')}</FieldLabel>
              <ChipRow
                options={CAA_TAGS.map((tag) => ({ value: tag, label: tag }))}
                value={caaTag}
                onChange={setCaaTag}
              />
              <Field
                label={t('dns.caa_value')}
                placeholder={caaTag === 'iodef' ? 'mailto:security@example.com' : 'letsencrypt.org'}
                value={caaValue}
                onChangeText={setCaaValue}
                autoCapitalize="none"
                autoCorrect={false}
                mono
              />
              <Field
                label={t('dns.caa_flags')}
                placeholder="0"
                value={caaFlags}
                onChangeText={setCaaFlags}
                keyboardType="numeric"
              />
            </>
          )}
        </View>

        {/* Advanced */}
        <SectionHeader title="Advanced" />
        <View style={styles.fields}>
          <Field
            label={`${t('dns.ttl')} (1 = Auto)`}
            placeholder="1"
            value={ttl}
            onChangeText={setTtl}
            keyboardType="numeric"
          />
          {showPriority && (
            <Field
              label={t('dns.priority')}
              placeholder="10"
              value={priority}
              onChangeText={setPriority}
              keyboardType="numeric"
            />
          )}
          <Field
            label={t('dns.comment')}
            placeholder={t('dns.comment_placeholder')}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Proxy toggle — the whole row toggles, as well as the switch */}
        {showProxyToggle && (
          <Group style={styles.proxy}>
            <TouchableOpacity onPress={() => setProxied(!proxied)} activeOpacity={0.85}>
              <ToggleRow
                icon={proxied ? 'cloud' : 'cloud-off'}
                iconTone={proxied ? 'accent' : 'neutral'}
                title={proxied ? 'Proxied (Orange Cloud)' : 'DNS Only (Grey Cloud)'}
                subtitle={proxied
                  ? 'Traffic routed through Cloudflare CDN & protection'
                  : 'Direct DNS resolution, no Cloudflare proxy'}
                value={proxied}
                onValueChange={setProxied}
              />
            </TouchableOpacity>
          </Group>
        )}

        <Button
          title={isEdit ? t('dns.update') : t('dns.create')}
          onPress={handleSave}
          loading={loading}
          size="lg"
          style={{ marginTop: Spacing.xl }}
        />
      </ScrollView>

      <Sheet
        visible={!!pending}
        onClose={() => { if (!loading) setPending(null); }}
        title={isEdit ? t('history.review_title') : t('history.review_new')}
        footer={
          <Button
            title={t('common.apply')}
            onPress={applyPending}
            loading={loading}
            size="lg"
          />
        }
      >
        <Text style={[styles.reviewHint, { color: colors.textSecondary }]}>
          {isEdit ? t('history.review_hint') : t('history.review_new_hint')}
        </Text>
        {!!pending && <ChangeDiff changes={pending.changes} />}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  typeDesc: { fontSize: FontSize.sm, marginTop: Spacing.sm, paddingHorizontal: Spacing.xs },
  // Field brings its own top margin; pull the first one back under the section title.
  fields: { marginTop: -Spacing.md },
  proxy: { marginTop: Spacing.xl },
  reviewHint: { fontSize: FontSize.sm, marginBottom: Spacing.md },
});
