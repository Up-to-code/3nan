import { StyleSheet } from 'react-native';
import { borderRadius, colors, fonts, spacing, typography, profile } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: profile.menuMinHeight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatarPlaceholder: {
    width: profile.menuAvatarSize,
    height: profile.menuAvatarSize,
    borderRadius: profile.menuAvatarSize / 2,
    backgroundColor: colors.border,
  },
  dataView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: typography.sizes.sm,
    fontFamily: fonts.semibold,
    color: colors.text.primary,
  },
  chevron: {
    marginStart: spacing.sm,
  },
});
