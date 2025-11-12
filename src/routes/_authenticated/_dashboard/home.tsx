import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/_dashboard/index"!</div>;
}
