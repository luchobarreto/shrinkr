import { HttpRequest } from "../../express-callback";
import { validate, addUrlSchema } from "../../validation";

export default function makeCreateUrl({ addUrl }: { addUrl: any }) {
	return async function createUrl(httpRequest: HttpRequest) {
		const { url } = httpRequest.body;
		const { userId } = httpRequest.session;

		await validate(addUrlSchema, { url, userId });

		const response = await addUrl({ url, userId });

		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 201,
			body: {
				id: response._id,
				message: "Url created successfully",
			},
		};
	};
}
