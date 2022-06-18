import { editUrlSchema, validate } from "../../validation";
import { HttpRequest } from "../../express-callback";

export default function makePatchUrl({ editUrl }: { editUrl: any }) {
	return async function patchUrl(httpRequest: HttpRequest) {
		const { id } = httpRequest.params;
		const { userId } = httpRequest.session;
		const changes: any = { ...httpRequest.body };

		await validate(editUrlSchema, { id, userId, ...changes });

		const response = await editUrl({ id, userId, changes });

		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			body: response,
		};
	};
}
