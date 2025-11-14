import { httpRouter } from "convex/server";
import { CreateUserAction } from "./users/actions";

const http = httpRouter();

http.route({
	path: "/webhook/workos/user/create",
	method: "POST",
	handler: CreateUserAction,
});

export default http;
