import { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Alert, TextInput,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { recordHappyMoment } from '@/services/review-prompt';

export default function CacheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [purging, setPurging] = useState(false);
  const [purgingUrls, setPurgingUrls] = useState(false);
  const [urls, setUrls] = useState('');

  const purgeAll = () => {
    Alert.alert(
      t('cache.purge_all_title'),
      t('cache.purge_all_confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('cache.purge'),
          style: 'destructive',
          onPress: async () => {
            setPurging(true);
            try {
              await api.purgeAllCache(id);
              Alert.alert(t('common.success'), t('cache.purge_all_success'));
              recordHappyMoment();
            } catch (e: any) {
              const msg = e?.response?.data?.errors?.[0]?.message ?? t('cache.purge_error');
              Alert.alert(t('common.error'), msg);
            } finally {
              setPurging(false);
            }
          },
        },
      ]
    );
  };

  const purgeByUrls = async () => {
    const urlList = urls.split('\n').map((u) => u.trim()).filter(Boolean);
    if (urlList.length === 0) {
      Alert.alert(t('common.error'), t('cache.enter_urls'));
      return;
    }
    setPurgingUrls(true);
    try {
      await api.purgeUrls(id, urlList);
      Alert.alert(t('common.success'), t('cache.purge_urls_success', { count: urlList.length }));
      recordHappyMoment();
      setUrls('');
    } catch (e: any) {
      const msg = e?.response?.data?.errors?.[0]?.message ?? t('cache.purge_error');
      Alert.alert(t('common.error'), msg);
    } finally {
      setPurgingUrls(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: t('cache.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Purge Everything */}
        <SectionHeader title={t('cache.purge_everything')} />
        <Card style={styles.purgeCard}>
          <View style={[styles.iconWrap, { backgroundColor: colors.error + '15' }]}>
            <Icon name="delete-sweep" size={32} color={colors.error} />
          </View>
          <Text style={[styles.purgeTitle, { color: colors.text }]}>{t('cache.purge_all_title')}</Text>
          <Text style={[styles.purgeDesc, { color: colors.textSecondary }]}>
            {t('cache.purge_all_desc')}
          </Text>
          <Button
            title={t('cache.purge_everything')}
            onPress={purgeAll}
            variant="danger"
            loading={purging}
            size="lg"
            style={{ alignSelf: 'stretch' }}
          />
        </Card>

        {/* Purge by URL */}
        <SectionHeader title={t('cache.purge_by_url')} />
        <Card>
          <Text style={[styles.urlLabel, { color: colors.textSecondary }]}>
            {t('cache.purge_urls_desc')}
          </Text>
          <TextInput
            style={[styles.urlInput, {
              backgroundColor: colors.inputBg,
              color: colors.text,
              borderColor: colors.border,
            }]}
            placeholder={t('cache.urls_placeholder')}
            placeholderTextColor={colors.textTertiary}
            value={urls}
            onChangeText={setUrls}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button
            title={t('cache.purge_urls')}
            onPress={purgeByUrls}
            variant="primary"
            loading={purgingUrls}
            style={{ marginTop: Spacing.md }}
          />
        </Card>

        {/* Info */}
        <Card style={styles.infoCard}>
          <Icon name="info" size={20} color={colors.info} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {t('cache.info')}
          </Text>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  purgeCard: {
    alignItems: 'center' as const,
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purgeTitle: { fontSize: FontSize.lg, fontWeight: '600' },
  purgeDesc: { fontSize: FontSize.sm, textAlign: 'center' },
  urlLabel: { fontSize: FontSize.sm, marginBottom: Spacing.sm },
  urlInput: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
    minHeight: 120,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  infoText: { flex: 1, fontSize: FontSize.sm, lineHeight: 20 },
});
