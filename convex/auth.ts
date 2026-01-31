import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', email))
      .first();
  },
});

// Create or update user on sign in
export const upsertUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    provider: v.union(
      v.literal('google'),
      v.literal('apple'),
      v.literal('email')
    ),
  },
  handler: async (ctx, { email, name, avatar, provider }) => {
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', email))
      .first();

    const now = Date.now();

    if (existingUser) {
      // Update last login
      await ctx.db.patch(existingUser._id, {
        lastLoginAt: now,
        name,
        avatar,
      });
      return existingUser._id;
    }

    // Create new user
    return await ctx.db.insert('users', {
      email,
      name,
      avatar,
      provider,
      createdAt: now,
      lastLoginAt: now,
    });
  },
});

// Get current user by ID
export const getUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return await ctx.db.get(userId);
  },
});
