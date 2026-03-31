import { StyleSheet, View, Text, ScrollView, Alert, Switch } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { Icon } from '@/components/ui/icon';
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

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { user, authConfig, logout, accounts, accountId, switchAccount } = useAuth();

  const currentLang = i18n.language;

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
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
            {user?.first_name ? `${user.first_name} ${user.last_name ?? ''}`.trim() : user?.email?.split('@')[0]}
          </Text>
          <Text style={[styles.accountEmail, { color: colors.textSecondary }]}>{user?.email}</Text>
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
            {accounts.map((acc) => (
              <MenuItem
                key={acc.id}
                icon="user"
                iconColor={acc.id === accountId ? colors.primary : colors.textSecondary}
                title={acc.name}
                subtitle={acc.id.slice(0, 12) + '...'}
                onPress={() => switchAccount(acc.id)}
                trailing={
                  acc.id === accountId ? (
                    <Icon name="check-circle" size={22} color={colors.success} />
                  ) : undefined
                }
              />
            ))}
          </Card>
        </>
      )}

      {/* Language */}
      <SectionHeader title={t('settings.language')} />
      <Card style={{ padding: 0, overflow: 'hidden' as const }}>
        {LANGUAGES.map((lang, idx) => (
          <MenuItem
            key={lang.code}
            icon="languages"
            iconColor={colors.info}
            title={lang.name}
            subtitle={lang.flag}
            onPress={() => switchLanguage(lang.code)}
            trailing={
              currentLang === lang.code ? (
                <Icon name="check-circle" size={22} color={colors.success} />
              ) : undefined
            }
          />
        ))}
      </Card>

      {/* Account Info */}
      <SectionHeader title={t('settings.account_info')} />
      <Card style={{ padding: 0, overflow: 'hidden' as const }}>
        <MenuItem
          icon="mail"
          iconColor={colors.info}
          title={t('settings.email')}
          subtitle={user?.email ?? '-'}
          onPress={() => {}}
          trailing={null}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <MenuItem
          icon="user"
          iconColor={colors.success}
          title={t('settings.username')}
          subtitle={user?.username ?? '-'}
          onPress={() => {}}
          trailing={null}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <MenuItem
          icon="key"
          iconColor={colors.warning}
          title={t('settings.auth_method')}
          subtitle={authConfig?.method === 'token' ? 'API Token (Bearer)' : 'Global API Key'}
          onPress={() => {}}
          trailing={null}
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
          onPress={() => {}}
          trailing={null}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <MenuItem
          icon="link"
          iconColor={colors.info}
          title={t('settings.api_version')}
          subtitle="v4"
          onPress={() => {}}
          trailing={null}
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
        CloudFlare Mobile v1.0.0
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
  divider: { height: 1, marginLeft: 64 },
  version: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    marginTop: Spacing.xxl,
  },
});
