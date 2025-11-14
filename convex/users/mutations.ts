import { mutation } from "convex/_generated/server";
import { CreateUserInput } from "./validations";

export const create = mutation({
	args: CreateUserInput,
	handler: async ({ db }, data) => {
		const userId = await db.insert("users", {
			workosId: data.id,
			email: data.email,
			firstName: data.first_name,
			lastName: data.last_name,
			createdAt: data.created_at,
			updatedAt: data.update_at,
			lastSignInAt: data.last_sign_in_at ?? data.created_at,
			imageUrl: data.profile_picture_url,
		});

		return userId;
	},
});
