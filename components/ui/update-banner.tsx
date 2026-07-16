import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from './icon';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import { checkForUpdate, VersionInfo } from '@/services/version-check';

const STORAGE_KEY = 'cf_update_dismissed';

const storage = {
  get: async (): Promise<string | null> => {
    if (Platform.OS === 'web') return localStorage.getItem(STORAGE_KEY);
    const SecureStore = require('expo-secure-store');
    return SecureStore.getItemAsync(STORAGE_KEY);
  },
  set: async (v: string): Promise<void> => {
    if (Platform.OS === 'web') { localStorage.setItem(STORAGE_KEY, v); return; }
    const SecureStore = require('expo-secure-store');
    return SecureStore.setItemAsync(STORAGE_KEY, v);
  },
};

export function UpdateBanner() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [info, setInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    (async () => {
      const result = await checkForUpdate();
      if (!result || !result.hasUpdate) return;
      // Check if user dismissed this specific version
      const dismissed = await storage.get();
      if (dismissed === result.latest) return;
      setInfo(result);
    })();
  }, []);

  if (!info) return null;

  const dismiss = async () => {
    await storage.set(info.latest);
    setInfo(null);
  };

  const update = () => {
    Linking.openURL(info.releaseUrl).catch(() => {});
  };

  return (
    <View style={[styles.banner, { backgroundColor: colors.primary }]}>
      <View style={[styles.iconWrap, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
        <Icon name="download" size={18} color="#FFF" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{t('update.title', { version: info.latest })}</Text>
        <Text style={styles.subtitle}>
          {t('update.subtitle', { current: info.current })}
        </Text>
      </View>
      <TouchableOpacity onPress={update} style={styles.actionBtn} activeOpacity={0.8}>
        <Text style={styles.actionText}>{t('update.update_now')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={dismiss} hitSlop={8} style={{ padding: 4 }}>
        <Icon name="close" size={18} color="rgba(255,255,255,0.7)" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    margin: Spacing.lg,
    marginBottom: 0,
    padding: Spacing.md,
    borderRadius: Radius.lg,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    marginTop: 1,
  },
  actionBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.full,
  },
  actionText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
});
