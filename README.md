# Blonia

A TanStack Start application with Convex database and WorkOS authentication using OTP (One-Time Password) login.

## Features

- **TanStack Start** - Full-stack React framework
- **Convex** - Real-time database with type-safe queries
- **WorkOS** - Enterprise-grade authentication with OTP (email/phone)
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety across the stack
- **t3-oss/env** - Type-safe environment variables with runtime validation

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
3. Enable MagicAuth (passwordless authentication)
4. Get your API Key and Client ID from the dashboard

### 4. Configure Environment Variables

This project uses [t3-oss/env](https://env.t3.gg/) for type-safe environment variables with runtime validation.

Create a `.env.local` file in the root directory:

```bash
# Convex (server-side)
CONVEX_URL=https://your-deployment.convex.cloud

# Convex (client-side - must have VITE_ prefix)
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# WorkOS Authentication
WORKOS_API_KEY=sk_test_...
WORKOS_CLIENT_ID=client_...

# Node Environment (optional)
NODE_ENV=development
```

**Important Notes:**
- Server-side variables: `CONVEX_URL`, `WORKOS_API_KEY`, `WORKOS_CLIENT_ID`
- Client-side variables must be prefixed with `VITE_`: `VITE_CONVEX_URL`
- All environment variables are validated at runtime using Zod schemas
- See `src/env.ts` for the full schema definition

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
├── routes/               # File-based routing
│   ├── __root.tsx       # Root layout with providers
│   ├── index.tsx        # Home page (redirects to dashboard)
│   ├── login.tsx        # Login page with OTP
│   └── dashboard.tsx    # Protected dashboard page
├── contexts/
│   └── AuthContext.tsx  # Authentication state management
├── components/
│   └── ui/              # UI components
├── lib/
│   ├── convex.ts        # Convex client setup
│   ├── workos.ts        # WorkOS client setup
│   ├── auth-server.ts   # Server functions for authentication
│   └── utils.ts         # Utility functions
└── styles.css           # Global styles

convex/
├── schema.ts            # Database schema
├── auth.ts              # Authentication functions
└── _generated/          # Generated Convex types
```

## Authentication Flow

1. User enters email or phone number on `/login` (auto-detects type)
2. Client calls `sendOTPCode` server function
3. WorkOS sends OTP code via email or SMS
4. User enters the verification code
5. Client calls `verifyOTPCode` server function
6. Server verifies code with WorkOS
7. Server creates/updates user in Convex
8. Server generates session token
9. Client stores token and redirects to dashboard

## Server Functions

The app uses TanStack Start's server functions for authentication, located in `src/lib/auth-server.ts`:

- `sendOTPCode` - Sends OTP via WorkOS
- `verifyOTPCode` - Verifies OTP and creates user session

Server functions are type-safe and can be called directly from client components.

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
