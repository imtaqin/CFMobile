import { useState, useCallback, useRef, useEffect } from 'react';
import {
  StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, ActivityIndicator, Alert, Animated,
} from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { AiPaywall } from '@/components/ui/ai-paywall';
import { promptReport } from '@/components/ui/error-report';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import * as ai from '@/services/ai';
import { useAiQuota } from '@/services/ai-subscription';
import { ACTION_REGISTRY, executeAction, missingContext } from '@/services/ai-actions';
import i18n from '@/i18n';

const AUTO_APPLY_KEY = 'ai_chat_auto_apply';
const AI_PURPLE = '#8B5CF6';

type ActionStatus = 'pending' | 'applying' | 'applied' | 'rejected' | 'error';

interface ActionItem {
  proposal: ai.ActionProposal;
  status: ActionStatus;
  error?: string;
}

interface ChatItem {
  id: string;
  role: ai.ChatRole;
  content: string;
  actions?: ActionItem[];
}

// Time-based so ids stay unique even when the module is re-evaluated mid-conversation.
let seq = 0;
const nextId = () => `m${Date.now().toString(36)}-${++seq}`;

/** Orange-to-purple disc used for the assistant's avatar, the hero and the send button. */
function Orb({ size, children }: { size: number; children?: React.ReactNode }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="orb" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={CF.orange} />
            <Stop offset="1" stopColor={AI_PURPLE} />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#orb)" />
      </Svg>
      {children}
    </View>
  );
}

/** Three dots pulsing in sequence while the assistant is working. */
function TypingDots({ color }: { color: string }) {
  const dots = useRef([new Animated.Value(0.3), new Animated.Value(0.3), new Animated.Value(0.3)]).current;

  useEffect(() => {
    const loops = dots.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 160),
          Animated.timing(v, { toValue: 1, duration: 320, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0.3, duration: 320, useNativeDriver: true }),
          Animated.delay((2 - i) * 160),
        ])
      )
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [dots]);

  return (
    <View style={styles.dots}>
      {dots.map((v, i) => (
        <Animated.View key={i} style={[styles.dot, { backgroundColor: color, opacity: v }]} />
      ))}
    </View>
  );
}

const CHAT_LOCKED: boolean = false;

export default function AiChatScreen() {
  const { zoneId, zoneName } = useLocalSearchParams<{ zoneId?: string; zoneName?: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId, accounts } = useAuth();
  const { quota } = useAiQuota();
  const headerHeight = useHeaderHeight();

  const [showPaywall, setShowPaywall] = useState(false);
  const [items, setItems] = useState<ChatItem[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [autoApply, setAutoApply] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    const SecureStore = require('expo-secure-store');
    SecureStore.getItemAsync(AUTO_APPLY_KEY).then((v: string | null) => setAutoApply(v === 'true'));
  }, []);

  const toggleAutoApply = () => {
    const value = !autoApply;
    setAutoApply(value);
    const SecureStore = require('expo-secure-store');
    SecureStore.setItemAsync(AUTO_APPLY_KEY, value ? 'true' : 'false').catch(() => {});
  };

  const context: ai.ChatContext = {
    accountId: accountId ?? undefined,
    accountName: accounts.find((a) => a.id === accountId)?.name,
    zoneId: zoneId || undefined,
    zoneName: zoneName || undefined,
  };

  const setActionStatus = (msgId: string, actionId: string, status: ActionStatus, error?: string) => {
    setItems((prev) => prev.map((m) => m.id !== msgId ? m : {
      ...m,
      actions: m.actions?.map((a) => a.proposal.id === actionId ? { ...a, status, error } : a),
    }));
  };

  const applyAction = useCallback(async (msgId: string, proposal: ai.ActionProposal) => {
    setActionStatus(msgId, proposal.id, 'applying');
    try {
      await executeAction(proposal, context);
      setActionStatus(msgId, proposal.id, 'applied');
    } catch (e: any) {
      const msgText = e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('ai_chat.action_error');
      setActionStatus(msgId, proposal.id, 'error', msgText);
    }
  // context is rebuilt every render from stable ids, so listing its fields is enough
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.zoneId, context.accountId, t]);

  const send = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || sending) return;

    const userItem: ChatItem = { id: nextId(), role: 'user', content: text };
    const history = [...items, userItem];
    setItems(history);
    setInput('');
    setSending(true);

    try {
      const res = await ai.chatAssistant({
        messages: history.map((m) => ({ role: m.role, content: m.content })),
        context,
        language: i18n.language,
      });

      const knownActions = (res.actions ?? []).filter((a) => a.kind in ACTION_REGISTRY);
      const assistantItem: ChatItem = {
        id: nextId(),
        role: 'assistant',
        content: res.reply,
        actions: knownActions.map((proposal) => ({ proposal, status: 'pending' as ActionStatus })),
      };
      setItems((prev) => [...prev, assistantItem]);

      if (autoApply) {
        for (const a of knownActions) {
          if (!ACTION_REGISTRY[a.kind].destructive && !missingContext(a.kind, context)) {
            applyAction(assistantItem.id, a);
          }
        }
      }
    } catch (e: any) {
      // The message never reached the assistant: take it back out of the
      // thread and return the text to the input so it can be sent again.
      setItems((prev) => prev.filter((m) => m.id !== userItem.id));
      setInput(text);
      if (e?.code === 'quota' || e?.code === 'auth') {
        setShowPaywall(true);
      } else {
        Alert.alert(t('common.error'), e?.message ?? t('ai_chat.send_error'), [
          { text: t('common.dismiss'), style: 'cancel' },
          { text: t('report.action'), onPress: () => promptReport(t, e) },
        ]);
      }
    } finally {
      setSending(false);
    }
  };

  const renderAction = (msgId: string, a: ActionItem) => {
    const missing = missingContext(a.proposal.kind, context);
    const danger = a.proposal.destructive;
    return (
      <View
        key={a.proposal.id}
        style={[styles.actionCard, { backgroundColor: colors.surface, borderColor: danger ? colors.error + '55' : colors.borderLight }]}
      >
        <View style={styles.actionHead}>
          <View style={[styles.actionIcon, { backgroundColor: danger ? colors.error + '14' : colors.surfaceSecondary }]}>
            <Icon name={danger ? 'warning' : 'zap'} size={14} color={danger ? colors.error : colors.text} />
          </View>
          <Text style={[styles.actionLabel, { color: colors.text }]}>{a.proposal.label}</Text>
        </View>

        {missing && (
          <Text style={[styles.actionMeta, { color: colors.error }]}>
            {t('ai_chat.missing_context', { field: missing === 'zoneId' ? t('ai_chat.a_zone') : t('ai_chat.an_account') })}
          </Text>
        )}

        {a.status === 'pending' && !missing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => setActionStatus(msgId, a.proposal.id, 'rejected')}
              style={[styles.actionBtn, { borderWidth: 1, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.actionBtnText, { color: colors.textSecondary }]}>{t('common.dismiss')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => applyAction(msgId, a.proposal)}
              style={[styles.actionBtn, { backgroundColor: danger ? colors.error : colors.primary }]}
              activeOpacity={0.8}
            >
              <Text style={[styles.actionBtnText, { color: '#FFF' }]}>
                {danger ? t('ai_chat.confirm_destructive') : t('common.apply')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {a.status === 'applying' && <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: Spacing.sm }} />}
        {a.status === 'applied' && (
          <View style={styles.actionResult}>
            <Icon name="check-circle" size={14} color={colors.success} />
            <Text style={[styles.actionMeta, { color: colors.success, marginTop: 0 }]}>{t('ai_chat.applied')}</Text>
          </View>
        )}
        {a.status === 'rejected' && (
          <Text style={[styles.actionMeta, { color: colors.textTertiary }]}>{t('ai_chat.dismissed')}</Text>
        )}
        {a.status === 'error' && (
          <Text style={[styles.actionMeta, { color: colors.error }]}>{a.error}</Text>
        )}
      </View>
    );
  };

  const renderItem = ({ item }: { item: ChatItem }) => {
    if (item.role === 'user') {
      return (
        <View style={styles.userRow}>
          <View style={[styles.userBubble, { backgroundColor: colors.primary }]}>
            <Text style={styles.userText}>{item.content}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.assistantRow}>
        <Orb size={28}><Icon name="sparkles" size={14} color="#FFF" /></Orb>
        <View style={styles.assistantCol}>
          {!!item.content && (
            <View style={[styles.assistantBubble, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              <Text style={[styles.assistantText, { color: colors.text }]}>{item.content}</Text>
            </View>
          )}
          {item.actions?.map((a) => renderAction(item.id, a))}
        </View>
      </View>
    );
  };

  // FOSS build: there is no plan to buy, so the chat is never locked.
  if (CHAT_LOCKED) {
    return (
      <>
        <View style={[styles.lockedContainer, { backgroundColor: colors.background }]}>
          <Orb size={76}><Icon name="sparkles" size={34} color="#FFF" /></Orb>
          <Text style={[styles.heroTitle, { color: colors.text }]}>{t('ai_chat.locked_title')}</Text>
          <Text style={[styles.heroSub, { color: colors.textSecondary }]}>{t('ai_chat.locked_body')}</Text>
          <TouchableOpacity style={[styles.unlockBtn, { backgroundColor: colors.primary }]} onPress={() => setShowPaywall(true)}>
            <Text style={styles.unlockBtnText}>{t('ai_plan.upgrade')}</Text>
          </TouchableOpacity>
        </View>
        <AiPaywall visible={showPaywall} onClose={() => setShowPaywall(false)} />
      </>
    );
  }

  const suggestions: { icon: IconName; text: string }[] = [
    { icon: 'shield-check', text: t('ai_chat.sug_security') },
    { icon: 'dns', text: t('ai_chat.sug_dns') },
    { icon: 'cached', text: t('ai_chat.sug_cache') },
    { icon: 'activity', text: t('ai_chat.sug_slow') },
  ];

  const canSend = !!input.trim() && !sending;

  return (
    <>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        // Edge-to-edge on Android means the window no longer resizes for the
        // keyboard, so the input has to be lifted here on both platforms.
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
      >
        {items.length === 0 ? (
          <ScrollView
            contentContainerStyle={styles.hero}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Orb size={76}><Icon name="sparkles" size={34} color="#FFF" /></Orb>
            <Text style={[styles.heroTitle, { color: colors.text }]}>{t('ai_chat.hero_title')}</Text>
            <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
              {zoneName ? t('ai_chat.empty_zone', { zone: zoneName }) : t('ai_chat.hero_sub')}
            </Text>

            <View style={styles.suggestions}>
              {suggestions.map((s) => (
                <TouchableOpacity
                  key={s.text}
                  style={[styles.suggestion, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
                  onPress={() => send(s.text)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.suggestionIcon, { backgroundColor: colors.surfaceSecondary }]}>
                    <Icon name={s.icon} size={16} color={colors.text} />
                  </View>
                  <Text style={[styles.suggestionText, { color: colors.text }]}>{s.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          <FlatList
            ref={listRef}
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
            ListFooterComponent={sending ? (
              <View style={styles.assistantRow}>
                <Orb size={28}><Icon name="sparkles" size={14} color="#FFF" /></Orb>
                <View style={[styles.assistantBubble, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
                  <TypingDots color={colors.textSecondary} />
                </View>
              </View>
            ) : null}
          />
        )}

        {/* Composer */}
        <View style={styles.composerWrap}>
          <View style={styles.chipRow}>
            {!!zoneName && (
              <View style={[styles.chip, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
                <Icon name="globe" size={12} color={colors.textSecondary} />
                <Text style={[styles.chipText, { color: colors.textSecondary }]} numberOfLines={1}>{zoneName}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={toggleAutoApply}
              activeOpacity={0.7}
              accessibilityRole="switch"
              accessibilityState={{ checked: autoApply }}
              style={[
                styles.chip,
                {
                  backgroundColor: autoApply ? colors.primary + '18' : colors.surface,
                  borderColor: autoApply ? colors.primary + '55' : colors.borderLight,
                },
              ]}
            >
              <Icon name="zap" size={12} color={autoApply ? colors.primary : colors.textSecondary} />
              <Text style={[styles.chipText, { color: autoApply ? colors.primary : colors.textSecondary }]} numberOfLines={1}>
                {t('ai_chat.auto_apply')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.composer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder={t('ai_chat.placeholder')}
              placeholderTextColor={colors.textTertiary}
              value={input}
              onChangeText={setInput}
              multiline
              editable={!sending}
            />
            <TouchableOpacity
              onPress={() => send()}
              disabled={!canSend}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={t('ai_chat.send')}
            >
              {canSend ? (
                <Orb size={40}><Icon name="send" size={16} color="#FFF" /></Orb>
              ) : (
                <View style={[styles.sendIdle, { backgroundColor: colors.surfaceSecondary }]}>
                  {sending
                    ? <ActivityIndicator size="small" color={colors.textSecondary} />
                    : <Icon name="send" size={16} color={colors.textTertiary} />}
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <AiPaywall visible={showPaywall} onClose={() => setShowPaywall(false)} reason="quota" />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Empty state
  hero: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '500',
    letterSpacing: -0.3,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  heroSub: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: Spacing.xs,
    maxWidth: 300,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.xxl,
  },
  suggestion: {
    flexBasis: '47%',
    flexGrow: 1,
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  suggestionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionText: { fontSize: FontSize.sm, lineHeight: 18 },

  // Messages
  list: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.md },
  userRow: { alignItems: 'flex-end', marginBottom: Spacing.md },
  userBubble: {
    maxWidth: '82%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: 20,
    borderBottomRightRadius: 6,
  },
  userText: { color: '#FFF', fontSize: FontSize.md, lineHeight: 21 },
  assistantRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.md },
  assistantCol: { flex: 1, alignItems: 'flex-start', gap: Spacing.sm },
  assistantBubble: {
    maxWidth: '92%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: 20,
    borderTopLeftRadius: 6,
    borderWidth: 1,
  },
  assistantText: { fontSize: FontSize.md, lineHeight: 22 },
  dots: { flexDirection: 'row', gap: 5, paddingVertical: 6 },
  dot: { width: 7, height: 7, borderRadius: 4 },

  // Proposed actions
  actionCard: {
    alignSelf: 'stretch',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  actionHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  actionIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: FontSize.sm, fontWeight: '500', flex: 1 },
  actionMeta: { fontSize: FontSize.xs, marginTop: Spacing.sm },
  actionResult: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.sm },
  actionButtons: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  actionBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', height: 36, borderRadius: Radius.full },
  actionBtnText: { fontSize: FontSize.sm, fontWeight: '600' },

  // Composer
  composerWrap: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.sm, gap: Spacing.sm },
  chipRow: { flexDirection: 'row', gap: Spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    height: 28,
    borderRadius: Radius.full,
    borderWidth: 1,
    flexShrink: 1,
  },
  chipText: { fontSize: FontSize.xs, fontWeight: '500', flexShrink: 1 },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    paddingLeft: Spacing.lg,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 26,
    borderWidth: 1,
  },
  input: { flex: 1, fontSize: FontSize.md, maxHeight: 110, minHeight: 40, paddingVertical: 9 },
  sendIdle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },

  // Locked
  lockedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  unlockBtn: { paddingHorizontal: Spacing.xxl, height: 46, justifyContent: 'center', borderRadius: Radius.full, marginTop: Spacing.xl },
  unlockBtnText: { color: '#FFF', fontWeight: '600', fontSize: FontSize.md },
});
