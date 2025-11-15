import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { userSpacesQueries } from "@/queries/userSpaces";

export const Route = createFileRoute("/_dashboard")({
	loader: async ({ context: { queryClient, user } }) => {
		await queryClient.ensureQueryData(userSpacesQueries.byOwnerId(user.id));
	},
	component: DashboardLayout,
});

export const DashboardRoute = getRouteApi("/_dashboard");
