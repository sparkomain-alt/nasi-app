import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions, FlatList,
  TouchableOpacity, Animated, ViewToken,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Navigate Africa\nSmarter',
    subtitle: 'Real-time traffic, community reports, and turn-by-turn navigation built for African roads.',
    bg: ['#0D3320', '#16A34A'] as [string, string],
    accent: colors.greenLight,
  },
  {
    id: '2',
    title: 'Join the\nNASIRIANS',
    subtitle: 'Share road conditions, hazards, and live updates with thousands of drivers near you.',
    bg: ['#1A0A14', '#D81B60'] as [string, string],
    accent: colors.magentaLight,
  },
  {
    id: '3',
    title: 'Built for\nZambia & Beyond',
    subtitle: 'Offline maps, local roads, and support for more African languages — coming soon.',
    bg: ['#1A1400', '#C9962E'] as [string, string],
    accent: colors.gold,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) setCurrentIndex(viewableItems[0].index ?? 0);
    }
  ).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/(auth)/login');
    }
  };

  const slide = slides[currentIndex]!;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={slide.bg} style={StyleSheet.absoluteFill} />

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            {/* Arrow logo placeholder */}
            <View style={[styles.logoWrap, { borderColor: item.accent }]}>
              <View style={[styles.logoArrow, { borderBottomColor: item.accent }]} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <SafeAreaView edges={['bottom']} style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex && { backgroundColor: '#fff', width: 24 },
              ]}
            />
          ))}
        </View>

        {/* Next / Get Started */}
        <TouchableOpacity style={[styles.btn, { backgroundColor: slide.accent }]} onPress={handleNext}>
          <Text style={styles.btnText}>
            {currentIndex < slides.length - 1 ? 'Next' : 'Get Started'}
          </Text>
        </TouchableOpacity>

        {/* Skip */}
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 80,
  },
  logoWrap: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logoArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  title: {
    fontFamily: 'System',
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 26,
  },
  bottom: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  btn: {
    width: '100%',
    height: 56,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  skip: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    paddingVertical: spacing.sm,
  },
});
