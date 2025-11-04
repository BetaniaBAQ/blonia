import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Create or update user and session after successful OTP verification
export const createOrUpdateUser = mutation({
  args: {
    email: v.string(),
    workosUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()

    // Find existing user by email
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()

    let userId
    // Create or update user
    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        lastLoginAt: now,
        workosUserId: args.workosUserId,
      })
      userId = existingUser._id
    } else {
      userId = await ctx.db.insert('users', {
        email: args.email,
        workosUserId: args.workosUserId,
        createdAt: now,
        lastLoginAt: now,
      })
    }

    // Create session with a random token
    // Generate a random token using a simple approach that works in Convex
    const token = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')

    const expiresAt = now + 30 * 24 * 60 * 60 * 1000 // 30 days

    await ctx.db.insert('sessions', {
      userId,
      token,
      expiresAt,
      createdAt: now,
    })

    return { userId, token }
  },
})

// Get current user from session token
export const getCurrentUser = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query('sessions')
      .withIndex('by_token', (q) => q.eq('token', args.token))
      .first()

    if (!session || session.expiresAt < Date.now()) {
      return null
    }

    const user = await ctx.db.get(session.userId)
    return user
  },
})

// Logout - delete session
export const logout = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query('sessions')
      .withIndex('by_token', (q) => q.eq('token', args.token))
      .first()

    if (session) {
      await ctx.db.delete(session._id)
    }
  },
})
