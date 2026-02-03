import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useHapticFeedback } from '@/hooks';
import { styles, HIT_SLOP } from './MenuTriggerButton.styles';

interface MenuTriggerButtonProps {
  onPress: () => void;
  menuProgress: SharedValue<number>;
}

export function MenuTriggerButton({ onPress, menuProgress }: MenuTriggerButtonProps) {
  const { trigger } = useHapticFeedback();

  const handlePress = () => {
    trigger('selection');
    onPress();
  };

  const menuIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(menuProgress.value, [0, 1], [1, 0]),
    position: 'absolute' as const,
  }));

  const closeIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(menuProgress.value, [0, 1], [0, 1]),
    position: 'absolute' as const,
  }));

  const content = (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel="Toggle menu"
      hitSlop={HIT_SLOP}
      style={styles.pressable}
    >
      <Animated.View style={menuIconStyle}>
        <Ionicons name="menu" size={22} color={colors.text.primary} />
      </Animated.View>
      <Animated.View style={closeIconStyle}>
        <Ionicons name="close" size={22} color={colors.text.primary} />
      </Animated.View>
    </Pressable>
  );

  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={50} tint="light" style={styles.trigger}>
        {content}
      </BlurView>
    );
  }

  return (
    <View style={[styles.trigger, styles.triggerFallback]}>
      {content}
    </View>
  );
}
