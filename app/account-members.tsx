import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, FieldLabel, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AccountMember } from '@/services/types';
import { AccountRole } from '@/services/cloudflare';

export default function AccountMembersScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [members, setMembers] = useState<AccountMember[]>([]);
  const [roles, setRoles] = useState<AccountRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);

  const [editingMember, setEditingMember] = useState<AccountMember | null>(null);
  const [editRoleIds, setEditRoleIds] = useState<string[]>([]);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    setError(null);
    try {
      const [mRes, rRes] = await Promise.allSettled([
        api.getAccountMembers(accountId),
        api.getAccountRoles(accountId),
      ]);
      if (mRes.status === 'fulfilled') setMembers(mRes.value.result ?? []);
      else setError(errMsg(mRes.reason));
      if (rRes.status === 'fulfilled') setRoles(rRes.value.result ?? []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleRole = (list: string[], id: string) =>
    list.includes(id) ? list.filter((r) => r !== id) : [...list, id];

  const openInvite = () => {
    setEmail('');
    setSelectedRoleIds([]);
    setShowInvite(true);
  };

  const submitInvite = async () => {
    if (!accountId) return;
    const e = email.trim();
    if (!e || selectedRoleIds.length === 0) return;
    setSaving(true);
    try {
      const res = await api.inviteAccountMember(accountId, { email: e, roles: selectedRoleIds });
      if (res.result) setMembers((prev) => [...prev, res.result]);
      setShowInvite(false);
    } catch (err: any) {
      Alert.alert(t('common.error'), errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (member: AccountMember) => {
    setEditingMember(member);
    setEditRoleIds(member.roles.map((r) => r.id));
  };

  const submitEdit = async () => {
    if (!accountId || !editingMember) return;
    const chosen = roles.filter((r) => editRoleIds.includes(r.id));
    if (chosen.length === 0) return;
    setSaving(true);
    try {
      const res = await api.updateAccountMemberRoles(accountId, editingMember.id, chosen);
      if (res.result) setMembers((prev) => prev.map((m) => (m.id === editingMember.id ? res.result : m)));
      setEditingMember(null);
    } catch (err: any) {
      Alert.alert(t('common.error'), errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  const removeMember = (member: AccountMember) => {
    if (!accountId) return;
    const label = member.user?.email ?? member.id;
    Alert.alert(t('account_members.remove_title'), t('account_members.remove_confirm', { email: label }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.removeAccountMember(accountId, member.id);
            setMembers((prev) => prev.filter((m) => m.id !== member.id));
          } catch (err: any) {
            Alert.alert(t('common.error'), errMsg(err));
          }
        },
      },
    ]);
  };

  /** Multi-select role list shared by the invite and edit sheets. */
  const renderRoles = (selected: string[], onToggle: (id: string) => void) => (
    <Group style={styles.roles}>
      {roles.map((r) => (
        <ListRow
          key={r.id}
          title={r.name}
          subtitle={r.description}
          onPress={() => onToggle(r.id)}
          chevron={false}
          trailing={
            selected.includes(r.id)
              ? <Icon name="check-circle" size={18} color={colors.primary} />
              : <View style={styles.checkSpace} />
          }
        />
      ))}
    </Group>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('account_members.title') }} />
        <View style={{ flex: 1, backgroundColor: colors.background, padding: Spacing.lg }} accessibilityLabel={t('common.loading')}>
          <SkeletonHeading />
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('account_members.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('account_members.members')} />
          {members.length === 0 && !error ? (
            <EmptyState icon="users" title={t('account_members.no_members')} message={t('account_members.no_members_message')} />
          ) : (
            members.map((m) => (
              <Group key={m.id} style={styles.member}>
                <ListRow
                  icon="user"
                  title={m.user?.email ?? m.id}
                  subtitle={m.roles.map((r) => r.name).join(', ')}
                  onPress={() => openEdit(m)}
                  trailing={
                    <View style={styles.trailing}>
                      <Badge
                        label={t(`account_members.status_${m.status}`, { defaultValue: m.status })}
                        variant={m.status === 'accepted' ? 'success' : 'warning'}
                      />
                      <TouchableOpacity
                        onPress={() => removeMember(m)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.delete')}
                      >
                        <Icon name="trash" size={16} color={colors.textTertiary} />
                      </TouchableOpacity>
                    </View>
                  }
                />
              </Group>
            ))
          )}
        </ScrollView>

        <Fab label={t('account_members.invite_member')} onPress={openInvite} />
      </View>

      {/* Invite */}
      <Sheet
        visible={showInvite}
        onClose={() => setShowInvite(false)}
        title={t('account_members.invite_member')}
        footer={
          <Button
            title={t('account_members.send_invite')}
            onPress={submitInvite}
            loading={saving}
            disabled={!email.trim() || selectedRoleIds.length === 0}
          />
        }
      >
        <Field
          label={t('account_members.email')}
          placeholder="teammate@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        <FieldLabel>{t('account_members.roles')}</FieldLabel>
        {renderRoles(selectedRoleIds, (id) => setSelectedRoleIds((prev) => toggleRole(prev, id)))}
      </Sheet>

      {/* Edit roles */}
      <Sheet
        visible={!!editingMember}
        onClose={() => setEditingMember(null)}
        title={editingMember?.user?.email ?? t('account_members.edit_roles')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitEdit}
            loading={saving}
            disabled={editRoleIds.length === 0}
          />
        }
      >
        <FieldLabel>{t('account_members.roles')}</FieldLabel>
        {renderRoles(editRoleIds, (id) => setEditRoleIds((prev) => toggleRole(prev, id)))}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  member: { marginBottom: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  roles: { marginTop: 6 },
  checkSpace: { width: 18, height: 18 },
});
