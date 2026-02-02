/**
 * Auth Handlers
 *
 * Contains all authentication handler functions for Apple, Google, and Email auth.
 * Each function validates input, checks server, and calls Better Auth API.
 */

import { Router } from 'expo-router';
import { authClient } from '@/lib/auth-client';
import {
  ERROR_CODES,
  SignInParams,
  SignUpParams,
  validateSignIn,
  validateSignUp,
  isServerValid,
} from '../utils/authUtils';

// ============================================
// TYPES
// ============================================

/** Custom error with error codes for i18n */
export interface AuthError extends Error {
  errorCodes?: string[];
}

/** Creates an error with optional message and error codes for i18n */
function createError(
  opts: string[] | { message?: string; errorCodes?: string[] }
): AuthError {
  const codes = Array.isArray(opts) ? opts : opts.errorCodes ?? [];
  const message = Array.isArray(opts) ? 'AUTH_ERROR' : opts.message ?? 'AUTH_ERROR';
  const error = new Error(message) as AuthError;
  error.errorCodes = codes;
  return error;
}

/** Navigate directly to (main)/home after successful auth. Retries once after 100ms on failure. */
async function redirectAfterAuth(router: Router): Promise<void> {
  try {
    router.replace('/(main)/home');
  } catch (err) {
    console.warn('[Auth] Redirect failed:', err);
    await new Promise((r) => setTimeout(r, 100));
    try {
      router.replace('/(main)/home');
    } catch (e2) {
      throw err;
    }
  }
}

// ============================================
// SOCIAL AUTH
// ============================================

/**
 * Handles Apple OAuth sign-in
 * @throws Error if auth fails
 */
export async function handleAppleAuth(router: Router): Promise<void> {
  if (!isServerValid()) {
    throw createError([ERROR_CODES.SERVER_NOT_CONFIGURED]);
  }

  const { data, error } = await authClient.signIn.social({ provider: 'apple' });

  if (error) {
    throw createError([ERROR_CODES.AUTH_FAILED]);
  }

  if (!data) {
    throw createError([ERROR_CODES.AUTH_NO_DATA]);
  }

  await redirectAfterAuth(router);
}

/**
 * Handles Google OAuth sign-in
 * @throws Error if auth fails
 */
export async function handleGoogleAuth(router: Router): Promise<void> {
  if (!isServerValid()) {
    throw createError([ERROR_CODES.SERVER_NOT_CONFIGURED]);
  }

  const { data, error } = await authClient.signIn.social({ provider: 'google' });

  if (error) {
    throw createError([ERROR_CODES.AUTH_FAILED]);
  }

  if (!data) {
    throw createError([ERROR_CODES.AUTH_NO_DATA]);
  }

  await redirectAfterAuth(router);
}

// ============================================
// EMAIL AUTH
// ============================================

/**
 * Handles email sign-in
 * @param params - Email and password
 * @throws Error with errorCodes if validation fails or auth fails
 */
export async function handleEmailSignIn(
  router: Router,
  params: SignInParams
): Promise<void> {
  const errors = validateSignIn(params);
  if (errors.length > 0) {
    throw createError(errors);
  }

  if (!isServerValid()) {
    throw createError([ERROR_CODES.SERVER_NOT_CONFIGURED]);
  }

  const { data, error } = await authClient.signIn.email({
    email: params.email.trim(),
    password: params.password,
    rememberMe: true,
  });

  if (error) {
    const err = error as { message?: string; errorCodes?: string[] };
    throw createError({
      message: err.message ?? ERROR_CODES.AUTH_FAILED,
      errorCodes: err.errorCodes ?? [ERROR_CODES.AUTH_FAILED],
    });
  }

  if (!data) {
    throw createError([ERROR_CODES.AUTH_NO_DATA]);
  }

  await redirectAfterAuth(router);
}

/**
 * Handles email sign-up
 * @param params - Name, email, and password
 * @throws Error with errorCodes if validation fails or auth fails
 */
export async function handleEmailSignUp(
  router: Router,
  params: SignUpParams
): Promise<void> {
  const errors = validateSignUp(params);
  if (errors.length > 0) {
    throw createError(errors);
  }

  if (!isServerValid()) {
    throw createError([ERROR_CODES.SERVER_NOT_CONFIGURED]);
  }

  const { data, error } = await authClient.signUp.email({
    name: params.name.trim(),
    email: params.email.trim(),
    password: params.password,
  });

  if (error) {
    const err = error as { message?: string; errorCodes?: string[] };
    throw createError({
      message: err.message ?? ERROR_CODES.AUTH_FAILED,
      errorCodes: err.errorCodes ?? [ERROR_CODES.AUTH_FAILED],
    });
  }

  if (!data) {
    throw createError([ERROR_CODES.AUTH_NO_DATA]);
  }

  await redirectAfterAuth(router);
}
