import React, { useEffect, useState } from 'react';
import {
  useFonts,
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
} from '@expo-google-fonts/cairo';
import * as SplashScreen from 'expo-splash-screen';
import { useLanguageStore } from '@/store/useLanguageStore';
import { ConvexReactClient } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { AppProviders } from '@/components/providers';
import { SessionAwareStack } from '@/navigation';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [languageReady, setLanguageReady] = useState(false);
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

  if (!fontsLoaded || !languageReady) {
    return null;
  }

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string, {
    expectAuth: false,
    unsavedChangesWarning: false,
  });

  return (
    <AppProviders convex={convex} authClient={authClient}>
      <SessionAwareStack />
    </AppProviders>
  );
}
