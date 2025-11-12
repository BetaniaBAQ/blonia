import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { AuthenticatedRouteAPI } from "../_authenticated";

export const Route = createFileRoute("/_authenticated/_dashboard")({
	component: () => {
		const { user } = AuthenticatedRouteAPI.useLoaderData();

		return (
			<DashboardLayout user={user}>
				<Outlet />
			</DashboardLayout>
		);
	},
});
