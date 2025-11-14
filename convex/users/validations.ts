import { v } from "convex/values";

export const CreateUserInput = v.object({
	id: v.string(),
	email: v.string(),
	first_name: v.optional(v.string()),
	last_name: v.optional(v.string()),
	created_at: v.string(),
	update_at: v.string(),
	last_sign_in_at: v.optional(v.string()),
	profile_picture_url: v.optional(v.string()),
});
