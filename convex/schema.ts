import { defineSchema } from "convex/server";
import { userSpaces } from "./userSpaces/schema";
import { users } from "./users/schema";

export default defineSchema({
	users,
	userSpaces,
});
