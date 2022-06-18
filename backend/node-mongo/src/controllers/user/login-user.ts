import { HttpRequest } from "../../express-callback";
import { loginSchema, validate } from "../../validation";
import { BadRequest } from "../../errors";

interface props {
	signInUser: any;
}

export default function makeLoginUser({ signInUser }: props) {
	return async function loginUser(httpRequest: HttpRequest) {
		const { email, password } = httpRequest.body;
		await validate(loginSchema, { email, password }, "Email and password are required");
		const userId = await signInUser({ email, password });
		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 204,
			body: {},
			session: { userId },
		};
	};
}
