import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTranslation } from '@/hooks';
import { Button } from '@/components/ui';
import { colors, spacing, typography, fonts } from '@/theme';

export interface ErrorViewProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  const { t } = useAppTranslation();

  return (
    <View style={styles.center}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('common.errorSomethingWrong')}</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Button variant="primary" label={t('common.retry')} onPress={onRetry} />
      </View>
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
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignItems: 'center',
    gap: spacing.lg,
  },
  title: {
    fontFamily: fonts.semibold,
    color: colors.text.primary,
    fontSize: typography.sizes.lg,
    textAlign: 'center',
  },
  message: {
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
});
