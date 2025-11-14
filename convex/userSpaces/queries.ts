import { query } from "convex/_generated/server";
import { v } from "convex/values";

export const getOrganizationByOwnerId = query({
	args: v.object({ ownerId: v.string() }),
	handler: async (ctx, args) => {
		const tasks = await ctx.db
			.query("userSpaces")
			.withIndex("by_owner_id", (q) => q.eq("ownerId", args.ownerId))
			.unique();
		return tasks;
	},
});
