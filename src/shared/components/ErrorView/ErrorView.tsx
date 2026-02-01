import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTranslation } from '@/hooks';
import { Button } from '@/components/ui';
import { colors, spacing } from '@/theme';

export interface ErrorViewProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  const { t } = useAppTranslation();

  return (
    <View style={styles.center}>
      <Text style={styles.title}>{t('common.errorSomethingWrong')}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Button variant="primary" label={t('common.retry')} onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    color: colors.text.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  message: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
  },
});
