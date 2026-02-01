import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { ConvexProvider } from 'convex/react';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import type { ConvexReactClient } from 'convex/react';
import i18n from '@/locales';
import { useLanguageStore } from '@/store/useLanguageStore';

type AuthClientProp = React.ComponentProps<typeof ConvexBetterAuthProvider>['authClient'];

export interface AppProvidersProps {
  convex: ConvexReactClient;
  authClient: AuthClientProp;
  children: ReactNode;
}

/** Wraps the app with i18n, Convex, auth, gesture, safe area, and RTL-aware layout. */
export function AppProviders({ convex, authClient, children }: AppProvidersProps) {
  const isRTL = useLanguageStore((s) => s.isRTL);

  return (
    <I18nextProvider i18n={i18n}>
      <ConvexProvider client={convex}>
        <ConvexBetterAuthProvider client={convex} authClient={authClient}>
          <GestureHandlerRootView style={styles.container}>
            <View style={[styles.container, { direction: isRTL ? 'rtl' : 'ltr', flexDirection: 'column' }]}>
              <SafeAreaProvider>
                <StatusBar style="dark" />
                {children}
              </SafeAreaProvider>
            </View>
          </GestureHandlerRootView>
        </ConvexBetterAuthProvider>
      </ConvexProvider>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
