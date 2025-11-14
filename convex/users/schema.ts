import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
	email: v.string(),
	firstName: v.optional(v.string()),
	lastName: v.optional(v.string()),
	createdAt: v.string(),
	updatedAt: v.string(),
	lastSignInAt: v.string(),
	imageUrl: v.optional(v.string()),
	workosId: v.string(),
})
	.index("by_email", ["email"])
	.index("by_workos_id", ["workosId"]);
