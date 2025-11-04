import { ConvexReactClient } from 'convex/react'

// On the client, we need to access import.meta.env directly
// because the env validation is skipped on client-side
const convexUrl = import.meta.env.VITE_CONVEX_URL

if (!convexUrl) {
  throw new Error(
    'VITE_CONVEX_URL is not set. Make sure to run `convex dev` and check your .env.local file.'
  )
}

export const convex = new ConvexReactClient(convexUrl)
