import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';
import { useHapticFeedback, useLayoutDirection, usePlatform } from '@/hooks';
import { MenuItemList } from './components';
import { styles } from './MenuScreen.styles';

interface MenuScreenProps {
  onClose: () => void;
}

export function MenuScreen({ onClose }: MenuScreenProps) {
  const { trigger } = useHapticFeedback();
  const { rowDirection, alignStart } = useLayoutDirection();
  const { isIOS } = usePlatform();

  const handleClose = () => {
    trigger('selection');
    onClose();
  };

  const closeButton = (
    <Pressable
      onPress={handleClose}
      accessibilityRole="button"
      accessibilityLabel="Close menu"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={styles.closeButton}
    >
      <Ionicons name="close" size={24} color={colors.text.primary} />
    </Pressable>
  );

  const closeButtonWrapped =
    isIOS && isLiquidGlassAvailable() ? (
      <GlassView glassEffectStyle="regular" style={styles.closeCircle}>
        {closeButton}
      </GlassView>
    ) : isIOS ? (
      <BlurView intensity={50} tint="light" style={styles.closeCircle}>
        {closeButton}
      </BlurView>
    ) : (
      <View style={[styles.closeCircle, styles.closeCircleFallback]}>{closeButton}</View>
    );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            paddingTop: spacing.lg,
            flexDirection: rowDirection,
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <View style={{ alignItems: alignStart }}>{closeButtonWrapped}</View>
        <Text style={styles.title}>Menu</Text>
      </View>
      <MenuItemList />
    </View>
  );
}
