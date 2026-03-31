import { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Alert, Switch, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DNSRecordType, DNSRecordInput } from '@/services/types';

const RECORD_TYPES: DNSRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV', 'CAA'];

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

  return (
    <>
      <Stack.Screen options={{ title: isEdit ? t('dns.edit_record') : t('dns.add_record') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Type Selector */}
        <Text style={[styles.label, { color: colors.textSecondary }]}>{t('dns.type')}</Text>
        <View style={styles.typeGrid}>
          {RECORD_TYPES.map((rt) => (
            <TouchableOpacity
              key={rt}
              onPress={() => setType(rt)}
              style={[
                styles.typeChip,
                {
                  backgroundColor: type === rt ? colors.primary : colors.surface,
                  borderColor: type === rt ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={{
                fontSize: FontSize.sm,
                fontWeight: '600',
                color: type === rt ? '#FFF' : colors.text,
              }}>
                {rt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          label={t('dns.name')}
          placeholder="@, subdomain, or full domain"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          label={t('dns.content')}
          placeholder={type === 'A' ? '192.168.1.1' : type === 'AAAA' ? '2001:db8::1' : type === 'CNAME' ? 'target.example.com' : t('dns.content')}
          value={content}
          onChangeText={setContent}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={type === 'TXT'}
        />

        <Input
          label={t('dns.ttl')}
          placeholder="1 = Auto"
          value={ttl}
          onChangeText={setTtl}
          keyboardType="numeric"
        />

        {showPriority && (
          <Input
            label={t('dns.priority')}
            placeholder="10"
            value={priority}
            onChangeText={setPriority}
            keyboardType="numeric"
          />
        )}

        <Input
          label={t('dns.comment')}
          placeholder={t('dns.comment_placeholder')}
          value={comment}
          onChangeText={setComment}
        />

        {showProxyToggle && (
          <View style={[styles.proxyRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.proxyTitle, { color: colors.text }]}>{t('dns.proxied')}</Text>
              <Text style={[styles.proxyDesc, { color: colors.textSecondary }]}>{t('dns.proxied_desc')}</Text>
            </View>
            <Switch
              value={proxied}
              onValueChange={setProxied}
              trackColor={{ true: colors.primary }}
            />
          </View>
        )}

        <Button
          title={isEdit ? t('dns.update') : t('dns.create')}
          onPress={handleSave}
          loading={loading}
          size="lg"
          style={{ marginTop: Spacing.md }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.md },
  label: { fontSize: FontSize.sm, fontWeight: '500' },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  typeChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  proxyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.md,
  },
  proxyTitle: { fontSize: FontSize.md, fontWeight: '500' },
  proxyDesc: { fontSize: FontSize.sm, marginTop: 2 },
});
