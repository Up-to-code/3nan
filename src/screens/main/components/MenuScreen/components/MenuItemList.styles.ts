import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    gap: spacing.md,
  },
  itemText: {
    fontSize: typography.sizes.md,
    fontFamily: fonts.medium,
    color: colors.text.primary,
  },
});
