// NextAuth.js type extensions for Kamiboost SMM Panel

import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: 'user' | 'admin' | 'reseller';
      language: 'en' | 'fr';
      lastLogin: Date;
      isActive: boolean;
    };
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin' | 'reseller';
    language: 'en' | 'fr';
    lastLogin: Date;
    isActive: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    role: 'user' | 'admin' | 'reseller';
    language: 'en' | 'fr';
  }
}