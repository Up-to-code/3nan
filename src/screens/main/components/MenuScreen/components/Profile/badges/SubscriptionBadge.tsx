import React from 'react';
import { View, Text } from 'react-native';
import { useAppTranslation } from '@/hooks';
import { styles } from './SubscriptionBadge.styles';

export type SubscriptionVariant = 'free' | 'pro';

interface SubscriptionBadgeProps {
  variant: SubscriptionVariant;
}

export function SubscriptionBadge({ variant }: SubscriptionBadgeProps) {
  const { t } = useAppTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t(`subscription.${variant}`)}</Text>
    </View>
  );
}
