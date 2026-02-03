import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useHapticFeedback, useLayoutDirection } from '@/hooks';
import { SubscriptionBadge, type SubscriptionVariant } from './badges';
import { styles } from './ProfileView.styles';

const DUMMY_PROFILE = {
  name: 'User Name',
  subscription: 'free' as SubscriptionVariant,
};

export function ProfileView() {
  const { trigger } = useHapticFeedback();
  const { rowDirection, isRTL } = useLayoutDirection();

  const handlePress = () => {
    trigger('selection');
    // TODO: Navigate to profile settings
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { flexDirection: rowDirection },
        pressed && { opacity: 0.7 },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Open profile settings"
    >
      <View style={[styles.row, { flexDirection: rowDirection }]}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.dataView}>
          <Text style={styles.name} numberOfLines={1}>
            {DUMMY_PROFILE.name}
          </Text>
          <SubscriptionBadge variant={DUMMY_PROFILE.subscription} />
        </View>
      </View>
      <Ionicons
        name={isRTL ? 'chevron-back' : 'chevron-forward'}
        size={22}
        color={colors.text.secondary}
        style={styles.chevron}
      />
    </Pressable>
  );
}
