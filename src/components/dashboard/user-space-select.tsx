// import { useQuery } from "@tanstack/react-query";
// import { userSpacesQueries } from "@/queries/userSpaces";

import { useQuery } from "@tanstack/react-query";
import { userSpacesQueries } from "@/queries/userSpaces";
import { DashboardRoute } from "@/routes/_dashboard";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export function UserSpaceSelect() {
	const { user } = DashboardRoute.useRouteContext();
	const { data: userSpace } = useQuery(userSpacesQueries.byOwnerId(user.id));
	console.log({ user, userSpace });

	if (!userSpace) return null;

	console.log({ user, userSpace });

	return (
		<Select defaultValue={userSpace._id}>
			<SelectTrigger>
				<SelectValue placeholder="Escoge un espacio" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem key={userSpace._id} value={userSpace._id}>
					{userSpace.name}
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
