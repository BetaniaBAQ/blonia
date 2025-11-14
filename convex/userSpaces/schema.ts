import { defineTable } from "convex/server";
import { v } from "convex/values";

export const userSpaces = defineTable({
	name: v.string(),
	ownerId: v.optional(v.string()),
})
	.index("by_name", ["name"])
	.index("by_owner_id", ["ownerId"]);
