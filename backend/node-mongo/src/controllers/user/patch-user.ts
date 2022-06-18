import { HttpRequest } from "../../express-callback";
import { editUserSchema, validate } from "../../validation";

export default function makePatchUser({ editUser }: { editUser: any }) {
	return async function patchUser(httpRequest: HttpRequest) {
		const id = httpRequest.session.userId;
		const photo = httpRequest.file;
		const changes: any = { ...httpRequest.body };
		if (photo) changes.photo = photo;
		await validate(editUserSchema, changes);
		const res = await editUser({ id, changes });
		return {
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			body: {
				message: "User edited successfully",
				...res,
			},
		};
	};
}
