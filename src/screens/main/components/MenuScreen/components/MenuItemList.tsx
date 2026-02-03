import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useHapticFeedback } from '@/hooks';
import { ProfileView } from './Profile';
import { styles } from './MenuItemList.styles';

const DUMMY_ITEMS = [
  { id: 'settings', icon: 'settings-outline' as const, label: 'Settings' },
  { id: 'notifications', icon: 'notifications-outline' as const, label: 'Notifications' },
  { id: 'help', icon: 'help-circle-outline' as const, label: 'Help' },
  { id: 'about', icon: 'information-circle-outline' as const, label: 'About' },
] as const;

export function MenuItemList() {
  const { trigger } = useHapticFeedback();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileView />
      {DUMMY_ITEMS.map((item) => (
        <Pressable
          key={item.id}
          style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}
          onPress={() => trigger('selection')}
          accessibilityRole="button"
          accessibilityLabel={item.label}
        >
          <Ionicons name={item.icon} size={22} color={colors.text.secondary} />
          <Text style={styles.itemText}>{item.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
