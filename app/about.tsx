import { StyleSheet, View, Text, ScrollView, Linking, Image } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, Group, ListRow } from '@/components/ui/kit';
import { Spacing, FontSize } from '@/constants/theme';
import { CURRENT_VERSION } from '@/services/version-check';

interface LinkItem {
  icon: IconName;
  label: string;
  value: string;
  url: string;
}

const SOCIAL_LINKS: LinkItem[] = [
  { icon: 'code', label: 'GitHub', value: '@imtaqin', url: 'https://github.com/imtaqin' },
  { icon: 'globe', label: 'Website', value: 'imtaqin.id', url: 'https://imtaqin.id' },
  { icon: 'mail', label: 'Email', value: 'cp@imtaqin.id', url: 'mailto:cp@imtaqin.id' },
];

interface OtherApp {
  name: string;
  tagline: string;
  icon: IconName;
  packageName: string;
}

const OTHER_APPS: OtherApp[] = [
  {
    name: 'NiceSSH',
    tagline: 'Free SSH client — manage your servers from your phone',
    icon: 'server',
    packageName: 'com.imtaqin.nice_ssh',
  },
];

const APP_LINKS: LinkItem[] = [
  { icon: 'code', label: 'Source code', value: 'github.com/imtaqin/CFMobile', url: 'https://github.com/imtaqin/CFMobile' },
  { icon: 'download', label: 'F-Droid', value: 'Ad-free build', url: 'https://f-droid.org/packages/id.imtaqin.cfmobile/' },
  { icon: 'shield', label: 'Privacy Policy', value: 'imtaqin.id', url: 'https://imtaqin.id/page/-privacy-policy-cloudflare-mobile' },
  { icon: 'info', label: 'License', value: 'MIT', url: 'https://opensource.org/licenses/MIT' },
];

export default function AboutScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const open = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <>
      <Stack.Screen options={{ title: t('about.title'), headerShown: true }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* The app */}
        <Card style={styles.centerCard}>
          <View style={[styles.logo, { backgroundColor: colors.surfaceSecondary }]}>
            <Icon name="cloudflare" size={32} color={colors.primary} />
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>CloudFlare Mobile</Text>
          <Text style={[styles.appVersion, { color: colors.textTertiary }]}>v{CURRENT_VERSION}</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>{t('about.app_tagline')}</Text>
        </Card>

        {/* Developer */}
        <SectionHeader title={t('about.developer')} />
        <Card style={styles.centerCard}>
          <Image
            source={{ uri: 'https://github.com/imtaqin.png' }}
            style={[styles.avatar, { backgroundColor: colors.surfaceSecondary }]}
          />
          <Text style={[styles.devName, { color: colors.text }]}>Abdul Mutataqin</Text>
          <Text style={[styles.appVersion, { color: colors.textTertiary }]}>@imtaqin</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>{t('about.dev_bio')}</Text>
        </Card>
        <Group style={styles.below}>
          {SOCIAL_LINKS.map((link) => (
            <ListRow
              key={link.url}
              icon={link.icon}
              title={link.label}
              subtitle={link.value}
              onPress={() => open(link.url)}
            />
          ))}
        </Group>

        {/* More apps by this developer */}
        <SectionHeader title={t('about.more_apps')} />
        <Group>
          {OTHER_APPS.map((app) => (
            <ListRow
              key={app.packageName}
              icon={app.icon}
              title={app.name}
              subtitle={app.tagline}
              onPress={() => open(`https://play.google.com/store/apps/details?id=${app.packageName}`)}
              trailing={<Text style={[styles.get, { color: colors.primary }]}>{t('about.get')}</Text>}
            />
          ))}
        </Group>

        {/* Project links */}
        <SectionHeader title={t('about.project')} />
        <Group>
          {APP_LINKS.map((link) => (
            <ListRow
              key={link.url}
              icon={link.icon}
              title={link.label}
              subtitle={link.value}
              onPress={() => open(link.url)}
            />
          ))}
        </Group>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Banner tone="warning" message={t('about.disclaimer')} />
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
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },

  centerCard: { alignItems: 'center', gap: 4, paddingVertical: Spacing.xl },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  appName: { fontSize: FontSize.xl, fontWeight: '500', letterSpacing: -0.2 },
  appVersion: { fontSize: FontSize.sm },
  body: { fontSize: FontSize.sm, lineHeight: 19, textAlign: 'center', marginTop: Spacing.sm },

  avatar: { width: 64, height: 64, borderRadius: 32, marginBottom: Spacing.sm },
  devName: { fontSize: FontSize.lg, fontWeight: '500' },
  below: { marginTop: Spacing.sm },

  get: { fontSize: FontSize.sm, fontWeight: '500' },

  disclaimer: { marginTop: Spacing.xl },
  copyright: { textAlign: 'center', fontSize: FontSize.xs, marginTop: Spacing.lg },
});
