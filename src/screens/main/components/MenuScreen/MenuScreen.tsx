import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';
import { useHapticFeedback, useLayoutDirection } from '@/hooks';
import { MenuItemList, ProfileView } from './components';
import { styles } from './MenuScreen.styles';

interface MenuScreenProps {
  onClose: () => void;
}

export function MenuScreen({ onClose }: MenuScreenProps) {
  const insets = useSafeAreaInsets();
  const { trigger } = useHapticFeedback();
  const { rowDirection, isRTL } = useLayoutDirection();

  const handleClose = () => {
    trigger('selection');
    requestAnimationFrame(() => onClose());
  };

  const backButton = (
    <Pressable
      onPress={handleClose}
      accessibilityRole="button"
      accessibilityLabel="Back"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={styles.backButton}
    >
      <Ionicons
        name={isRTL ? 'chevron-back' : 'chevron-forward'}
        size={24}
        color={colors.text.primary}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            flexDirection: rowDirection,
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={styles.title}>Circle.AI</Text>
        {backButton}
      </View>
      <View style={styles.contentArea}>
        <MenuItemList />
      </View>
      <View style={[styles.profileFooter, { paddingBottom: insets.bottom || spacing.md }]}>
        <ProfileView />
      </View>
    </View>
  );
}
