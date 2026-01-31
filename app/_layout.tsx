import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import Toast from 'react-native-toast-message';
import {
  useFonts,
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
} from '@expo-google-fonts/cairo';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '../src/theme';
import i18n from '../src/locales';
import { useLanguageStore } from '../src/store/useLanguageStore';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [languageReady, setLanguageReady] = useState(false);
  const isRTL = useLanguageStore((s) => s.isRTL);
  const [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
  });

  useEffect(() => {
    useLanguageStore.getState().initializeLanguage().then(() => {
      setLanguageReady(true);
    });
  }, []);

  useEffect(() => {
    if (fontsLoaded && languageReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, languageReady]);

  if (!fontsLoaded || !languageReady) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require('../assets/icons/3nan-icon.png')}
          style={styles.loadingIcon}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={styles.container}>
        <View style={[styles.container, { direction: isRTL ? 'rtl' : 'ltr', flexDirection: 'column' }]}>
          <SafeAreaProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{
              headerShown: false,
              animation: 'fade',
              animationDuration: 200,
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
            }}/>
          </SafeAreaProvider>
          <Toast />
        </View>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingIcon: {
    width: 120,
    height: 120,
  },
});
