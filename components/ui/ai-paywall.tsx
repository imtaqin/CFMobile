import { Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { useTheme } from '@/hooks/use-theme';
import * as aiSub from '@/services/ai-subscription';
import { FontSize, Spacing } from '@/constants/theme';

interface AiPaywallProps {
  visible: boolean;
  onClose: () => void;
  reason?: 'quota' | 'browse';
  onSubscribed?: () => void;
}

/**
 * FOSS build: there is nothing to buy, so this is only a notice that the free
 * AI actions for the month are used up. The name and props match the Play
 * build so the screens that open it stay the same.
 */
export function AiPaywall({ visible, onClose }: AiPaywallProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { quota } = aiSub.useAiQuota();

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title={t('ai_plan.title')}
      footer={<Button title={t('common.dismiss')} onPress={onClose} size="lg" variant="secondary" />}
    >
      {!!quota && (
        <Text style={[styles.usage, { color: colors.text }]}>
          {t('ai_plan.usage', { used: quota.used, limit: quota.limit })}
        </Text>
      )}
      <Text style={[styles.note, { color: colors.textSecondary }]}>{t('ai_plan.foss_note')}</Text>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  usage: { fontSize: FontSize.md, fontWeight: '500', marginBottom: Spacing.sm },
  note: { fontSize: FontSize.sm, lineHeight: 20 },
});
