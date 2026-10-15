import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks/use-theme';
import { Icon } from '@/components/ui/icon';
import { SectionHeader } from '@/components/ui/section-header';
import { Sheet } from '@/components/ui/sheet';
import { PinPad } from '@/components/ui/pin-pad';
import { PatternPad } from '@/components/ui/pattern-pad';
import { ChipRow, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { FontSize, Spacing } from '@/constants/theme';
import * as appLock from '@/services/app-lock';

type Secret = Exclude<appLock.LockMethod, 'none'>;

/** What the sheet is doing: confirming the current lock, or choosing a new one. */
type Flow =
  | { kind: 'verify'; then: appLock.LockMethod }
  | { kind: 'set'; method: Secret; first?: string };

export default function SecurityScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [settings, setSettings] = useState<appLock.LockSettings | null>(null);
  const [bioAvailable, setBioAvailable] = useState(false);
  const [blockShots, setBlockShots] = useState(false);
  const [flow, setFlow] = useState<Flow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorNonce, setErrorNonce] = useState(0);

  const load = useCallback(async () => {
    setSettings(await appLock.getLockSettings());
    setBioAvailable(await appLock.isLockAvailable());
    setBlockShots(await appLock.isScreenshotBlockEnabled());
  }, []);
  useEffect(() => { load(); }, [load]);

  const fail = (message: string) => {
    setError(message);
    setErrorNonce((n) => n + 1);
  };

  const open = (next: Flow) => {
    setError(null);
    setFlow(next);
  };

  const close = () => {
    setFlow(null);
    setError(null);
  };

  // Changing or removing an existing lock asks for it first.
  const choose = (method: appLock.LockMethod) => {
    if (!settings) return;
    if (method === settings.method && method === 'none') return;
    if (settings.method !== 'none') open({ kind: 'verify', then: method });
    else if (method !== 'none') open({ kind: 'set', method });
  };

  const afterVerify = async (then: appLock.LockMethod) => {
    if (then === 'none') {
      await appLock.clearSecret();
      close();
      await load();
    } else {
      open({ kind: 'set', method: then });
    }
  };

  const verify = async (secret: string, then: appLock.LockMethod) => {
    const result = await appLock.verifySecret(secret);
    if (result.ok) await afterVerify(then);
    else if (result.waitMs > 0) fail(t('lock.try_again_in', { seconds: Math.ceil(result.waitMs / 1000) }));
    else fail(settings?.method === 'pattern' ? t('lock.wrong_pattern') : t('lock.wrong_pin'));
  };

  const enter = async (secret: string, method: Secret, first?: string) => {
    if (method === 'pattern' && secret.split('-').length < appLock.PATTERN_MIN) {
      fail(t('security.pattern_too_short', { count: appLock.PATTERN_MIN }));
      return;
    }
    if (!first) {
      open({ kind: 'set', method, first: secret });
      return;
    }
    if (secret !== first) {
      setFlow({ kind: 'set', method });
      fail(t('security.no_match'));
      return;
    }
    await appLock.setSecret(method, secret);
    close();
    await load();
  };

  const toggleBiometric = async (value: boolean) => {
    // Prove the fingerprint works before relying on it.
    if (value && !(await appLock.authenticate(t('lock.prompt'), t('common.cancel')))) return;
    await appLock.setLockEnabled(value);
    await load();
  };

  const setDelay = async (seconds: string) => {
    await appLock.setDelay(Number(seconds));
    await load();
  };

  const toggleShots = async (value: boolean) => {
    setBlockShots(value);
    await appLock.setScreenshotBlock(value);
  };

  if (!settings) return null;

  const methods: { value: appLock.LockMethod; title: string; subtitle: string; icon: 'lock-open' | 'key' | 'grid' }[] = [
    { value: 'none', title: t('security.none'), subtitle: t('security.none_sub'), icon: 'lock-open' },
    { value: 'pin', title: t('security.pin'), subtitle: t('security.pin_sub'), icon: 'key' },
    { value: 'pattern', title: t('security.pattern'), subtitle: t('security.pattern_sub'), icon: 'grid' },
  ];
  const delayLabel = (s: number) =>
    s === 0 ? t('security.delay_now') : t('security.delay_minutes', { count: s / 60 });
  const locked = settings.method !== 'none' || settings.biometric;

  // The sheet body for the current step.
  let sheetTitle = '';
  let pad: React.ReactNode = null;
  if (flow?.kind === 'verify') {
    sheetTitle = t('security.confirm_current');
    pad = settings.method === 'pattern'
      ? <PatternPad title={t('lock.draw_pattern')} error={error} errorNonce={errorNonce} onComplete={(d) => verify(appLock.encodePattern(d), flow.then)} />
      : <PinPad title={t('lock.enter_pin')} error={error} errorNonce={errorNonce} length={settings.pinLength || undefined} onSubmit={(p) => verify(p, flow.then)} />;
  } else if (flow?.kind === 'set') {
    const confirming = !!flow.first;
    if (flow.method === 'pin') {
      sheetTitle = t('security.pin');
      pad = (
        <PinPad
          key={confirming ? 'confirm' : 'first'}
          title={confirming ? t('security.pin_confirm') : t('security.pin_new', { min: appLock.PIN_MIN, max: appLock.PIN_MAX })}
          error={error}
          errorNonce={errorNonce}
          length={confirming ? flow.first!.length : undefined}
          minLength={appLock.PIN_MIN}
          onSubmit={(p) => enter(p, 'pin', flow.first)}
        />
      );
    } else {
      sheetTitle = t('security.pattern');
      pad = (
        <PatternPad
          key={confirming ? 'confirm' : 'first'}
          title={confirming ? t('security.pattern_confirm') : t('security.pattern_new')}
          error={error}
          errorNonce={errorNonce}
          onComplete={(d) => enter(appLock.encodePattern(d), 'pattern', flow.first)}
        />
      );
    }
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('security.title') }} />

      <SectionHeader title={t('security.lock_type')} />
      <Group>
        {methods.map((m) => (
          <ListRow
            key={m.value}
            icon={m.icon}
            title={m.title}
            subtitle={m.subtitle}
            onPress={() => choose(m.value)}
            trailing={settings.method === m.value ? <Icon name="check-circle" size={20} color={colors.primary} /> : null}
          />
        ))}
      </Group>
      {settings.method !== 'none' && (
        <Group style={styles.gap}>
          <ListRow
            icon="edit"
            title={settings.method === 'pin' ? t('security.change_pin') : t('security.change_pattern')}
            onPress={() => open({ kind: 'verify', then: settings.method })}
          />
        </Group>
      )}

      <SectionHeader title={t('security.unlock')} />
      <Group>
        <ToggleRow
          icon="fingerprint"
          title={t('settings.biometric_lock')}
          subtitle={bioAvailable
            ? (settings.method === 'none' ? t('settings.biometric_lock_sub') : t('security.biometric_with_secret'))
            : t('settings.biometric_unavailable')}
          value={settings.biometric}
          onValueChange={toggleBiometric}
          disabled={!bioAvailable}
        />
      </Group>

      <SectionHeader title={t('security.auto_lock')} />
      <ChipRow
        wrap
        options={appLock.DELAY_OPTIONS.map((s) => ({ value: String(s), label: delayLabel(s) }))}
        value={String(settings.delaySec)}
        onChange={setDelay}
      />
      <Text style={[styles.note, { color: colors.textSecondary }]}>
        {locked ? t('security.auto_lock_sub') : t('security.auto_lock_off')}
      </Text>

      <SectionHeader title={t('security.privacy')} />
      <Group>
        <ToggleRow
          icon="eye-off"
          title={t('security.block_screenshots')}
          subtitle={t('security.block_screenshots_sub')}
          value={blockShots}
          onValueChange={toggleShots}
        />
      </Group>

      <Text style={[styles.note, { color: colors.textTertiary }]}>{t('security.forgot_note')}</Text>

      <Sheet visible={!!flow} onClose={close} title={sheetTitle} scroll={false}>
        <View style={styles.sheetBody}>{pad}</View>
      </Sheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  gap: { marginTop: Spacing.md },
  note: { fontSize: FontSize.sm, lineHeight: 19, marginTop: Spacing.sm, paddingHorizontal: Spacing.xs },
  sheetBody: { paddingVertical: Spacing.lg, alignItems: 'center' },
});
