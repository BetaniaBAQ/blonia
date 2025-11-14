import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";

export const userSpacesQueries = {
	byOwnerId: (ownerId: string) =>
		convexQuery(api.userSpaces.queries.getOrganizationByOwnerId, { ownerId }),
};
