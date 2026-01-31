import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, fonts, borderRadius } from '../../theme';
import { useResponsive, useIsRTL, useScreenSize } from '../../hooks';

export function HomeScreen() {
  const router = useRouter();
  const { fontSize, wp } = useResponsive();
  const { isRTL } = useIsRTL();
  const { category, isTablet } = useScreenSize();

  const handleSignOut = () => {
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { paddingHorizontal: wp(isTablet ? 10 : 6) }]}>
        <View style={[styles.header, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text style={[styles.greeting, { fontSize: fontSize(typography.sizes.lg) }]}>
            مرحباً بعودتك،
          </Text>
          <Text style={[styles.userName, { fontSize: fontSize(typography.sizes.xxl) }]}>
            المستخدم
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text
            style={[
              styles.infoLabel,
              { fontSize: fontSize(typography.sizes.sm), textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            تسجيل الدخول عبر
          </Text>
          <Text
            style={[
              styles.infoValue,
              { fontSize: fontSize(typography.sizes.md), textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            Apple
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text
            style={[
              styles.infoLabel,
              { fontSize: fontSize(typography.sizes.sm), textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            البريد الإلكتروني
          </Text>
          <Text
            style={[
              styles.infoValue,
              { fontSize: fontSize(typography.sizes.md), textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            user@example.com
          </Text>
        </View>

        {/* Device Info Card */}
        <View style={styles.infoCard}>
          <Text
            style={[
              styles.infoLabel,
              { fontSize: fontSize(typography.sizes.sm), textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            حجم الشاشة
          </Text>
          <Text
            style={[
              styles.infoValue,
              { fontSize: fontSize(typography.sizes.md), textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {category.toUpperCase()} {isTablet ? '(تابلت)' : '(هاتف)'}
          </Text>
        </View>

        <View style={styles.spacer} />

        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={[styles.signOutText, { fontSize: fontSize(typography.sizes.md) }]}>
            تسجيل الخروج
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
