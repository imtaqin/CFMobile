import { useState, useRef } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList, ViewToken, Platform, useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { BrandGradient, BrandMark } from '@/components/ui/brand';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import { AI_ENABLED } from '@/constants/features';

const ONBOARDING_KEY = 'cf_onboarding_done';

async function markOnboardingDone() {
  if (Platform.OS === 'web') {
    localStorage.setItem(ONBOARDING_KEY, '1');
  } else {
    const SecureStore = require('expo-secure-store');
    await SecureStore.setItemAsync(ONBOARDING_KEY, '1');
  }
}

// Illustrations are rendered from store/icon/illus.html.
const ALL_SLIDES = [
  {
    key: '1',
    image: require('@/assets/images/onboarding-1.png'),
    titleKey: 'onboarding.slide1_title',
    descKey: 'onboarding.slide1_desc',
  },
  {
    key: '2',
    image: require('@/assets/images/onboarding-2.png'),
    titleKey: 'onboarding.slide2_title',
    descKey: 'onboarding.slide2_desc',
  },
  {
    key: '3',
    image: require('@/assets/images/onboarding-3.png'),
    titleKey: 'onboarding.slide3_title',
    descKey: 'onboarding.slide3_desc',
  },
  {
    key: '4',
    image: require('@/assets/images/onboarding-4.png'),
    titleKey: 'onboarding.slide4_title',
    descKey: 'onboarding.slide4_desc',
  },
];

// Slide 4 introduces the AI assistant.
const SLIDES = AI_ENABLED ? ALL_SLIDES : ALL_SLIDES.filter((s) => s.key !== '4');

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const isLast = currentIndex === SLIDES.length - 1;
  const slide = SLIDES[currentIndex];

  const goNext = async () => {
    if (isLast) {
      await markOnboardingDone();
      router.replace('/login');
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const skip = async () => {
    await markOnboardingDone();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BrandGradient />

      <View style={[styles.topBar, { paddingTop: insets.top + Spacing.md }]}>
        <View style={styles.brand}>
          <BrandMark bare size={34} />
          <Text style={styles.brandName}>CloudFlare Mobile</Text>
        </View>
        {!isLast && (
          <TouchableOpacity onPress={skip} style={styles.skipBtn} hitSlop={8} accessibilityRole="button">
            <Text style={styles.skipText}>{t('onboarding.skip')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Only the illustration swipes; the copy below follows the current page. */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image source={item.image} style={styles.image} contentFit="contain" transition={200} />
          </View>
        )}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        style={styles.flatList}
      />

      <View style={[styles.sheet, { backgroundColor: colors.surface, paddingBottom: insets.bottom + Spacing.xl }]}>
        <View style={styles.copy}>
          <Text style={[styles.title, { color: colors.text }]}>{t(slide.titleKey)}</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{t(slide.descKey)}</Text>
        </View>

        <View style={styles.dots}>
          {SLIDES.map((s, i) => (
            <View
              key={s.key}
              style={[
                styles.dot,
                {
                  backgroundColor: i === currentIndex ? colors.primary : colors.border,
                  width: i === currentIndex ? 22 : 6,
                },
              ]}
            />
          ))}
        </View>

        <Button
          title={isLast ? t('onboarding.get_started') : t('onboarding.next')}
          onPress={goNext}
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6821F' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    minHeight: 44,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  brandName: { color: '#FFFFFF', fontSize: FontSize.md, fontWeight: '600', letterSpacing: -0.2 },
  skipBtn: {
    height: 34,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  skipText: { color: '#FFFFFF', fontSize: FontSize.sm, fontWeight: '600' },
  flatList: { flex: 1 },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.lg },
  image: { width: '100%', height: '100%' },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxl,
    gap: Spacing.xl,
  },
  // Fixed height so the sheet does not jump between a two-line and a three-line slide.
  copy: { minHeight: 128, gap: Spacing.sm },
  title: { fontSize: 26, fontWeight: '600', letterSpacing: -0.6, lineHeight: 32 },
  description: { fontSize: FontSize.md, lineHeight: 22 },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { height: 6, borderRadius: 3 },
});
