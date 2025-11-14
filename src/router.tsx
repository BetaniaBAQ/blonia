import { ConvexQueryClient } from "@convex-dev/react-query";
import { notifyManager, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ConvexProvider } from "convex/react";

import { env } from "./env";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
	if (typeof document !== "undefined") {
		notifyManager.setScheduler(window.requestAnimationFrame);
	}

	const CONVEX_URL = env.VITE_CONVEX_URL;

	const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});

	convexQueryClient.connect(queryClient);

	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		context: { queryClient },
		defaultNotFoundComponent: () => <div>404 - Page Not Found</div>,
		Wrap: ({ children }) => (
			<ConvexProvider client={convexQueryClient.convexClient}>
				{children}
			</ConvexProvider>
		),
	});

	setupRouterSsrQueryIntegration({ router, queryClient });

	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
