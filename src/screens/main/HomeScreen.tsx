import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, fonts, borderRadius } from '../../theme';
import { useResponsive, useIsRTL, useScreenSize, useAppTranslation } from '../../hooks';

export function HomeScreen() {
  const router = useRouter();
  const { fontSize, wp } = useResponsive();
  const { isRTL } = useIsRTL();
  const { category, isTablet } = useScreenSize();
  const { t, changeLanguage, currentLanguage } = useAppTranslation();

  const handleSignOut = () => {
    router.replace('/(auth)');
  };

  const handleToggleLanguage = () => {
    changeLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
  };

  return (
    <SafeAreaView style={[styles.container, { direction: isRTL ? 'rtl' : 'ltr' }]}>
      <View style={[styles.content, { paddingHorizontal: wp(isTablet ? 10 : 6) }]}>
        <View style={[styles.header, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text
            style={[
              styles.greeting,
              {
                fontSize: fontSize(typography.sizes.lg),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('home.welcomeBack')}
          </Text>
          <Text
            style={[
              styles.userName,
              {
                fontSize: fontSize(typography.sizes.xxl),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('home.user')}
          </Text>
        </View>

        <View style={[styles.infoCard, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text
            style={[
              styles.infoLabel,
              {
                fontSize: fontSize(typography.sizes.sm),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('home.signedInWith')}
          </Text>
          <Text
            style={[
              styles.infoValue,
              {
                fontSize: fontSize(typography.sizes.md),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            Apple
          </Text>
        </View>

        <View style={[styles.infoCard, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text
            style={[
              styles.infoLabel,
              {
                fontSize: fontSize(typography.sizes.sm),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('home.email')}
          </Text>
          <Text
            style={[
              styles.infoValue,
              {
                fontSize: fontSize(typography.sizes.md),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            user@example.com
          </Text>
        </View>

        <View style={[styles.infoCard, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text
            style={[
              styles.infoLabel,
              {
                fontSize: fontSize(typography.sizes.sm),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('home.screenSize')}
          </Text>
          <Text
            style={[
              styles.infoValue,
              {
                fontSize: fontSize(typography.sizes.md),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {category.toUpperCase()} ({isTablet ? t('home.tablet') : t('home.phone')})
          </Text>
        </View>

        {/* Language Switcher */}
        <Pressable
          style={[styles.languageButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
          onPress={handleToggleLanguage}
        >
          <Text
            style={[
              styles.languageText,
              {
                fontSize: fontSize(typography.sizes.md),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('settings.language')}: {currentLanguage === 'ar' ? t('settings.arabic') : t('settings.english')}
          </Text>
          <Text
            style={[
              styles.languageHint,
              {
                fontSize: fontSize(typography.sizes.sm),
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {currentLanguage === 'ar' ? '→ English' : '← العربية'}
          </Text>
        </Pressable>

        <View style={styles.spacer} />

        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text
            style={[
              styles.signOutText,
              {
                fontSize: fontSize(typography.sizes.md),
                textAlign: 'center',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
            ]}
          >
            {t('home.signOut')}
          </Text>
        </Pressable>
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
    marginBottom: spacing.xl,
  },
  greeting: {
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  userName: {
    fontFamily: fonts.bold,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  infoLabel: {
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontFamily: fonts.medium,
    color: colors.text.primary,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  languageText: {
    fontFamily: fonts.semibold,
    color: colors.text.primary,
  },
  languageHint: {
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  spacer: {
    flex: 1,
  },
  signOutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  signOutText: {
    fontFamily: fonts.semibold,
    color: colors.text.primary,
  },
});
