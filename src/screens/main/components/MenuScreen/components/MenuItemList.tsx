import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useHapticFeedback, useAppTranslation } from '@/hooks';
import { MENU_GROUPS } from './menuConfig';
import { styles } from './MenuItemList.styles';

export function MenuItemList() {
  const { trigger } = useHapticFeedback();
  const { t } = useAppTranslation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {MENU_GROUPS.map((group, index) => (
        <MenuItemGroup
          key={group.id}
          label={t(group.labelKey)}
          items={group.items}
          onItemPress={() => trigger('selection')}
          t={t}
          isFirst={index === 0}
        />
      ))}
    </ScrollView>
  );
}

interface MenuItemGroupProps {
  label: string;
  items: ReadonlyArray<{ id: string; icon: string; labelKey: string }>;
  onItemPress: () => void;
  t: (key: string) => string;
  isFirst?: boolean;
}

function MenuItemGroup({ label, items, onItemPress, t, isFirst }: MenuItemGroupProps) {
  return (
    <>
      <Text style={[styles.sectionHeader, isFirst && styles.sectionHeaderFirst]}>{label}</Text>
      <View style={styles.groupCard}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}
            onPress={onItemPress}
            accessibilityRole="button"
            accessibilityLabel={t(item.labelKey)}
          >
            <Ionicons
              name={item.icon as React.ComponentProps<typeof Ionicons>['name']}
              size={22}
              color={colors.text.secondary}
            />
            <Text style={styles.itemText}>{t(item.labelKey)}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}
