import { HttpRequest } from "../../express-callback";

export default function makeRemoveUser({ deleteUser }: { deleteUser: any }) {
	return async function removeUser(httpRequest: HttpRequest) {
		const { userId } = httpRequest.session;
		const res = await deleteUser({ userId });
		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			body: {
				message: "User successfully deleted.",
				...res,
			},
			logOut: true,
		};
	};
}
