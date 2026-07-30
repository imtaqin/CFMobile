import { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Alert, Switch, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { recordHappyMoment } from '@/services/review-prompt';
import { DNSRecordType, DNSRecordInput } from '@/services/types';

const RECORD_TYPES: DNSRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV', 'CAA'];

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

const TYPE_COLORS: Partial<Record<DNSRecordType, string>> = {
  A: '#3B82F6', AAAA: '#6366F1', CNAME: '#8B5CF6', MX: '#EC4899',
  TXT: '#F59E0B', NS: '#10B981', SRV: '#EF4444', CAA: '#14B8A6',
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
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit && recordId) {
      (async () => {
        try {
          const res = await api.getDnsRecord(id, recordId);
          const r = res.result;
          setType(r.type);
          setName(r.name);
          setContent(r.content);
          setTtl(String(r.ttl));
          setProxied(r.proxied);
          if (r.priority !== undefined) setPriority(String(r.priority));
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

  const handleSave = async () => {
    if (!name.trim() || !content.trim()) {
      Alert.alert(t('common.error'), t('dns.fields_required'));
      return;
    }

    setLoading(true);
    const record: DNSRecordInput = {
      type,
      name: name.trim(),
      content: content.trim(),
      ttl: parseInt(ttl) || 1,
      proxied: ['A', 'AAAA', 'CNAME'].includes(type) ? proxied : false,
      comment: comment.trim() || undefined,
    };
    if (['MX', 'SRV'].includes(type)) {
      record.priority = parseInt(priority) || 10;
    }

    try {
      if (isEdit && recordId) {
        await api.updateDnsRecord(id, recordId, record);
      } else {
        await api.createDnsRecord(id, record);
      }
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
  const typeColor = TYPE_COLORS[type];

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
          <TouchableOpacity
            style={[styles.templateBanner, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '30' }]}
            onPress={() => router.replace({ pathname: `/zone/[id]/dns-templates` as any, params: { id } })}
            activeOpacity={0.8}
          >
            <View style={[styles.templateBannerIcon, { backgroundColor: colors.primary }]}>
              <Icon name="layers" size={18} color="#FFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.templateBannerTitle, { color: colors.primary }]}>
                Use a template instead
              </Text>
              <Text style={[styles.templateBannerSub, { color: colors.textSecondary }]}>
                One-tap setup for Vercel, Netlify, GitHub Pages, Google Workspace…
              </Text>
            </View>
            <Icon name="chevron-right" size={18} color={colors.primary} />
          </TouchableOpacity>
        )}

        {/* Type selector — hero card */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Record Type</Text>
          <View style={styles.typeGrid}>
            {RECORD_TYPES.map((rt) => {
              const active = type === rt;
              const c = TYPE_COLORS[rt];
              return (
                <TouchableOpacity
                  key={rt}
                  onPress={() => setType(rt)}
                  style={[
                    styles.typeChip,
                    {
                      backgroundColor: active ? c : colors.surfaceSecondary,
                      borderColor: active ? c : 'transparent',
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Text style={{
                    fontSize: FontSize.sm,
                    fontWeight: '800',
                    color: active ? '#FFF' : c,
                    letterSpacing: 0.3,
                  }}>
                    {rt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={[styles.typeDescBox, { backgroundColor: typeColor + '12' }]}>
            <Icon name="info" size={14} color={typeColor} />
            <Text style={[styles.typeDescText, { color: typeColor }]}>
              {TYPE_DESCRIPTIONS[type]}
            </Text>
          </View>
        </View>

        {/* Name + Content */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Record Details</Text>
          <Input
            label={t('dns.name')}
            placeholder="@, www, app.example.com"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={{ height: Spacing.md }} />
          <Input
            label={t('dns.content')}
            placeholder={placeholderForType(type)}
            value={content}
            onChangeText={setContent}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={type === 'TXT'}
          />
        </View>

        {/* Advanced */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Advanced</Text>
          <Input
            label={`${t('dns.ttl')} (1 = Auto)`}
            placeholder="1"
            value={ttl}
            onChangeText={setTtl}
            keyboardType="numeric"
          />
          {showPriority && (
            <>
              <View style={{ height: Spacing.md }} />
              <Input
                label={t('dns.priority')}
                placeholder="10"
                value={priority}
                onChangeText={setPriority}
                keyboardType="numeric"
              />
            </>
          )}
          <View style={{ height: Spacing.md }} />
          <Input
            label={t('dns.comment')}
            placeholder={t('dns.comment_placeholder')}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Proxy toggle */}
        {showProxyToggle && (
          <TouchableOpacity
            style={[styles.proxyCard, {
              backgroundColor: colors.surface,
              borderColor: proxied ? '#F6821F' : colors.borderLight,
            }]}
            onPress={() => setProxied(!proxied)}
            activeOpacity={0.85}
          >
            <View style={[styles.proxyIcon, { backgroundColor: (proxied ? '#F6821F' : colors.textTertiary) + '15' }]}>
              <Icon name={proxied ? 'cloud' : 'cloud-off'} size={22} color={proxied ? '#F6821F' : colors.textTertiary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.proxyTitle, { color: colors.text }]}>
                {proxied ? 'Proxied (Orange Cloud)' : 'DNS Only (Grey Cloud)'}
              </Text>
              <Text style={[styles.proxyDesc, { color: colors.textSecondary }]}>
                {proxied
                  ? 'Traffic routed through Cloudflare CDN & protection'
                  : 'Direct DNS resolution, no Cloudflare proxy'}
              </Text>
            </View>
            <Switch
              value={proxied}
              onValueChange={setProxied}
              trackColor={{ true: '#F6821F', false: colors.border }}
              thumbColor="#FFF"
            />
          </TouchableOpacity>
        )}

        <Button
          title={isEdit ? t('dns.update') : t('dns.create')}
          onPress={handleSave}
          loading={loading}
          size="lg"
          style={{ marginTop: Spacing.sm }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.md },

  templateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  templateBannerIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateBannerTitle: { fontSize: FontSize.sm, fontWeight: '700' },
  templateBannerSub: { fontSize: 11, lineHeight: 14, marginTop: 2 },

  section: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  typeChip: {
    minWidth: 64,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  typeDescBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    marginTop: 4,
  },
  typeDescText: { fontSize: FontSize.xs, fontWeight: '600', flex: 1 },

  proxyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
  },
  proxyIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proxyTitle: { fontSize: FontSize.md, fontWeight: '700' },
  proxyDesc: { fontSize: 11, lineHeight: 14, marginTop: 2 },
});
