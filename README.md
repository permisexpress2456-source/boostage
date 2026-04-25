# Kamiboost SMM Panel - Login Page

A secure, bilingual authentication interface for the Kamiboost Social Media Marketing platform.

## Features

- 🔐 Secure authentication with CSRF protection
- 🌍 Bilingual support (English/French)
- 📱 Responsive design (320px to 1920px)
- 🔑 Password visibility toggle
- 💬 WhatsApp customer support integration
- ⚡ Next.js 14+ with TypeScript
- 🧪 Property-based testing with fast-check

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Bootstrap 5.3+ with CSS Modules
- **Authentication**: NextAuth.js
- **Internationalization**: next-i18next
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Jest + React Testing Library + fast-check

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run type-check` - Check TypeScript types

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   ├── ui/             # Basic UI components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── auth/           # Authentication components
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles and CSS modules
```

## Security Features

- CSRF protection on all forms
- Rate limiting for authentication attempts
- Input sanitization and validation
- HTTPS enforcement
- Secure session management
- XSS protection headers

## Testing

The project uses a dual testing approach:

- **Unit Tests**: Specific examples and edge cases
- **Property Tests**: Universal properties across all inputs

Run tests with:
```bash
npm run test
```

## License

Private - Kamiboost SMM Panel