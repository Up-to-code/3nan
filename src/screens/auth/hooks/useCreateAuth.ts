/**
 * useCreateAuth Hook
 *
 * Provides auth functions with loading states and error handling.
 * Exposes error as state for inline labels (no Toast).
 */

import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAppTranslation } from '@/hooks';
import { formatErrors, SignInParams, SignUpParams } from '../utils/authUtils';
import {
  handleAppleAuth,
  handleGoogleAuth,
  handleEmailSignIn,
  handleEmailSignUp,
  AuthError,
} from '../handlers/authHandlers';

/** Loading state for each auth method */
export interface AuthLoadingState {
  apple: boolean;
  google: boolean;
  emailSignIn: boolean;
  emailSignUp: boolean;
}

export function useCreateAuth() {
  const router = useRouter();
  const { t } = useAppTranslation();

  const [isLoading, setIsLoading] = useState<AuthLoadingState>({
    apple: false,
    google: false,
    emailSignIn: false,
    emailSignUp: false,
  });
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const setErrorFromThrow = useCallback(
    (err: unknown) => {
      const authError = err as AuthError;
      if (authError.errorCodes?.length) {
        const formatted = formatErrors(authError.errorCodes, t);
        setError(`${t('auth.errors.validationFailed')}: ${formatted}`);
        return;
      }
      const message =
        err instanceof Error ? err.message : t('auth.errors.unknown');
      setError(`${t('auth.errors.authFailed')}: ${message}`);
    },
    [t]
  );

  const onApplePress = useCallback(async () => {
    setError(null);
    setIsLoading((s) => ({ ...s, apple: true }));
    try {
      await handleAppleAuth(router);
    } catch (err) {
      setErrorFromThrow(err);
    } finally {
      setIsLoading((s) => ({ ...s, apple: false }));
    }
  }, [router, setErrorFromThrow]);

  const onGooglePress = useCallback(async () => {
    setError(null);
    setIsLoading((s) => ({ ...s, google: true }));
    try {
      await handleGoogleAuth(router);
    } catch (err) {
      setErrorFromThrow(err);
    } finally {
      setIsLoading((s) => ({ ...s, google: false }));
    }
  }, [router, setErrorFromThrow]);

  const onEmailSignIn = useCallback(
    async (params: SignInParams) => {
      setError(null);
      setIsLoading((s) => ({ ...s, emailSignIn: true }));
      try {
        await handleEmailSignIn(router, params);
      } catch (err) {
        setErrorFromThrow(err);
      } finally {
        setIsLoading((s) => ({ ...s, emailSignIn: false }));
    }
  },
    [router, setErrorFromThrow]
  );

  const onEmailSignUp = useCallback(
    async (params: SignUpParams) => {
      setError(null);
      setIsLoading((s) => ({ ...s, emailSignUp: true }));
      try {
        await handleEmailSignUp(router, params);
      } catch (err) {
        setErrorFromThrow(err);
      } finally {
        setIsLoading((s) => ({ ...s, emailSignUp: false }));
      }
    },
    [router, setErrorFromThrow]
  );

  return {
    isLoading,
    onApplePress,
    onGooglePress,
    onEmailSignIn,
    onEmailSignUp,
    error,
    clearError,
  };
}
