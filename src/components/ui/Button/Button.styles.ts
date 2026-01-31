import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  fonts,
  borderRadius,
} from '../../../theme';

export const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontFamily: fonts.semibold,
    textAlign: 'center',
  },
  primaryLabel: {
    color: colors.text.inverse,
  },
  outlineLabel: {
    color: colors.text.primary,
  },
  icon: {
    fontFamily: fonts.semibold,
    color: colors.text.primary,
  },
  primaryIcon: {
    color: colors.text.inverse,
  },
});
