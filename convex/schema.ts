import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    provider: v.union(
      v.literal('google'),
      v.literal('apple'),
      v.literal('email')
    ),
    createdAt: v.number(),
    lastLoginAt: v.number(),
  })
    .index('by_email', ['email'])
    .index('by_provider', ['provider']),

  sessions: defineTable({
    userId: v.id('users'),
    token: v.string(),
    expiresAt: v.number(),
    deviceInfo: v.optional(v.string()),
  })
    .index('by_user', ['userId'])
    .index('by_token', ['token']),

  rateLimitCheckEmail: defineTable({
    key: v.string(),
    count: v.number(),
    windowEnd: v.number(),
  }).index('by_key', ['key']),
});
