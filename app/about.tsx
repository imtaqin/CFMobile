import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import { CURRENT_VERSION } from '@/services/version-check';

interface SocialLink {
  icon: IconName;
  label: string;
  value: string;
  url: string;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { icon: 'code', label: 'GitHub', value: '@imtaqin', url: 'https://github.com/imtaqin', color: '#181717' },
  { icon: 'globe', label: 'Website', value: 'imtaqin.id', url: 'https://imtaqin.id', color: '#3B82F6' },
  { icon: 'mail', label: 'Email', value: 'cp@imtaqin.id', url: 'mailto:cp@imtaqin.id', color: '#EC4899' },
];

interface OtherApp {
  name: string;
  tagline: string;
  icon: IconName;
  color: string;
  packageName: string;
}

const OTHER_APPS: OtherApp[] = [
  {
    name: 'NiceSSH',
    tagline: 'Free SSH client — manage your servers from your phone',
    icon: 'server',
    color: '#10B981',
    packageName: 'com.imtaqin.nice_ssh',
  },
];

const APP_LINKS: SocialLink[] = [
  { icon: 'code', label: 'Source code', value: 'github.com/imtaqin/CFMobile', url: 'https://github.com/imtaqin/CFMobile', color: '#181717' },
  { icon: 'shield', label: 'Privacy Policy', value: 'imtaqin.id', url: 'https://imtaqin.id/page/-privacy-policy-cloudflare-mobile', color: '#10B981' },
  { icon: 'info', label: 'License', value: 'MIT', url: 'https://opensource.org/licenses/MIT', color: '#F59E0B' },
];

export default function AboutScreen() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();

  const open = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <>
      <Stack.Screen options={{ title: t('about.title'), headerShown: true }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* App Hero */}
        <View style={[styles.appHero, { backgroundColor: isDark ? '#1A1F2E' : CF.orange }]}>
          <View style={[styles.appLogo, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Icon name="cloudflare" size={36} color="#FFFFFF" />
          </View>
          <Text style={styles.appName}>CloudFlare Mobile</Text>
          <View style={styles.versionRow}>
            <Text style={styles.appVersion}>v{CURRENT_VERSION}</Text>
          </View>
          <Text style={styles.appTagline}>
            {t('about.app_tagline')}
          </Text>
        </View>

        {/* Developer Card */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t('about.developer')}
        </Text>
        <View style={[styles.devCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <Image
            source={{ uri: 'https://github.com/imtaqin.png' }}
            style={styles.avatar}
          />
          <Text style={[styles.devName, { color: colors.text }]}>Abdul Mutataqin</Text>
          <Text style={[styles.devHandle, { color: colors.primary }]}>@imtaqin</Text>
          <Text style={[styles.devBio, { color: colors.textSecondary }]}>
            {t('about.dev_bio')}
          </Text>

          <View style={styles.socialGrid}>
            {SOCIAL_LINKS.map((link) => (
              <TouchableOpacity
                key={link.url}
                style={[styles.socialBtn, { backgroundColor: colors.surfaceSecondary }]}
                onPress={() => open(link.url)}
                activeOpacity={0.7}
              >
                <View style={[styles.socialIcon, { backgroundColor: link.color + '20' }]}>
                  <Icon name={link.icon} size={16} color={link.color === '#181717' && isDark ? '#FFF' : link.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.socialLabel, { color: colors.textTertiary }]}>{link.label}</Text>
                  <Text style={[styles.socialValue, { color: colors.text }]} numberOfLines={1}>{link.value}</Text>
                </View>
                <Icon name="link" size={14} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* More apps by this developer */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t('about.more_apps')}
        </Text>
        <View style={[styles.linkList, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          {OTHER_APPS.map((app, idx) => (
            <View key={app.packageName}>
              {idx > 0 && <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />}
              <TouchableOpacity
                style={styles.linkRow}
                onPress={() => open(`https://play.google.com/store/apps/details?id=${app.packageName}`)}
                activeOpacity={0.7}
              >
                <View style={[styles.linkIcon, { backgroundColor: app.color + '18' }]}>
                  <Icon name={app.icon} size={20} color={app.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.linkLabel, { color: colors.text }]}>{app.name}</Text>
                  <Text style={[styles.linkValue, { color: colors.textSecondary }]} numberOfLines={2}>
                    {app.tagline}
                  </Text>
                </View>
                <View style={[styles.getBadge, { backgroundColor: app.color }]}>
                  <Text style={styles.getBadgeText}>{t('about.get')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Project Links */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t('about.project')}
        </Text>
        <View style={[styles.linkList, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          {APP_LINKS.map((link, idx) => (
            <View key={link.url}>
              {idx > 0 && <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />}
              <TouchableOpacity
                style={styles.linkRow}
                onPress={() => open(link.url)}
                activeOpacity={0.7}
              >
                <View style={[styles.linkIcon, { backgroundColor: link.color + '15' }]}>
                  <Icon name={link.icon} size={18} color={link.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.linkLabel, { color: colors.text }]}>{link.label}</Text>
                  <Text style={[styles.linkValue, { color: colors.textTertiary }]} numberOfLines={1}>{link.value}</Text>
                </View>
                <Icon name="chevron-right" size={18} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={[styles.disclaimer, { backgroundColor: colors.warning + '12', borderColor: colors.warning + '30' }]}>
          <Icon name="warning" size={16} color={colors.warning} />
          <Text style={[styles.disclaimerText, { color: colors.textSecondary }]}>
            {t('about.disclaimer')}
          </Text>
        </View>

        <Text style={[styles.copyright, { color: colors.textTertiary }]}>
          © 2026 Abdul Mutataqin · MIT License
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.lg },

  // App hero
  appHero: {
    alignItems: 'center',
    padding: Spacing.xxl,
    borderRadius: Radius.xl,
    gap: Spacing.sm,
  },
  appLogo: {
    width: 72,
    height: 72,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: '#FFF',
    fontSize: FontSize.xxl,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginTop: 4,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appVersion: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  appTagline: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: FontSize.sm,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },

  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: Spacing.sm,
    marginBottom: -Spacing.xs,
  },

  // Dev card
  devCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 6,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Spacing.sm,
  },
  devName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  devHandle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  devBio: {
    fontSize: FontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  socialGrid: {
    width: '100%',
    gap: Spacing.sm,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: Radius.md,
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  socialValue: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginTop: 1,
  },

  // Project links
  linkList: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
  },
  linkIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkLabel: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  linkValue: {
    fontSize: FontSize.xs,
    marginTop: 1,
    lineHeight: 15,
  },
  getBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  getBadgeText: {
    color: '#FFF',
    fontSize: FontSize.xs,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    marginLeft: 64,
  },

  // Disclaimer
  disclaimer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  disclaimerText: {
    flex: 1,
    fontSize: FontSize.xs,
    lineHeight: 16,
  },

  copyright: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    fontWeight: '500',
    marginTop: Spacing.md,
  },
});
