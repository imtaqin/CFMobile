import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { Group, ListRow, ValueRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { CloudflareTunnel, TunnelConfiguration } from '@/services/cloudflare';

export default function TunnelDetailScreen() {
  const { tunnel: tunnelId } = useLocalSearchParams<{ tunnel: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [tunnel, setTunnel] = useState<CloudflareTunnel | null>(null);
  const [config, setConfig] = useState<TunnelConfiguration | null>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const fetchData = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    const [tunnelRes, configRes, connRes, tokenRes] = await Promise.allSettled([
      api.getTunnel(accountId, tunnelId),
      api.getTunnelConfig(accountId, tunnelId),
      api.getTunnelConnections(accountId, tunnelId),
      api.getTunnelToken(accountId, tunnelId),
    ]);
    if (tunnelRes.status === 'fulfilled') setTunnel(tunnelRes.value.result);
    if (configRes.status === 'fulfilled') setConfig(configRes.value.result);
    if (connRes.status === 'fulfilled') setConnections(connRes.value.result ?? []);
    if (tokenRes.status === 'fulfilled') setToken(tokenRes.value.result);
    setLoading(false);
    setRefreshing(false);
  }, [accountId, tunnelId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCopyToken = () => {
    if (!token) return;
    const Clipboard = require('expo-clipboard');
    Clipboard.setStringAsync(token);
    Alert.alert(t('common.success'), t('tunnels.token_copied'));
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: tunnel?.name ?? tunnelId }} />
        <ScrollView
          scrollEnabled={false}
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          accessibilityLabel={t('common.loading')}
        >
          <SkeletonRows count={3} />
          <SkeletonHeading />
          <SkeletonRows count={2} />
          <SkeletonHeading />
          <SkeletonRows count={2} />
        </ScrollView>
      </>
    );
  }

  const isActive = tunnel?.status === 'healthy' || (tunnel?.conns_active ?? 0) > 0;
  const ingress = config?.config?.ingress ?? [];

  return (
    <>
      <Stack.Screen options={{ title: tunnel?.name ?? tunnelId }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} tintColor={colors.primary} />}
      >
        {/* Header card */}
        <Group>
          <ListRow
            icon="network"
            iconTone={isActive ? 'success' : 'neutral'}
            title={tunnel?.name ?? tunnelId}
            subtitle={`${tunnel?.conns_active ?? 0} ${t('tunnels.active_connections')}`}
            trailing={<View><Badge label={tunnel?.status ?? 'unknown'} variant={isActive ? 'success' : 'default'} /></View>}
          />
          <ValueRow label={t('tunnels.source')} value={config?.source ?? '—'} />
          <ValueRow
            label={t('tunnels.created')}
            value={tunnel?.created_at ? new Date(tunnel.created_at).toLocaleDateString() : '—'}
          />
        </Group>

        {/* Token */}
        {token && (
          <>
            <SectionHeader title={t('tunnels.token')} />
            <Group>
              <TouchableOpacity onPress={handleCopyToken} activeOpacity={0.7} style={styles.tokenRow}>
                <Icon name="key" size={16} color={colors.textTertiary} />
                <Text style={[styles.tokenText, { color: colors.textSecondary }]} numberOfLines={1}>
                  {showToken ? token : '••••••••••••••••••••••••'}
                </Text>
                <TouchableOpacity onPress={() => setShowToken(!showToken)} hitSlop={10}>
                  <Icon name={showToken ? 'lock' : 'lock-open'} size={16} color={colors.textTertiary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCopyToken} hitSlop={10}>
                  <Icon name="copy" size={16} color={colors.textTertiary} />
                </TouchableOpacity>
              </TouchableOpacity>
            </Group>
          </>
        )}

        {/* Ingress rules */}
        <SectionHeader title={t('tunnels.ingress_rules')} />
        {ingress.length > 0 ? (
          <Group>
            {ingress.map((rule, i) => (
              <ListRow
                key={i}
                icon="route"
                title={`${rule.hostname ?? '*'}${rule.path ? `/${rule.path}` : ''}`}
                subtitle={`→ ${rule.service}`}
                mono
              />
            ))}
          </Group>
        ) : (
          <Card>
            <EmptyState icon="route" title={t('tunnels.no_ingress')} message={t('tunnels.no_ingress_message')} />
          </Card>
        )}

        {/* Connections */}
        <SectionHeader title={t('tunnels.connections')} />
        {connections.length > 0 ? (
          <Group>
            {connections.map((conn: any, i: number) => (
              <ListRow
                key={conn.id ?? i}
                leading={<View style={[styles.connDot, { backgroundColor: colors.success }]} />}
                title={conn.client_version ?? 'cloudflared'}
                subtitle={`${conn.city ?? ''}${conn.city && conn.country ? ', ' : ''}${conn.country ?? ''} · ${conn.colo_name ?? ''}`}
                trailing={
                  <Text style={[styles.connTime, { color: colors.textTertiary }]}>
                    {conn.opened_at ? new Date(conn.opened_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </Text>
                }
              />
            ))}
          </Group>
        ) : (
          <Card>
            <EmptyState icon="network" title={t('tunnels.no_connections')} message={t('tunnels.no_connections_message')} />
          </Card>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    minHeight: 48,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  tokenText: { flex: 1, fontSize: 12, fontFamily: 'monospace' },
  connDot: { width: 8, height: 8, borderRadius: 4 },
  connTime: { fontSize: FontSize.xs },
});
