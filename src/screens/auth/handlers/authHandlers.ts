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

/** Creates an error with error codes array */
function createError(codes: string[]): AuthError {
  const error = new Error('AUTH_ERROR') as AuthError;
  error.errorCodes = codes;
  return error;
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

  const data = await authClient.signIn.social({ provider: 'apple' });

  if (!data) {
    throw createError([ERROR_CODES.AUTH_NO_DATA]);
  }

  router.replace('/(main)/home');
}

/**
 * Handles Google OAuth sign-in
 * @throws Error if auth fails
 */
export async function handleGoogleAuth(router: Router): Promise<void> {
  if (!isServerValid()) {
    throw createError([ERROR_CODES.SERVER_NOT_CONFIGURED]);
  }

  const data = await authClient.signIn.social({ provider: 'google' });

  if (!data) {
    throw createError([ERROR_CODES.AUTH_NO_DATA]);
  }

  router.replace('/(main)/home');
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
    throw new Error(error.message || ERROR_CODES.AUTH_FAILED);
  }

  if (!data) {
    throw createError([ERROR_CODES.AUTH_NO_DATA]);
  }

  router.replace('/(main)/home');
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
    throw new Error(error.message || ERROR_CODES.AUTH_FAILED);
  }

  if (!data) {
    throw createError([ERROR_CODES.AUTH_NO_DATA]);
  }

  router.replace('/(main)/home');
}
