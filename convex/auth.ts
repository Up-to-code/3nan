import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth/minimal";
import { expo } from '@better-auth/expo'
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import authConfig from "./auth.config";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_ATTEMPTS = 10;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth);

const trustedOrigins = [
  "3nan://",
  "3nan:///",
  "3nan://*",
  ...(process.env.NODE_ENV !== "production" ? ["exp://*"] as const : []),
];

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    trustedOrigins,
    database: authComponent.adapter(ctx),
    // Configure simple, non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // The Expo and Convex plugins are required
      expo(),
      convex({ authConfig }),
    ],
  })
}
// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});

/**
 * Privacy-preserving email check: always returns { checkInitiated: true }.
 * Rate-limited by normalized email. Does not reveal account existence.
 */
export const checkEmailExists = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const key = email.trim().toLowerCase();
    const now = Date.now();
    const windowEnd = now + RATE_LIMIT_WINDOW_MS;

    const existing = await ctx.db
      .query("rateLimitCheckEmail")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    if (existing) {
      if (existing.windowEnd < now) {
        await ctx.db.patch(existing._id, { count: 1, windowEnd });
      } else {
        if (existing.count >= RATE_LIMIT_MAX_ATTEMPTS) {
          return { checkInitiated: true };
        }
        await ctx.db.patch(existing._id, { count: existing.count + 1 });
      }
    } else {
      await ctx.db.insert("rateLimitCheckEmail", {
        key,
        count: 1,
        windowEnd,
      });
    }

    await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", key))
      .first();
    return { checkInitiated: true };
  },
});