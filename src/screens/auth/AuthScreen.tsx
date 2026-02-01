import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../theme';
import { Button } from '../../components/ui';
import { useResponsive, useAppTranslation } from '../../hooks';
import { useCreateAuth } from './hooks/useCreateAuth';
import { styles } from './AuthScreen.styles';

export function AuthScreen() {
  const router = useRouter();
  const { wp, fontSize } = useResponsive();
  const { t } = useAppTranslation();
  const { isLoading, onApplePress, onGooglePress } = useCreateAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { paddingHorizontal: wp(6) }]}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/icons/3nan-icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.actions}>
          <Button
            variant="primary"
            label={t('auth.continueWithApple')}
            onPress={onApplePress}
            disabled={isLoading.apple}
          >
            <AntDesign name="apple" size={fontSize(22)} color={colors.text.inverse} />
          </Button>
          <Button
            variant="outline"
            label={t('auth.continueWithGoogle')}
            onPress={onGooglePress}
            disabled={isLoading.google}
          />
          <Button
            variant="outline"
            label={t('auth.continueWithEmail')}
            onPress={() => router.push('/email')}
            disabled={isLoading.emailSignIn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
