import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Server-side environment variables
   * These are only available on the server
   */
  server: {
    // CONVEX_URL is set by `convex dev` at runtime, fallback to VITE_CONVEX_URL
    CONVEX_URL: z.string().url().optional(),
    WORKOS_API_KEY: z.string().min(1),
    WORKOS_CLIENT_ID: z.string().min(1),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },

  /*
   * Client-side environment variables
   * These must be prefixed with VITE_ to be exposed to the client
   */
  client: {
    VITE_CONVEX_URL: z.string().url(),
  },

  /*
   * Runtime environment variables
   * For Node.js, use process.env
   * For Vite client, use import.meta.env
   */
  runtimeEnv:
    typeof window === 'undefined'
      ? {
          // CONVEX_URL is set by Convex CLI, fallback to VITE_CONVEX_URL
          CONVEX_URL: process.env.CONVEX_URL || process.env.VITE_CONVEX_URL,
          WORKOS_API_KEY: process.env.WORKOS_API_KEY,
          WORKOS_CLIENT_ID: process.env.WORKOS_CLIENT_ID,
          NODE_ENV: process.env.NODE_ENV || 'development',
          VITE_CONVEX_URL: process.env.VITE_CONVEX_URL,
        }
      : {
          VITE_CONVEX_URL: import.meta.env.VITE_CONVEX_URL,
        },

  /*
   * Skip validation in browser (client-side code can't access server env vars)
   */
  skipValidation: typeof window !== 'undefined',

  /*
   * Makes it so empty strings are treated as undefined
   */
  emptyStringAsUndefined: true,
})
