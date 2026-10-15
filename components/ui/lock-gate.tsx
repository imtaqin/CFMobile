import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { PinPad } from '@/components/ui/pin-pad';
import { PatternPad } from '@/components/ui/pattern-pad';
import { useTheme } from '@/hooks/use-theme';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import * as appLock from '@/services/app-lock';

export function LockGate({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [locked, setLocked] = useState<boolean | null>(null); // null = checking
  const [settings, setSettings] = useState<appLock.LockSettings | null>(null);
  const [bioAvailable, setBioAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorNonce, setErrorNonce] = useState(0);
  const [waitMs, setWaitMs] = useState(0);
  const authInProgress = useRef(false);
  const backgroundedAt = useRef<number | null>(null);

  const useBiometric = !!settings?.biometric && bioAvailable;

  const tryBiometric = useCallback(async () => {
    if (authInProgress.current) return;
    authInProgress.current = true;
    try {
      const ok = await appLock.authenticate(t('lock.prompt'), t('common.cancel'));
      if (ok) setLocked(false);
    } finally {
      authInProgress.current = false;
    }
  }, [t]);

  /** Lock if anything is set up, and offer the fingerprint straight away. */
  const lockNow = useCallback(async () => {
    const s = await appLock.getLockSettings();
    const available = await appLock.isLockAvailable();
    setSettings(s);
    setBioAvailable(available);
    if (!(await appLock.isLockActive(s))) {
      setLocked(false);
      return;
    }
    setError(null);
    setLocked(true);
    setWaitMs(await appLock.lockoutRemaining());
    if (s.biometric && available) tryBiometric();
  }, [tryBiometric]);

  useEffect(() => { lockNow(); }, [lockNow]);

  // Lock again after the app has been away longer than the chosen delay.
  useEffect(() => {
    const sub = AppState.addEventListener('change', async (state: AppStateStatus) => {
      // The fingerprint prompt itself sends the app to the background on some phones.
      if (authInProgress.current) return;
      if (state === 'background') {
        backgroundedAt.current = Date.now();
        const s = await appLock.getLockSettings();
        if (s.delaySec === 0 && (await appLock.isLockActive(s))) {
          setSettings(s);
          setLocked(true);
        }
      } else if (state === 'active' && backgroundedAt.current !== null) {
        const away = Date.now() - backgroundedAt.current;
        backgroundedAt.current = null;
        const s = await appLock.getLockSettings();
        if (away >= s.delaySec * 1000) await lockNow();
      }
    });
    return () => sub.remove();
  }, [lockNow]);

  // Count down a lockout after too many wrong tries.
  useEffect(() => {
    if (waitMs <= 0) return;
    const timer = setTimeout(() => setWaitMs((ms) => Math.max(0, ms - 1000)), 1000);
    return () => clearTimeout(timer);
  }, [waitMs]);

  const check = useCallback(async (secret: string) => {
    const result = await appLock.verifySecret(secret);
    if (result.ok) {
      setError(null);
      setLocked(false);
      return;
    }
    setWaitMs(result.waitMs);
    setError(settings?.method === 'pattern' ? t('lock.wrong_pattern') : t('lock.wrong_pin'));
    setErrorNonce((n) => n + 1);
  }, [settings, t]);

  const waitText = waitMs > 0 ? t('lock.try_again_in', { seconds: Math.ceil(waitMs / 1000) }) : null;
  const bioKey = useBiometric
    ? { icon: 'fingerprint' as const, label: t('lock.use_biometric'), onPress: tryBiometric }
    : undefined;

  // IMPORTANT: children stay mounted at all times — unmounting them destroys
  // the navigation tree and the app "restarts" (onboarding shows again) after
  // unlock. The lock screen is an opaque overlay on top instead.
  return (
    <>
      {children}
      {locked !== false && (
        <View style={[StyleSheet.absoluteFill, styles.container, { backgroundColor: colors.background }]}>
          {locked === true && settings?.method === 'pin' && (
            <PinPad
              title={t('lock.enter_pin')}
              error={waitText ?? error}
              errorNonce={errorNonce}
              length={settings.pinLength || undefined}
              disabled={waitMs > 0}
              onSubmit={check}
              extraKey={bioKey}
            />
          )}
          {locked === true && settings?.method === 'pattern' && (
            <>
              <PatternPad
                title={t('lock.draw_pattern')}
                error={waitText ?? error}
                errorNonce={errorNonce}
                disabled={waitMs > 0}
                onComplete={(dots) => check(appLock.encodePattern(dots))}
              />
              {useBiometric && (
                <TouchableOpacity style={styles.bioLink} onPress={tryBiometric} activeOpacity={0.7}>
                  <Icon name="fingerprint" size={20} color={colors.primary} />
                  <Text style={[styles.bioText, { color: colors.primary }]}>{t('lock.use_biometric')}</Text>
                </TouchableOpacity>
              )}
            </>
          )}
          {(locked === null || settings?.method === 'none' || !settings) && (
            <>
              <View style={[styles.iconWrap, { backgroundColor: colors.primary + '15' }]}>
                <Icon name="lock" size={40} color={colors.primary} />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>{t('lock.title')}</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t('lock.subtitle')}</Text>
              {locked === true && (
                <TouchableOpacity
                  style={[styles.unlockBtn, { backgroundColor: colors.primary }]}
                  onPress={tryBiometric}
                  activeOpacity={0.8}
                >
                  <Icon name="lock-open" size={18} color="#FFF" />
                  <Text style={styles.unlockText}>{t('lock.unlock')}</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    elevation: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    gap: Spacing.md,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: FontSize.sm,
    textAlign: 'center',
  },
  unlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    marginTop: Spacing.lg,
  },
  unlockText: {
    color: '#FFF',
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  bioLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xl,
    padding: Spacing.sm,
  },
  bioText: { fontSize: FontSize.md, fontWeight: '500' },
});
