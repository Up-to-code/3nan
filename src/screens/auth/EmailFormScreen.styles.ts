import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fonts } from '../../theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    width: '100%',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBarFallback: {
    backgroundColor: colors.background,
  },
  closeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  closeCircleFallback: {
    backgroundColor: colors.surface,
  },
  closeIconHitSlop: {
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 48,
    height: 48,
  },
  scroll: {
    flex: 1,
  },
  field: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  linkText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  errorLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.error,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
});
