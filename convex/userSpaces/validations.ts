import { v } from "convex/values";

export const CreateUserSpaceInput = v.object({
	name: v.string(),
	ownerId: v.string(),
});
