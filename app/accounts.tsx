import { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Modal, TextInput,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DiceBearAvatar } from '@/components/ui/dicebear-avatar';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';

export default function AccountsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { profiles, activeProfileId, switchProfile, removeProfile, renameProfile } = useAuth();

  const [renaming, setRenaming] = useState<{ id: string; label: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const select = async (id: string) => {
    if (id === activeProfileId || busy) return;
    setBusy(true);
    try {
      await switchProfile(id);
      router.back();
    } finally {
      setBusy(false);
    }
  };

  const confirmRemove = (id: string, label: string) => {
    const isLast = profiles.length === 1;
    Alert.alert(
      t('accounts.remove_title'),
      isLast ? t('accounts.remove_last_body', { label }) : t('accounts.remove_body', { label }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('accounts.remove'),
          style: 'destructive',
          onPress: async () => {
            await removeProfile(id);
            if (isLast) router.replace('/login');
          },
        },
      ]
    );
  };

  const saveRename = async () => {
    if (!renaming || !renaming.label.trim()) return;
    await renameProfile(renaming.id, renaming.label.trim());
    setRenaming(null);
  };

  return (
    <>
      <Stack.Screen options={{ title: t('accounts.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.intro, { color: colors.textSecondary }]}>{t('accounts.intro')}</Text>

        {profiles.map((p) => {
          const active = p.id === activeProfileId;
          return (
            <TouchableOpacity key={p.id} onPress={() => select(p.id)} activeOpacity={0.75}>
              <Card
                style={[
                  styles.row,
                  active && { borderColor: CF.orange, borderWidth: 1.5 },
                ]}
              >
                <DiceBearAvatar seed={p.config.email || p.label} size={42} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: colors.text }]} numberOfLines={1}>{p.label}</Text>
                  <Text style={[styles.meta, { color: colors.textTertiary }]}>
                    {p.config.method === 'token' ? t('accounts.via_token') : t('accounts.via_key')}
                    {active ? ` · ${t('accounts.active')}` : ''}
                  </Text>
                </View>

                {active ? (
                  <Icon name="check-circle" size={22} color={CF.orange} />
                ) : (
                  <Icon name="chevron-right" size={18} color={colors.textTertiary} />
                )}

                <TouchableOpacity
                  onPress={() => setRenaming({ id: p.id, label: p.label })}
                  hitSlop={8}
                  style={styles.iconBtn}
                >
                  <Icon name="edit" size={16} color={colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmRemove(p.id, p.label)}
                  hitSlop={8}
                  style={styles.iconBtn}
                >
                  <Icon name="trash" size={16} color={colors.error} />
                </TouchableOpacity>
              </Card>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.addBtn, { borderColor: CF.orange }]}
          onPress={() => router.push({ pathname: '/login', params: { add: '1' } })}
          activeOpacity={0.8}
        >
          <Icon name="plus" size={18} color={CF.orange} />
          <Text style={[styles.addText, { color: CF.orange }]}>{t('accounts.add')}</Text>
        </TouchableOpacity>

        <Text style={[styles.note, { color: colors.textTertiary }]}>{t('accounts.note')}</Text>
      </ScrollView>

      {/* Rename */}
      <Modal visible={!!renaming} transparent animationType="fade" onRequestClose={() => setRenaming(null)}>
        <View style={styles.overlay}>
          <View style={[styles.dialog, { backgroundColor: colors.surface }]}>
            <Text style={[styles.dialogTitle, { color: colors.text }]}>{t('accounts.rename_title')}</Text>
            <TextInput
              style={[styles.input, {
                color: colors.text,
                backgroundColor: colors.surfaceSecondary,
                borderColor: colors.border,
              }]}
              value={renaming?.label ?? ''}
              onChangeText={(v) => setRenaming((r) => (r ? { ...r, label: v } : r))}
              placeholder={t('accounts.rename_placeholder')}
              placeholderTextColor={colors.textTertiary}
              autoFocus
            />
            <View style={styles.dialogActions}>
              <TouchableOpacity onPress={() => setRenaming(null)} hitSlop={8}>
                <Text style={[styles.cancel, { color: colors.textSecondary }]}>{t('common.cancel')}</Text>
              </TouchableOpacity>
              <Button title={t('common.save')} onPress={saveRename} size="sm" />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  intro: { fontSize: FontSize.sm, lineHeight: 20, marginBottom: Spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.sm },
  label: { fontSize: FontSize.sm, fontWeight: '700' },
  meta: { fontSize: FontSize.xs, marginTop: 2 },
  iconBtn: { padding: 4 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: 50,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    marginTop: Spacing.sm,
  },
  addText: { fontSize: FontSize.md, fontWeight: '700' },
  note: { fontSize: FontSize.xs, lineHeight: 17, marginTop: Spacing.lg, textAlign: 'center' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  dialog: { width: '100%', borderRadius: Radius.lg, padding: Spacing.lg, gap: Spacing.md },
  dialogTitle: { fontSize: FontSize.md, fontWeight: '800' },
  input: {
    borderWidth: 1,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.sm,
  },
  dialogActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: Spacing.lg },
  cancel: { fontSize: FontSize.sm, fontWeight: '600' },
});
