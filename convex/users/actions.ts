import { api } from "convex/_generated/api";
import { httpAction } from "convex/_generated/server";

interface CreateRequest {
	id: string;
	data: {
		object: string;
		id: string;
		email: string;
		email_verified: boolean;
		first_name: string | null;
		profile_picture_url: string | null;
		last_name: string | null;
		last_sign_in_at: string | null;
		locale: string;
		created_at: string;
		updated_at: string;
		external_id: string | null;
		metadata: object;
	};
	event: string;
	created_at: string;
}

export const CreateUserAction = httpAction(async (ctx, request) => {
	const { data, event } = (await request.json()) as CreateRequest;

	if (event !== "user.created") {
		return new Response(
			JSON.stringify({
				error: "invalid event type",
				status: "error",
			}),
			{
				status: 400,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	try {
		await ctx.runMutation(api.users.mutations.create, {
			created_at: data.created_at,
			email: data.email,
			first_name: data.first_name ?? undefined,
			id: data.id,
			last_name: data.last_name ?? undefined,
			last_sign_in_at: data.last_sign_in_at ?? data.created_at,
			profile_picture_url: data.profile_picture_url ?? undefined,
			update_at: data.updated_at,
		});

		const orgName = data.email.split("@")[0];
		await ctx.runMutation(api.userSpaces.mutations.create, {
			name: orgName,
			ownerId: data.id,
		});
	} catch (e: unknown) {
		return new Response(
			JSON.stringify({
				error: "could not create user or organization",
				status: "error",
				payload: typeof e === "object" ? { ...e } : e,
			}),
			{
				status: 400,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	return new Response(JSON.stringify({ status: "success" }), {
		status: 201,
		headers: { "Content-Type": "application/json" },
	});
});
