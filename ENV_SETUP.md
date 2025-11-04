# Environment Variables Setup

This project uses **t3-oss/env** for type-safe, validated environment variables.

## Configuration File

All environment variable validation is defined in `src/env.ts`:

```typescript
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    CONVEX_URL: z.string().url(),
    WORKOS_API_KEY: z.string().min(1),
    WORKOS_CLIENT_ID: z.string().min(1),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  client: {
    VITE_CONVEX_URL: z.string().url(),
  },
  runtimeEnv: typeof process !== 'undefined' ? process.env : import.meta.env,
  skipValidation: typeof window !== 'undefined',
  emptyStringAsUndefined: true,
})
```

## Variable Types

### Server-Only Variables
These are only accessible on the server and should NEVER be exposed to the client:
- `CONVEX_URL` - Convex backend URL
- `WORKOS_API_KEY` - WorkOS secret API key
- `WORKOS_CLIENT_ID` - WorkOS client identifier
- `NODE_ENV` - Current environment

### Client Variables
These are exposed to the browser and must be prefixed with `VITE_`:
- `VITE_CONVEX_URL` - Convex URL for client-side connections

## Usage

### In Server Code
```typescript
import { env } from '../env'

// Fully typed and validated!
const apiKey = env.WORKOS_API_KEY
const convexUrl = env.CONVEX_URL
```

### In Client Code
```typescript
import { env } from '../env'

// Only client variables are accessible
const convexUrl = env.VITE_CONVEX_URL
// env.WORKOS_API_KEY // ❌ Type error - server-only
```

## Benefits

✅ **Type Safety** - Full TypeScript support with autocomplete
✅ **Runtime Validation** - Catches missing/invalid env vars at startup
✅ **Clear Errors** - Descriptive error messages when validation fails
✅ **No Process.env** - No more typos in `process.env.VARIABLE_NAME`
✅ **Server/Client Split** - Prevents accidentally exposing secrets to the client

## Migration Checklist

- [x] Install `@t3-oss/env-core` and `zod`
- [x] Create `src/env.ts` with validation schema
- [x] Update `src/lib/workos.ts` to use `env`
- [x] Update `src/lib/convex.ts` to use `env`
- [x] Update `src/lib/auth-server.ts` to use `env`
- [x] Update `.env.example` with all required variables
- [x] Update `.env.local` with NODE_ENV
- [x] Update README.md with new env setup instructions
