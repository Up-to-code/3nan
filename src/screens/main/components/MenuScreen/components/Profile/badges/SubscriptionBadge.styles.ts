import { StyleSheet } from 'react-native';
import { colors, fonts, typography, profile } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    ...profile.badge,
    backgroundColor: colors.border,
  },
  text: {
    fontSize: typography.sizes.xs,
    fontFamily: fonts.medium,
    color: colors.text.primary,
  },
});
