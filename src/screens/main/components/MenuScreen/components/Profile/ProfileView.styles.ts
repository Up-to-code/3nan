import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, typography, profile } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: profile.minHeight,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarPlaceholder: {
    width: profile.avatarSize,
    height: profile.avatarSize,
    borderRadius: profile.avatarSize / 2,
    backgroundColor: colors.surface,
  },
  dataView: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: typography.sizes.md,
    fontFamily: fonts.semibold,
    color: colors.text.primary,
  },
  email: {
    fontSize: typography.sizes.sm,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  chevron: {
    marginStart: spacing.sm,
  },
});
