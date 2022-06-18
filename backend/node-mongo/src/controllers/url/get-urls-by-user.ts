import { HttpRequest } from "../../express-callback";
import { validate, getUrlsByUserSchema } from "../../validation";

export default function makeGetUrlsByUser({ listUrlsByUser }: { listUrlsByUser: any }) {
	return async function getUrlsByUser(httpRequest: HttpRequest) {
		let { page, size }: any = httpRequest?.query;
		page = parseInt(page);
		size = parseInt(size);

		const id = httpRequest.session.userId;
		await validate(getUrlsByUserSchema, { id, page, size });
		const response = await listUrlsByUser({ id, page, size });
		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			body: response,
		};
	};
}
