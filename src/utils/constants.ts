// Application constants for Kamiboost SMM Panel

export const APP_CONFIG = {
  name: 'Kamiboost SMM Panel',
  version: '1.0.0',
  description: 'Social Media Marketing Panel for Agencies and Resellers',
} as const;

export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;

export const DEFAULT_LANGUAGE = 'en' as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PASSWORD_RESET: '/password-reset',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    SESSION: '/api/auth/session',
  },
  USER: {
    LANGUAGE: '/api/user/language',
  },
} as const;

export const FORM_VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
} as const;

export const SECURITY = {
  CSRF_TOKEN_NAME: 'csrfToken',
  SESSION_COOKIE_NAME: 'next-auth.session-token',
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_ATTEMPTS: 5,
  },
} as const;

export const WHATSAPP = {
  SUPPORT_NUMBER: '+237123456789', // This should be configured via environment
  DEFAULT_MESSAGE: 'Hello, I need help with my Kamiboost account.',
} as const;