import { useState, useRef } from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity, FlatList,
  ViewToken, Platform, useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks/use-theme';
import { Icon } from '@/components/ui/icon';
import { CF, Spacing, FontSize, Radius } from '@/constants/theme';

const ONBOARDING_KEY = 'cf_onboarding_done';

async function markOnboardingDone() {
  if (Platform.OS === 'web') {
    localStorage.setItem(ONBOARDING_KEY, '1');
  } else {
    const SecureStore = require('expo-secure-store');
    await SecureStore.setItemAsync(ONBOARDING_KEY, '1');
  }
}

const { width } = Dimensions.get('window');

const SLIDES = [
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
];

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
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

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <View style={[styles.slide, { width }]}>
      <View style={[styles.imageContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.imageInner, isDark && styles.imageInvert]}>
          <Image
            source={item.image}
            style={styles.image}
            contentFit="contain"
            transition={300}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{t(item.titleKey)}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>{t(item.descKey)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Skip button */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        {!isLast && (
          <TouchableOpacity onPress={skip} style={styles.skipBtn}>
            <Text style={[styles.skipText, { color: colors.textSecondary }]}>{t('onboarding.skip')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        style={styles.flatList}
      />

      {/* Bottom section */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === currentIndex ? CF.orange : colors.border,
                  width: i === currentIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* Action button */}
        <TouchableOpacity
          onPress={goNext}
          activeOpacity={0.8}
          style={[styles.actionBtn, { backgroundColor: CF.orange }]}
        >
          <Text style={styles.actionText}>
            {isLast ? t('onboarding.get_started') : t('onboarding.next')}
          </Text>
          <Icon name="chevron-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    height: 44,
  },
  skipBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  skipText: {
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  flatList: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.7,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: Spacing.xxxl,
  },
  imageInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageInvert: {
    opacity: 0.9,
    // @ts-ignore - CSS filter for dark mode
    filter: 'invert(1) hue-rotate(180deg)',
  },
  image: {
    width: '85%',
    height: '85%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
  },
  description: {
    fontSize: FontSize.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottom: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.xl,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  actionText: {
    color: '#FFF',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
});
