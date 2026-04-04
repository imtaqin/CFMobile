import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { useThemeContext, ThemeMode } from '@/contexts/theme';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { MenuItem } from '@/components/ui/menu-item';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import i18n from '@/i18n';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'id', name: 'Bahasa Indonesia', flag: 'ID' },
];

const THEME_OPTIONS: { mode: ThemeMode; icon: IconName; labelKey: string }[] = [
  { mode: 'light', icon: 'sun', labelKey: 'settings.theme_light' },
  { mode: 'dark', icon: 'moon', labelKey: 'settings.theme_dark' },
  { mode: 'system', icon: 'smartphone', labelKey: 'settings.theme_system' },
];

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const { mode: themeMode, setMode: setThemeMode } = useThemeContext();
  const { user, authConfig, logout, accounts, accountId, switchAccount } = useAuth();

  const currentLang = i18n.language;
  const [langOpen, setLangOpen] = useState(false);
  const [showSensitive, setShowSensitive] = useState(false);

  const dots = '\u2022\u2022\u2022\u2022';
  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    if (!domain) return dots + dots;
    return local.slice(0, 2) + dots + '@' + domain;
  };

  const maskId = (id: string) => {
    if (id.length <= 8) return dots + dots;
    return id.slice(0, 4) + dots + id.slice(-4);
  };

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const handleLogout = () => {
    Alert.alert(
      t('settings.logout'),
      t('settings.logout_confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.logout'),
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Account Card */}
      <Card style={styles.accountCard}>
        <View style={[styles.avatar, { backgroundColor: CF.orange }]}>
          <Text style={styles.avatarText}>
            {(user?.first_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.accountName, { color: colors.text }]}>
            {user?.first_name ? `${user.first_name} ${user.last_name ?? ''}`.trim() : 'User'}
          </Text>
          <Text style={[styles.accountEmail, { color: colors.textSecondary }]}>
            {showSensitive ? user?.email : maskEmail(user?.email ?? '')}
          </Text>
        </View>
        <Badge
          label={authConfig?.method === 'token' ? 'TOKEN' : 'KEY'}
          variant="info"
        />
      </Card>

      {/* Account Switcher */}
      {accounts.length > 1 && (
        <>
          <SectionHeader title={t('settings.switch_account')} />
          <Card style={{ padding: 0, overflow: 'hidden' as const }}>
            {accounts.map((acc, idx) => (
              <View key={acc.id}>
                {idx > 0 && <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />}
                <MenuItem
                  icon="user"
                  iconColor={acc.id === accountId ? colors.primary : colors.textSecondary}
                  title={acc.name.includes('@') ? maskEmail(acc.name) : acc.name}
                  subtitle={acc.id.slice(0, 4) + '\u2022\u2022\u2022\u2022'}
                  onPress={() => switchAccount(acc.id)}
                  trailing={
                    acc.id === accountId ? (
                      <Icon name="check-circle" size={22} color={colors.success} />
                    ) : undefined
                  }
                />
              </View>
            ))}
          </Card>
        </>
      )}

      {/* Theme */}
      <SectionHeader title={t('settings.appearance')} />
      <Card style={{ padding: 0, overflow: 'hidden' as const }}>
        <View style={styles.themeRow}>
          {THEME_OPTIONS.map((opt) => {
            const isSelected = themeMode === opt.mode;
            return (
              <TouchableOpacity
                key={opt.mode}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor: isSelected ? colors.primary + '18' : colors.surfaceSecondary,
                    borderColor: isSelected ? colors.primary : 'transparent',
                  },
                ]}
                onPress={() => setThemeMode(opt.mode)}
                activeOpacity={0.7}
              >
                <Icon
                  name={opt.icon}
                  size={22}
                  color={isSelected ? colors.primary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.themeLabel,
                    { color: isSelected ? colors.primary : colors.textSecondary },
                  ]}
                >
                  {t(opt.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {/* Language */}
      <SectionHeader title={t('settings.language')} />
      <Card style={{ padding: 0, overflow: 'hidden' as const }}>
        <TouchableOpacity
          style={[styles.dropdownHeader, { backgroundColor: colors.surface }]}
          onPress={() => setLangOpen(!langOpen)}
          activeOpacity={0.6}
        >
          <View style={[styles.iconWrap, { backgroundColor: colors.info + '15' }]}>
            <Icon name="languages" size={20} color={colors.info} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.dropdownTitle, { color: colors.text }]}>
              {LANGUAGES.find((l) => l.code === currentLang)?.name ?? 'English'}
            </Text>
          </View>
          <Icon name={langOpen ? 'chevron-down' : 'chevron-right'} size={20} color={colors.textTertiary} />
        </TouchableOpacity>
        {langOpen && LANGUAGES.map((lang) => {
          const isSelected = currentLang === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.dropdownItem, { backgroundColor: isSelected ? colors.primary + '10' : colors.surface }]}
              onPress={() => switchLanguage(lang.code)}
              activeOpacity={0.6}
            >
              <Text style={[styles.dropdownItemText, { color: isSelected ? colors.primary : colors.text }]}>
                {lang.flag}  {lang.name}
              </Text>
              {isSelected && <Icon name="check-circle" size={20} color={colors.success} />}
            </TouchableOpacity>
          );
        })}
      </Card>

      {/* Account Info */}
      <SectionHeader
        title={t('settings.account_info')}
        action={
          <TouchableOpacity onPress={() => setShowSensitive(!showSensitive)}>
            <Icon name={showSensitive ? 'pageview' : 'lock-outline'} size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        }
      />
      <Card style={{ padding: 0, overflow: 'hidden' as const }}>
        <MenuItem
          icon="mail"
          iconColor={colors.info}
          title={t('settings.email')}
          subtitle={showSensitive ? (user?.email ?? '-') : maskEmail(user?.email ?? '-')}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <MenuItem
          icon="user"
          iconColor={colors.success}
          title={t('settings.username')}
          subtitle={showSensitive ? (user?.username ?? '-') : maskId(user?.username ?? '-')}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <MenuItem
          icon="key"
          iconColor={colors.warning}
          title={t('settings.auth_method')}
          subtitle={authConfig?.method === 'token' ? 'API Token (Bearer)' : 'Global API Key'}
        />
      </Card>

      {/* API Info */}
      <SectionHeader title={t('settings.api_info')} />
      <Card style={{ padding: 0, overflow: 'hidden' as const }}>
        <MenuItem
          icon="zap"
          iconColor={colors.warning}
          title={t('settings.rate_limit')}
          subtitle="1,200 req / 5 min"
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <MenuItem
          icon="link"
          iconColor={colors.info}
          title={t('settings.api_version')}
          subtitle="v4"
        />
      </Card>

      {/* Logout */}
      <Card style={{ padding: 0, overflow: 'hidden' as const, marginTop: Spacing.lg }}>
        <MenuItem
          icon="logout"
          title={t('settings.logout')}
          onPress={handleLogout}
          danger
          trailing={null}
        />
      </Card>

      <Text style={[styles.version, { color: colors.textTertiary }]}>
        CloudFlare Mobile v1.1.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontSize: FontSize.xl, fontWeight: '700' },
  accountName: { fontSize: FontSize.lg, fontWeight: '600' },
  accountEmail: { fontSize: FontSize.sm, marginTop: 2 },
  themeRow: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 2,
  },
  themeLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownTitle: {
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingLeft: Spacing.lg + 36 + Spacing.md,
  },
  dropdownItemText: {
    fontSize: FontSize.md,
  },
  divider: { height: 1, marginLeft: 64 },
  version: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    marginTop: Spacing.xxl,
  },
});
