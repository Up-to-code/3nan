/**
 * Auth Utilities
 *
 * Contains all validation, error codes, and server checks for authentication.
 * Consolidated for cleaner imports and maintenance.
 */

import { authClient } from '@/lib/auth-client';

// ============================================
// ERROR CODES
// ============================================

/** Error code constants for i18n mapping */
export const ERROR_CODES = {
  // Name
  NAME_REQUIRED: 'NAME_REQUIRED',
  NAME_MIN_LENGTH: 'NAME_MIN_LENGTH',
  // Email
  EMAIL_INVALID: 'EMAIL_INVALID',
  // Password
  PASSWORD_REQUIRED: 'PASSWORD_REQUIRED',
  PASSWORD_MIN_LENGTH: 'PASSWORD_MIN_LENGTH',
  PASSWORD_UPPERCASE: 'PASSWORD_UPPERCASE',
  PASSWORD_LOWERCASE: 'PASSWORD_LOWERCASE',
  PASSWORD_NUMBER: 'PASSWORD_NUMBER',
  PASSWORD_SPECIAL: 'PASSWORD_SPECIAL',
  // Server
  SERVER_NOT_CONFIGURED: 'SERVER_NOT_CONFIGURED',
  // Auth
  AUTH_FAILED: 'AUTH_FAILED',
  AUTH_NO_DATA: 'AUTH_NO_DATA',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/** Maps error codes to i18n keys */
const ERROR_KEYS: Record<ErrorCode, string> = {
  NAME_REQUIRED: 'auth.errors.nameRequired',
  NAME_MIN_LENGTH: 'auth.errors.nameMinLength',
  EMAIL_INVALID: 'auth.errors.emailInvalid',
  PASSWORD_REQUIRED: 'auth.errors.passwordRequired',
  PASSWORD_MIN_LENGTH: 'auth.errors.passwordMinLength',
  PASSWORD_UPPERCASE: 'auth.errors.passwordUppercase',
  PASSWORD_LOWERCASE: 'auth.errors.passwordLowercase',
  PASSWORD_NUMBER: 'auth.errors.passwordNumber',
  PASSWORD_SPECIAL: 'auth.errors.passwordSpecial',
  SERVER_NOT_CONFIGURED: 'auth.errors.serverNotConfigured',
  AUTH_FAILED: 'auth.errors.authFailed',
  AUTH_NO_DATA: 'auth.errors.authNoData',
};

/**
 * Formats error codes into translated messages
 * @param errors - Array of error codes
 * @param t - Translation function
 */
export function formatErrors(errors: string[], t: (key: string) => string): string {
  if (errors.length === 0) return '';
  return errors
    .map((code) => t(ERROR_KEYS[code as ErrorCode] || 'auth.errors.unknown'))
    .join(', ');
}

// ============================================
// VALIDATION
// ============================================

/** Email regex pattern */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates email format */
export function isValidEmail(email: string): boolean {
  return !!email && EMAIL_REGEX.test(email.trim());
}

/** Validates name (min 3 chars, required) */
export function isValidName(name: string): boolean {
  const trimmed = name?.trim() || '';
  return trimmed.length >= 3 && trimmed.length <= 100;
}

/**
 * Validates password with rules:
 * - Min 8 characters
 * - 1 uppercase, 1 lowercase, 1 number, 1 special char
 * @returns Array of error codes (empty = valid)
 */
export function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (!password) {
    errors.push(ERROR_CODES.PASSWORD_REQUIRED);
    return errors;
  }

  if (password.length < 8) errors.push(ERROR_CODES.PASSWORD_MIN_LENGTH);
  if (!/[A-Z]/.test(password)) errors.push(ERROR_CODES.PASSWORD_UPPERCASE);
  if (!/[a-z]/.test(password)) errors.push(ERROR_CODES.PASSWORD_LOWERCASE);
  if (!/[0-9]/.test(password)) errors.push(ERROR_CODES.PASSWORD_NUMBER);
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push(ERROR_CODES.PASSWORD_SPECIAL);
  }

  return errors;
}

/** Sign-in params type */
export interface SignInParams {
  email: string;
  password: string;
}

/** Sign-up params type */
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

/**
 * Validates sign-in parameters
 * @returns Array of error codes (empty = valid)
 */
export function validateSignIn(params: SignInParams): string[] {
  const errors: string[] = [];

  if (!isValidEmail(params.email)) errors.push(ERROR_CODES.EMAIL_INVALID);
  errors.push(...validatePassword(params.password));

  return errors;
}

/**
 * Validates sign-up parameters
 * @returns Array of error codes (empty = valid)
 */
export function validateSignUp(params: SignUpParams): string[] {
  const errors: string[] = [];

  if (!params.name?.trim()) {
    errors.push(ERROR_CODES.NAME_REQUIRED);
  } else if (!isValidName(params.name)) {
    errors.push(ERROR_CODES.NAME_MIN_LENGTH);
  }

  if (!isValidEmail(params.email)) errors.push(ERROR_CODES.EMAIL_INVALID);
  errors.push(...validatePassword(params.password));

  return errors;
}

// ============================================
// SERVER CHECK
// ============================================

/**
 * Checks if auth server is properly configured
 * @returns true if server URL is valid and not placeholder
 */
export function isServerValid(): boolean {
  const baseURL = process.env.EXPO_PUBLIC_CONVEX_SITE_URL;

  // Check if configured and not placeholder
  if (
    !baseURL ||
    baseURL.includes('YOUR_CLOUD_DEPLOYMENT') ||
    baseURL === 'http://127.0.0.1:3211'
  ) {
    return false;
  }

  // Validate URL format
  try {
    new URL(baseURL);
    return !!authClient;
  } catch {
    return false;
  }
}
