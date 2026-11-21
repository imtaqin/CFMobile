import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { WaitingRoom } from '@/services/cloudflare';

export default function WaitingRoomScreen() {
  const { id: zoneId } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [rooms, setRooms] = useState<WaitingRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await api.getWaitingRooms(zoneId);
      setRooms(res.result ?? []);
    } catch { /* silent */ }
    finally { setLoading(false); setRefreshing(false); }
  }, [zoneId]);

  useEffect(() => { fetchRooms(); }, [fetchRooms]);

  const toggleSuspend = async (room: WaitingRoom) => {
    const value = !room.suspended;
    setRooms((prev) => prev.map((r) => r.id === room.id ? { ...r, suspended: value } : r));
    try { await api.updateWaitingRoom(zoneId, room.id, { suspended: value }); }
    catch {
      setRooms((prev) => prev.map((r) => r.id === room.id ? { ...r, suspended: !value } : r));
      Alert.alert(t('common.error'), t('wr.update_error'));
    }
  };

  const handleDelete = (room: WaitingRoom) => {
    Alert.alert(t('wr.delete_title'), t('wr.delete_confirm', { name: room.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteWaitingRoom(zoneId, room.id); setRooms((p) => p.filter((r) => r.id !== room.id)); }
        catch { Alert.alert(t('common.error'), t('wr.delete_error')); }
      }},
    ]);
  };

  const stat = (value: string, label: string) => (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: colors.text }]} numberOfLines={1}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textTertiary }]} numberOfLines={1}>{label}</Text>
    </View>
  );

  const renderRoom = ({ item }: { item: WaitingRoom }) => (
    <Group style={styles.item}>
      <ListRow
        icon="clock"
        iconTone={item.enabled && !item.suspended ? 'success' : 'neutral'}
        title={item.name}
        subtitle={`${item.host}${item.path !== '/' ? item.path : ''}`}
        mono
        trailing={
          <View style={styles.trailing}>
            <Badge
              label={item.suspended ? t('wr.suspended') : item.enabled ? t('wr.active') : t('wr.disabled')}
              variant={item.suspended ? 'warning' : item.enabled ? 'success' : 'default'}
            />
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              hitSlop={10}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel={t('common.delete')}
            >
              <Icon name="trash" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.stats}>
        {stat(String(item.new_users_per_minute), t('wr.per_minute'))}
        {stat(String(item.total_active_users), t('wr.active_users'))}
        {stat(`${item.session_duration}m`, t('wr.session'))}
      </View>
      <ToggleRow
        title={t('wr.active')}
        value={!item.suspended}
        onValueChange={() => toggleSuspend(item)}
      />
    </Group>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('wr.title') }} />
        <View style={{ flex: 1, backgroundColor: colors.background, padding: Spacing.lg }} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={5} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('wr.title') }} />
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchRooms(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="clock" title={t('wr.no_rooms')} message={t('wr.no_rooms_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { marginBottom: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  iconButton: { padding: 4 },
  stats: { flexDirection: 'row', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, gap: Spacing.md },
  stat: { flex: 1, gap: 2 },
  statValue: { fontSize: FontSize.md, fontWeight: '500' },
  statLabel: { fontSize: FontSize.xs },
});
