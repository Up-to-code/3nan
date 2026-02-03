import { StyleSheet } from 'react-native';
import { borderRadius, colors, fonts, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  groupCard: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    fontSize: typography.sizes.xs,
    fontFamily: fonts.medium,
    color: colors.text.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginTop: spacing.md,
  },
  sectionHeaderFirst: {
    marginTop: spacing.sm,
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
