import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { colors } from '@/theme';

const GRADIENT_HEIGHT = 100;

export interface ViewerContentLayoutProps {
  contentOpacity: SharedValue<number>;
}

export function ViewerContentLayout({ contentOpacity }: ViewerContentLayoutProps) {
  const overlayStyle = useAnimatedStyle(() => {
    'worklet';
    return { opacity: contentOpacity?.value ?? 0 };
  });

  return (
    <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="box-none">
      <LinearGradient
        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
        locations={[0, 1]}
        style={styles.gradient}
        pointerEvents="none"
      />
      <View style={styles.contentPlaceholder} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    height: GRADIENT_HEIGHT,
    width: '100%',
  },
  contentPlaceholder: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
