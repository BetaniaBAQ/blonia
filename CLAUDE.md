# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blonia is a full-stack React application built with TanStack Start, featuring Convex for real-time database operations and WorkOS for enterprise-grade authentication. The app uses OTP (One-Time Password) authentication flow via email.

## Development Commands

### Running the App
Development requires two concurrent processes:
```bash
pnpm dev           # Vite dev server (runs on port 3000)
pnpm convex:dev    # Convex backend in watch mode
```

### Code Quality
```bash
pnpm check         # Run Biome linting and formatting (check + fix)
pnpm lint          # Lint code with Biome
pnpm format        # Format code with Biome
pnpm test          # Run tests with Vitest
pnpm build         # Build for production
```

### Adding UI Components
Use Shadcn for new UI components:
```bash
pnpx shadcn@latest add [component-name]
```

## Architecture

### Stack Components
- **Frontend**: TanStack Start (file-based routing), React 19, Tailwind CSS v4
- **Backend**: TanStack Start server functions (type-safe API endpoints)
- **Database**: Convex (real-time, type-safe queries and mutations)
- **Authentication**: WorkOS AuthKit (OTP-based, no passwords)
- **Styling**: Tailwind CSS v4 with Shadcn UI components
- **Code Quality**: Biome (linting + formatting, tabs, double quotes)
- **Testing**: Vitest with React Testing Library

### Environment Variables
Environment variables are validated at runtime using `@t3-oss/env-core` with Zod schemas (see `src/env.ts`):
- **Server-side**: `WORKOS_API_KEY`, `WORKOS_CLIENT_ID`, `NODE_ENV`
- **Client-side**: Must be prefixed with `VITE_` (e.g., `VITE_CONVEX_URL`)
- Validation is skipped in browser to prevent client-side access to server vars

### File-Based Routing
Routes are defined in `src/routes/` using TanStack Start's file-based routing:
- `__root.tsx` - Root layout with providers (ConvexProvider, AuthKitProvider)
- `_authenticated.tsx` - Layout route with authentication guard using WorkOS `getAuth()`
- `_authenticated/dashboard.tsx` - Protected dashboard page
- `api/auth/callback.ts` - WorkOS OAuth callback handler
- Generated route tree is in `src/routeTree.gen.ts` (excluded from Biome checks)

### Authentication Flow
1. User accesses protected route under `_authenticated/*`
2. `_authenticated.tsx` loader checks authentication via `getAuth()` from WorkOS
3. If not authenticated, redirects to WorkOS sign-in URL with return path
4. WorkOS handles OTP flow (email code)
5. After verification, WorkOS calls back to `/api/auth/callback`
6. `handleCallbackRoute()` processes the callback and establishes session
7. User is redirected back to original protected route

**Key Files**:
- `src/routes/_authenticated.tsx:5-16` - Authentication guard implementation
- `src/routes/api/auth/callback.ts:1-10` - WorkOS callback handler

### Convex Database
Schema is defined in `convex/schema.ts`:
- **users** table: `email`, `phone`, `name`, `workosUserId`, `createdAt`, `lastLoginAt`
  - Indexes: `by_email`, `by_phone`, `by_workos_user_id`
- **sessions** table: `userId`, `token`, `expiresAt`, `createdAt`
  - Indexes: `by_token`, `by_user_id`

Convex functions in `convex/auth.ts`:
- `createOrUpdateUser` (mutation) - Creates/updates user after OTP verification
- `getCurrentUser` (query) - Gets user by session token
- `logout` (mutation) - Deletes session

### Provider Hierarchy
The app uses a specific provider nesting order in `src/routes/__root.tsx:35-62`:
```
html
└── ConvexProvider (Convex client)
    └── AuthKitProvider (WorkOS auth)
        └── App routes
        └── TanStackDevtools (with Router devtools plugin)
```

### Vite Configuration
Key plugins in `vite.config.ts`:
- `nitroV2Plugin()` - TanStack Start server rendering
- `viteTsConfigPaths()` - Enables path aliases from tsconfig
- `tailwindcss()` - Tailwind CSS v4 integration
- `tanstackStart()` - TanStack Start framework
- `react()` - React plugin

### Code Style
Biome is configured with:
- Tab indentation
- Double quotes for JS/TS
- Auto-organize imports
- Excludes `src/routeTree.gen.ts` and `src/styles.css` from checks

## Important Patterns

### Type Safety
- All Convex queries/mutations are fully typed via generated types in `convex/_generated/`
- Environment variables are type-safe and validated at runtime via `src/env.ts`
- TanStack Router provides type-safe routing with generated route tree

### Protected Routes
Use the `_authenticated` layout route pattern to protect pages:
```tsx
// In src/routes/_authenticated/newpage.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/newpage')({
  component: NewPage,
})
```
The parent `_authenticated.tsx` loader automatically handles authentication.

### Convex Client Usage
Client is instantiated in `src/lib/convex.ts` and provided via ConvexProvider.
Use Convex React hooks in components:
```tsx
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

const user = useQuery(api.auth.getCurrentUser, { token })
const createUser = useMutation(api.auth.createOrUpdateUser)
```
