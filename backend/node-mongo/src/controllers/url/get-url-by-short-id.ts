import { validate, getUrlShortId } from "../../validation";
import { HttpRequest } from "../../express-callback";

export default function makeGetUrlByShortId({ listUrlByShortId }: { listUrlByShortId: any }) {
	return async function getUrlByShortId(httpRequest: HttpRequest) {
		const { shortId } = httpRequest.params;
		await validate(getUrlShortId, { shortId });

		const response = await listUrlByShortId({ shortId });

		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			body: response,
		};
	};
}
