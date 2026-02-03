import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentArea: {
    flex: 1,
  },
  profileFooter: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: '10%',
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.md,
    fontFamily: fonts.semibold,
    color: colors.text.primary,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
