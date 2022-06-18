import { validate, getUrlSchema } from "../../validation";
import { HttpRequest } from "../../express-callback";

export default function makeGetUrl({ listUrl }: { listUrl: any }) {
	return async function getUrl(httpRequest: HttpRequest) {
		const { id } = httpRequest.params;
		const { userId } = httpRequest.session;
		await validate(getUrlSchema, { id });

		const response = await listUrl({ id, userId });

		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			body: response,
		};
	};
}
