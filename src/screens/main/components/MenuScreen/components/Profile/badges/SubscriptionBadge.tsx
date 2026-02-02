import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './SubscriptionBadge.styles';

export type SubscriptionVariant = 'free' | 'pro';

const LABELS: Record<SubscriptionVariant, string> = {
  free: 'Free',
  pro: 'Pro',
};

interface SubscriptionBadgeProps {
  variant: SubscriptionVariant;
}

export function SubscriptionBadge({ variant }: SubscriptionBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{LABELS[variant]}</Text>
    </View>
  );
}
