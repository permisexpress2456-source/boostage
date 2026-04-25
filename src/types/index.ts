// Type definitions for Kamiboost SMM Panel

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'reseller';
  language: 'en' | 'fr';
  lastLogin: Date;
  isActive: boolean;
}

export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
  csrfToken: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  redirectUrl?: string;
}

export type Language = 'en' | 'fr';

// Additional type definitions for the login system

export interface Session {
  userId: string;
  token: string;
  expiresAt: Date;
  rememberMe: boolean;
  ipAddress: string;
  userAgent: string;
}

export interface LoginFormState {
  username: {
    value: string;
    error?: string;
    touched: boolean;
  };
  password: {
    value: string;
    error?: string;
    touched: boolean;
    visible: boolean;
  };
  rememberMe: boolean;
  isSubmitting: boolean;
  submitError?: string;
}

export interface LanguageState {
  current: Language;
  available: Array<{
    code: Language;
    name: string;
    flag: string;
  }>;
  translations: Record<string, string>;
}

export interface AppState {
  auth: {
    isAuthenticated: boolean;
    user?: User;
    isLoading: boolean;
  };
  language: LanguageState;
  ui: {
    theme: 'light' | 'dark';
    isMobile: boolean;
    screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  };
}

export interface CSRFToken {
  value: string;
  expiresAt: Date;
  sessionId: string;
}

export interface RateLimit {
  identifier: string;
  attempts: number;
  windowStart: Date;
  blockedUntil?: Date;
}

export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  DATABASE_URL?: string;
  WHATSAPP_NUMBER: string;
  CSRF_SECRET: string;
  RATE_LIMIT_WINDOW: number;
  RATE_LIMIT_MAX_ATTEMPTS: number;
}

export interface FeatureFlags {
  enableRememberMe: boolean;
  enablePasswordRecovery: boolean;
  enableWhatsAppWidget: boolean;
  enableRateLimiting: boolean;
  enableCSRFProtection: boolean;
}

// Component prop types
export interface LoginPageProps {
  initialLanguage: Language;
  csrfToken: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
}

// API request/response types
export interface SignInRequest {
  username: string;
  password: string;
  rememberMe: boolean;
  csrfToken: string;
}

export interface SignInResponse {
  success: boolean;
  error?: string;
  redirectUrl?: string;
}

export interface LanguagePreferenceRequest {
  language: Language;
}

export interface LanguagePreferenceResponse {
  success: boolean;
  language: Language;
}