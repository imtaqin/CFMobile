import { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';

interface TailEvent {
  key: string;
  time: string;
  method?: string;
  url?: string;
  status?: number;
  outcome: string;
  logs: string[];
  exceptions: string[];
}

type ConnState = 'connecting' | 'live' | 'error' | 'closed';

export default function WorkerTailScreen() {
  const { script } = useLocalSearchParams<{ script: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [events, setEvents] = useState<TailEvent[]>([]);
  const [connState, setConnState] = useState<ConnState>('connecting');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const pausedRef = useRef(false);
  const tailRef = useRef<{ id: string } | null>(null);
  const counter = useRef(0);

  pausedRef.current = paused;

  const connect = useCallback(async () => {
    if (!accountId || !script) return;
    setConnState('connecting');
    setErrorMsg(null);
    try {
      const res = await api.createWorkerTail(accountId, script);
      const tail = res.result;
      if (!tail?.url) throw new Error('No tail URL returned');
      tailRef.current = { id: tail.id };

      const ws = new WebSocket(tail.url, 'trace-v1');
      wsRef.current = ws;

      ws.onopen = () => setConnState('live');
      ws.onerror = () => {
        setConnState('error');
        setErrorMsg('WebSocket error');
      };
      ws.onclose = () => setConnState((s) => (s === 'error' ? s : 'closed'));
      ws.onmessage = (msg) => {
        if (pausedRef.current) return;
        try {
          const data = JSON.parse(String(msg.data));
          const ev: TailEvent = {
            key: `ev-${counter.current++}`,
            time: new Date(data.eventTimestamp ?? Date.now()).toLocaleTimeString(),
            method: data.event?.request?.method,
            url: data.event?.request?.url,
            status: data.event?.response?.status,
            outcome: data.outcome ?? 'unknown',
            logs: (data.logs ?? []).map((l: any) =>
              Array.isArray(l.message) ? l.message.map((m: any) => (typeof m === 'string' ? m : JSON.stringify(m))).join(' ') : String(l.message)
            ),
            exceptions: (data.exceptions ?? []).map((e: any) => `${e.name}: ${e.message}`),
          };
          setEvents((prev) => [ev, ...prev].slice(0, 500));
        } catch {
          // non-JSON frame, skip
        }
      };
    } catch (e: any) {
      setConnState('error');
      setErrorMsg(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Failed to start tail');
    }
  }, [accountId, script]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      if (accountId && script && tailRef.current) {
        api.deleteWorkerTail(accountId, script, tailRef.current.id).catch(() => {});
      }
    };
  }, [connect, accountId, script]);

  const stateColor = connState === 'live' ? colors.success : connState === 'connecting' ? colors.warning : colors.error;
  const stateLabel = t(`tail.state_${connState}`);

  const shortUrl = (u?: string) => {
    if (!u) return '';
    try {
      const parsed = new URL(u);
      return parsed.pathname + parsed.search;
    } catch {
      return u;
    }
  };

  const renderEvent = ({ item }: { item: TailEvent }) => {
    const ok = item.outcome === 'ok';
    return (
      <View style={[styles.eventCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <View style={styles.eventTop}>
          {item.method && (
            <View style={[styles.methodPill, { backgroundColor: colors.info + '18' }]}>
              <Text style={[styles.methodText, { color: colors.info }]}>{item.method}</Text>
            </View>
          )}
          {item.status !== undefined && (
            <Text style={[styles.statusText, { color: item.status < 400 ? colors.success : colors.error }]}>
              {item.status}
            </Text>
          )}
          <Text style={[styles.outcomeText, { color: ok ? colors.textTertiary : colors.error }]}>
            {item.outcome}
          </Text>
          <View style={{ flex: 1 }} />
          <Text style={[styles.timeText, { color: colors.textTertiary }]}>{item.time}</Text>
        </View>
        {item.url ? (
          <Text style={[styles.urlText, { color: colors.text }]} numberOfLines={1}>{shortUrl(item.url)}</Text>
        ) : null}
        {item.logs.map((l, i) => (
          <Text key={i} style={[styles.logText, { color: colors.textSecondary }]} numberOfLines={3}>
            {l}
          </Text>
        ))}
        {item.exceptions.map((e, i) => (
          <Text key={`x${i}`} style={[styles.logText, { color: colors.error }]} numberOfLines={3}>
            {e}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: script }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Status bar */}
        <View style={[styles.statusBar, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={[styles.stateDot, { backgroundColor: stateColor }]} />
          <Text style={[styles.stateText, { color: colors.text }]}>{stateLabel}</Text>
          {errorMsg && <Text style={[styles.errText, { color: colors.error }]} numberOfLines={1}>{errorMsg}</Text>}
          <View style={{ flex: 1 }} />
          {(connState === 'error' || connState === 'closed') && (
            <TouchableOpacity onPress={connect} hitSlop={8} style={{ padding: 4 }}>
              <Icon name="refresh" size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setPaused(!paused)} hitSlop={8} style={{ padding: 4 }}>
            <Icon name={paused ? 'zap' : 'close'} size={18} color={paused ? colors.success : colors.warning} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEvents([])} hitSlop={8} style={{ padding: 4 }}>
            <Icon name="delete-sweep" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={events}
          keyExtractor={(item) => item.key}
          renderItem={renderEvent}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <EmptyState
              icon="activity"
              title={t('tail.waiting')}
              message={t('tail.waiting_message')}
            />
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    margin: Spacing.lg,
    marginBottom: 0,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  stateDot: { width: 10, height: 10, borderRadius: 5 },
  stateText: { fontSize: FontSize.sm, fontWeight: '700' },
  errText: { fontSize: FontSize.xs, flexShrink: 1 },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  eventCard: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: 4,
  },
  eventTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  methodPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  methodText: { fontSize: 10, fontWeight: '800' },
  statusText: { fontSize: FontSize.xs, fontWeight: '700' },
  outcomeText: { fontSize: FontSize.xs },
  timeText: { fontSize: 10 },
  urlText: { fontSize: FontSize.xs, fontFamily: 'monospace' },
  logText: { fontSize: 11, fontFamily: 'monospace' },
});
