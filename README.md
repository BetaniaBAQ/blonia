# Blonia

A TanStack Start application with Convex database and WorkOS authentication using OTP (One-Time Password) login.

## Features

- **TanStack Start** - Full-stack React framework with file-based routing
- **React 19** - Latest React with modern features
- **Convex** - Real-time database with type-safe queries and mutations
- **WorkOS AuthKit** - Enterprise-grade passwordless authentication (OTP via email)
- **Tailwind CSS v4** - Utility-first CSS framework with modern features
- **Shadcn UI** - Beautiful, accessible UI components built on Radix UI
- **TypeScript** - Full type safety across the entire stack
- **t3-oss/env** - Type-safe environment variables with runtime validation
- **Biome** - Fast linting and formatting (replaces ESLint + Prettier)
- **Vitest** - Fast unit testing with React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A [Convex account](https://convex.dev)
- A [WorkOS account](https://workos.com)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Convex

Initialize Convex and create a deployment:

```bash
pnpm convex:dev
```

This will:
- Guide you through creating a Convex account (if needed)
- Create a new Convex deployment
- Generate your `CONVEX_URL`

### 3. Set Up WorkOS

1. Sign up at [WorkOS Dashboard](https://dashboard.workos.com)
2. Create a new application
3. Enable **AuthKit** (passwordless authentication)
4. Configure the redirect URI:
   - Development: `http://localhost:3000/api/auth/callback`
   - Production: `https://yourdomain.com/api/auth/callback`
5. Get your **API Key** and **Client ID** from the dashboard

### 4. Configure Environment Variables

This project uses [t3-oss/env](https://env.t3.gg/) for type-safe environment variables with runtime validation.

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```bash
# Convex Deployment (set automatically by `convex dev`)
CONVEX_DEPLOYMENT=dev:your-team-project

# Convex (client-side - must have VITE_ prefix)
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# WorkOS Authentication
WORKOS_API_KEY=sk_test_...                                    # From WorkOS Dashboard
WORKOS_CLIENT_ID=client_...                                   # From WorkOS Dashboard
WORKOS_REDIRECT_URI=http://localhost:3000/api/auth/callback  # Update for production
WORKOS_COOKIE_PASSWORD=your-32-character-secret-key-here     # Generate with: openssl rand -base64 32

# Node Environment (optional)
NODE_ENV=development
```

**Important Notes:**
- **Server-side variables**: `WORKOS_API_KEY`, `WORKOS_CLIENT_ID`, `WORKOS_REDIRECT_URI`, `WORKOS_COOKIE_PASSWORD`
- **Client-side variables** must be prefixed with `VITE_`: `VITE_CONVEX_URL`
- **CONVEX_DEPLOYMENT** is set automatically by `convex dev` (you'll get this after running `pnpm convex:dev`)
- **WORKOS_COOKIE_PASSWORD** must be at least 32 characters (generate with `openssl rand -base64 32`)
- All environment variables are validated at runtime using Zod schemas in `src/env.ts`

### 5. Run the Development Server

You'll need to run both the Vite dev server and Convex in separate terminals:

**Terminal 1 - Vite Dev Server:**
```bash
pnpm dev
```

**Terminal 2 - Convex Dev:**
```bash
pnpm convex:dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── routes/                      # File-based routing
│   ├── __root.tsx              # Root layout with providers (Convex, WorkOS AuthKit)
│   ├── index.tsx               # Home page
│   ├── _authenticated.tsx      # Layout route with authentication guard
│   ├── _authenticated/
│   │   └── dashboard.tsx       # Protected dashboard page
│   └── api/
│       └── auth/
│           └── callback.ts     # WorkOS OAuth callback handler
├── components/
│   ├── ui/                     # Shadcn UI components
│   │   └── button.tsx
│   └── Header.tsx              # App header component
├── lib/
│   ├── convex.ts               # Convex client setup
│   └── utils.ts                # Utility functions
├── env.ts                      # Environment variable validation (t3-oss/env)
├── router.tsx                  # TanStack Router configuration
└── styles.css                  # Global styles (Tailwind CSS v4)

convex/
├── schema.ts                   # Database schema (users, sessions)
├── auth.ts                     # Convex functions for user management
└── _generated/                 # Generated Convex types
```

## Authentication Flow

This app uses WorkOS AuthKit for passwordless authentication with OTP (One-Time Password):

1. User accesses a protected route under `_authenticated/*` (e.g., `/dashboard`)
2. The `_authenticated.tsx` layout loader checks authentication via `getAuth()` from WorkOS
3. If not authenticated, user is redirected to WorkOS sign-in URL with return path
4. WorkOS handles the OTP flow (sends email code to user)
5. After verification, WorkOS calls back to `/api/auth/callback`
6. The callback handler processes the callback via `handleCallbackRoute()` and establishes session
7. User is redirected back to the original protected route
8. User profile is stored in Convex database

**Key Files:**
- `src/routes/_authenticated.tsx:5-16` - Authentication guard implementation
- `src/routes/api/auth/callback.ts` - WorkOS OAuth callback handler
- `convex/auth.ts` - Convex database functions for user management

## Available Scripts

- `pnpm dev` - Start Vite development server
- `pnpm convex:dev` - Start Convex development mode
- `pnpm build` - Build for production
- `pnpm serve` - Preview production build
- `pnpm test` - Run tests with Vitest
- `pnpm lint` - Lint code with Biome
- `pnpm format` - Format code with Biome
- `pnpm check` - Check and fix code with Biome

## Adding UI Components

This project uses Shadcn UI components. To add a new component:

```bash
pnpx shadcn@latest add [component-name]
```

For example:
```bash
pnpx shadcn@latest add button
pnpx shadcn@latest add input
```

## Database Schema

The Convex schema includes:

- **users** - User profiles with email/phone and WorkOS user ID
- **sessions** - Active user sessions with tokens

You can modify the schema in `convex/schema.ts`.

## Learn More

- [TanStack Start Documentation](https://tanstack.com/start)
- [Convex Documentation](https://docs.convex.dev)
- [WorkOS Documentation](https://workos.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Shadcn UI Documentation](https://ui.shadcn.com)

## License

MIT
