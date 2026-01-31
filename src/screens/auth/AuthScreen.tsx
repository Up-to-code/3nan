import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../theme';
import { Button } from '../../components/ui';
import { useResponsive, useAppTranslation } from '../../hooks';
import { styles } from './AuthScreen.styles';

export function AuthScreen() {
  const router = useRouter();
  const { wp, fontSize } = useResponsive();
  const { t } = useAppTranslation();

  const goHome = () => router.replace('/(main)/home');

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
          <Button variant="primary" label={t('auth.continueWithApple')} onPress={goHome}>
            <AntDesign name="apple" size={fontSize(22)} color={colors.text.inverse} />
          </Button>
          <Button
            variant="outline"
            label={t('auth.continueWithGoogle')}
            onPress={goHome}
          />
          <Button
            variant="outline"
            label={t('auth.continueWithEmail')}
            onPress={goHome}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
