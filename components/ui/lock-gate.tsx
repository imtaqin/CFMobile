import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import * as appLock from '@/services/app-lock';

export function LockGate({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [locked, setLocked] = useState<boolean | null>(null); // null = checking
  const authInProgress = useRef(false);

  const tryUnlock = useCallback(async () => {
    if (authInProgress.current) return;
    authInProgress.current = true;
    try {
      const ok = await appLock.authenticate(t('lock.prompt'));
      if (ok) setLocked(false);
    } finally {
      authInProgress.current = false;
    }
  }, [t]);

  useEffect(() => {
    (async () => {
      const enabled = await appLock.isLockEnabled();
      if (!enabled || !(await appLock.isLockAvailable())) {
        setLocked(false);
        return;
      }
      setLocked(true);
      tryUnlock();
    })();
  }, [tryUnlock]);

  // Re-lock when app goes to background
  useEffect(() => {
    const sub = AppState.addEventListener('change', async (state: AppStateStatus) => {
      if (state === 'background') {
        const enabled = await appLock.isLockEnabled();
        if (enabled && (await appLock.isLockAvailable())) setLocked(true);
      }
    });
    return () => sub.remove();
  }, []);

  // IMPORTANT: children stay mounted at all times — unmounting them destroys
  // the navigation tree and the app "restarts" (onboarding shows again) after
  // unlock. The lock screen is an opaque overlay on top instead.
  return (
    <>
      {children}
      {locked !== false && (
        <View style={[StyleSheet.absoluteFill, styles.container, { backgroundColor: colors.background }]}>
          <View style={[styles.iconWrap, { backgroundColor: colors.primary + '15' }]}>
            <Icon name="lock" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{t('lock.title')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t('lock.subtitle')}</Text>
          {locked === true && (
            <TouchableOpacity
              style={[styles.unlockBtn, { backgroundColor: colors.primary }]}
              onPress={tryUnlock}
              activeOpacity={0.8}
            >
              <Icon name="lock-open" size={18} color="#FFF" />
              <Text style={styles.unlockText}>{t('lock.unlock')}</Text>
            </TouchableOpacity>
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
    fontWeight: '700',
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
    fontWeight: '700',
  },
});
