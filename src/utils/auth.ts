// Authentication utilities for Kamiboost SMM Panel

import type { User, LoginFormData, AuthResponse } from '@/types';

export interface SessionData {
  user: User;
  expires: string;
  accessToken?: string;
}

export const isValidSession = (session: SessionData | null): boolean => {
  if (!session || !session.user || !session.expires) {
    return false;
  }

  const expirationDate = new Date(session.expires);
  const now = new Date();

  return expirationDate > now;
};

export const formatLoginData = (formData: LoginFormData): LoginFormData => {
  return {
    username: formData.username.trim().toLowerCase(),
    password: formData.password,
    rememberMe: Boolean(formData.rememberMe),
    csrfToken: formData.csrfToken,
  };
};

export const createAuthHeaders = (csrfToken?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  return headers;
};

export const handleAuthError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected authentication error occurred';
};

export const getRedirectUrl = (
  callbackUrl?: string,
  defaultUrl: string = '/dashboard'
): string => {
  // Validate callback URL to prevent open redirect attacks
  if (!callbackUrl) {
    return defaultUrl;
  }

  try {
    const url = new URL(callbackUrl, window.location.origin);
    
    // Only allow same-origin redirects
    if (url.origin !== window.location.origin) {
      return defaultUrl;
    }

    return url.pathname + url.search;
  } catch {
    return defaultUrl;
  }
};

export const generateSessionId = (): string => {
  // Generate a random session identifier
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};