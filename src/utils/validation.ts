// Form validation utilities for Kamiboost SMM Panel

import { FORM_VALIDATION } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateUsername = (username: string): ValidationResult => {
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: 'Username is required' };
  }

  if (username.length < FORM_VALIDATION.USERNAME.MIN_LENGTH) {
    return {
      isValid: false,
      error: `Username must be at least ${FORM_VALIDATION.USERNAME.MIN_LENGTH} characters`,
    };
  }

  if (username.length > FORM_VALIDATION.USERNAME.MAX_LENGTH) {
    return {
      isValid: false,
      error: `Username must not exceed ${FORM_VALIDATION.USERNAME.MAX_LENGTH} characters`,
    };
  }

  // Basic username format validation (alphanumeric, underscore, hyphen)
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, underscores, and hyphens',
    };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < FORM_VALIDATION.PASSWORD.MIN_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${FORM_VALIDATION.PASSWORD.MIN_LENGTH} characters`,
    };
  }

  if (password.length > FORM_VALIDATION.PASSWORD.MAX_LENGTH) {
    return {
      isValid: false,
      error: `Password must not exceed ${FORM_VALIDATION.PASSWORD.MAX_LENGTH} characters`,
    };
  }

  return { isValid: true };
};

export const sanitizeInput = (input: string): string => {
  // Basic input sanitization - remove potentially dangerous characters
  return input
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove basic XSS characters
    .substring(0, 1000); // Limit length
};

export const validateCSRFToken = (token: string): ValidationResult => {
  if (!token || token.trim().length === 0) {
    return { isValid: false, error: 'CSRF token is required' };
  }

  // Basic token format validation (should be a long random string)
  if (token.length < 32) {
    return { isValid: false, error: 'Invalid CSRF token format' };
  }

  return { isValid: true };
};