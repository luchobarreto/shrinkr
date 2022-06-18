import { HttpRequest } from "../../express-callback";
import { registerUserSchema, validate } from "../../validation";

interface props {
	addUser: any;
}

export default function makeCreateUser({ addUser }: props) {
	return async function createUser(httpRequest: HttpRequest) {
		const { email, password, phone, name, birthdate } = httpRequest.body;
		await validate(registerUserSchema, { email, password, name });
		await addUser({ email, password, name });
		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 201,
			body: {
				message: "User Created",
			},
		};
	};
}
