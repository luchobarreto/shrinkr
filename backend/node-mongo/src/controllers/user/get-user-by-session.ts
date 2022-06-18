import { HttpRequest } from "../../express-callback";

export default function makeGetUserBySession({ listUser }: { listUser: any }) {
	return async function getUserBySession(httpRequest: HttpRequest) {
		const userId = await httpRequest.session.userId;
		const res = await listUser({ id: userId });
		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			body: res,
		};
	};
}
