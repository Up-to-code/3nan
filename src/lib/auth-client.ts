import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { expoClient } from '@better-auth/expo/client'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

const baseURL = process.env.EXPO_PUBLIC_CONVEX_SITE_URL;
const scheme = Constants.expoConfig?.scheme;

if (!baseURL) {
  throw new Error('[auth-client] EXPO_PUBLIC_CONVEX_SITE_URL is required');
}
if (!scheme || typeof scheme !== 'string') {
  throw new Error('[auth-client] expoConfig.scheme is required (app.json scheme)');
}

/** Sanitize for SecureStore key prefix: alphanumeric, ".", "-", "_" only */
function sanitizeStoragePrefix(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]/g, '');
}

const storagePrefix = sanitizeStoragePrefix(scheme);

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme,
      storagePrefix,
      storage: SecureStore,
    }),
    convexClient(),
  ],
});