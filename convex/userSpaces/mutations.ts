import { mutation } from "convex/_generated/server";
import { CreateUserSpaceInput } from "./validations";

export const create = mutation({
	args: CreateUserSpaceInput,
	handler: async ({ db }, data) => {
		const orgId = await db.insert("userSpaces", {
			name: data.name,
			ownerId: data.ownerId,
		});

		return orgId;
	},
});
