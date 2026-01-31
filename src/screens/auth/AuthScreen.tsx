import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, fonts, borderRadius } from '../../theme';
import { useResponsive, useIsRTL, useAppTranslation } from '../../hooks';

export function AuthScreen() {
  const router = useRouter();
  const { fontSize, wp } = useResponsive();
  const { isRTL } = useIsRTL();
  const { t } = useAppTranslation();

  const handleContinue = () => {
    router.replace('/(main)/home');
  };

  return (
    <SafeAreaView style={[styles.container, { direction: isRTL ? 'rtl' : 'ltr' }]}>
      <View style={[styles.content, { paddingHorizontal: wp(6) }]}>
        {/* Header */}
     <View style={[styles.header, { alignItems: isRTL ? 'flex-end' : 'center' }]}>
          <Text
            style={[
              styles.logo,
              {
                fontSize: fontSize(typography.sizes.display),
                textAlign: isRTL ? 'right' : 'center',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('app.name')}
          </Text>
          <Text
            style={[
              styles.tagline,
              {
                fontSize: fontSize(typography.sizes.md),
                textAlign: isRTL ? 'right' : 'center',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('app.tagline')}
          </Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Auth Buttons */}
        <View style={styles.authSection}>
          <Text
            style={[
              styles.welcomeText,
              {
                fontSize: fontSize(typography.sizes.xl),
                textAlign: isRTL ? 'right' : 'center',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('auth.getStarted')}
          </Text>

          {/* Apple Button */}
          <Pressable
            style={[styles.appleButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            onPress={handleContinue}
          >
            <Text
              style={[
                styles.appleIcon,
                {
                  fontSize: fontSize(18),
                  textAlign: isRTL ? 'right' : 'left',
                  writingDirection: isRTL ? 'rtl' : 'ltr',
                },
              ]}
            />
            <Text
              style={[
                styles.appleText,
                {
                  fontSize: fontSize(typography.sizes.md),
                  textAlign: isRTL ? 'right' : 'left',
                  writingDirection: isRTL ? 'rtl' : 'ltr',
                },
              ]}
            >
              {t('auth.continueWithApple')}
            </Text>
          </Pressable>

          {/* Google Button */}
          <Pressable
            style={[styles.outlineButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            onPress={handleContinue}
          >
            <Text
              style={[
                styles.googleIcon,
                {
                  fontSize: fontSize(18),
                  textAlign: isRTL ? 'right' : 'left',
                  writingDirection: isRTL ? 'rtl' : 'ltr',
                },
              ]}
            >
              G
            </Text>
            <Text
              style={[
                styles.outlineText,
                {
                  fontSize: fontSize(typography.sizes.md),
                  textAlign: isRTL ? 'right' : 'left',
                  writingDirection: isRTL ? 'rtl' : 'ltr',
                },
              ]}
            >
              {t('auth.continueWithGoogle')}
            </Text>
          </Pressable>

          {/* Email Button */}
          <Pressable
            style={[styles.outlineButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            onPress={handleContinue}
          >
            <Text
              style={[
                styles.emailIcon,
                {
                  fontSize: fontSize(18),
                  textAlign: isRTL ? 'right' : 'left',
                  writingDirection: isRTL ? 'rtl' : 'ltr',
                },
              ]}
            >
              ✉
            </Text>
            <Text
              style={[
                styles.outlineText,
                {
                  fontSize: fontSize(typography.sizes.md),
                  textAlign: isRTL ? 'right' : 'left',
                  writingDirection: isRTL ? 'rtl' : 'ltr',
                },
              ]}
            >
              {t('auth.continueWithEmail')}
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { alignItems: isRTL ? 'flex-end' : 'center' }]}>
          <Text
            style={[
              styles.footerText,
              {
                fontSize: fontSize(typography.sizes.xs),
                textAlign: isRTL ? 'right' : 'center',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('auth.termsFooter')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  logo: {
    fontFamily: fonts.bold,
    color: colors.text.primary,
  },
  tagline: {
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  spacer: {
    flex: 1,
  },
  authSection: {
    gap: spacing.md,
  },
  welcomeText: {
    fontFamily: fonts.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  appleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  appleIcon: {
    color: colors.text.inverse,
  },
  appleText: {
    fontFamily: fonts.semibold,
    color: colors.text.inverse,
  },
  outlineButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  googleIcon: {
    fontFamily: fonts.semibold,
    color: '#4285F4',
  },
  emailIcon: {
    color: colors.text.primary,
  },
  outlineText: {
    fontFamily: fonts.semibold,
    color: colors.text.primary,
  },
  footer: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  footerText: {
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
