import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		WORKOS_API_KEY: z.string().min(1),
		WORKOS_CLIENT_ID: z.string().min(1),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},

	clientPrefix: "VITE_",
	client: {
		VITE_CONVEX_URL: z.url(),
	},

	/*
	 * Runtime environment variables
	 * For Node.js, use process.env
	 * For Vite client, use import.meta.env
	 */
	runtimeEnv: import.meta.env,

	/*
	 * Skip validation in browser (client-side code can't access server env vars)
	 */
	skipValidation: typeof window !== "undefined",

	/*
	 * Makes it so empty strings are treated as undefined
	 */
	emptyStringAsUndefined: true,
});
