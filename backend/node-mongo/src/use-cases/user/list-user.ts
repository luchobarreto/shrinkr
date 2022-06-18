import { NotFound } from "../../errors";

export default function makeListUsers({ usersDb }: { usersDb: any }) {
	return async function listUsers({ id }: { id: string }) {
		let user = await usersDb.findById({ id });
		if (!user) {
			throw new NotFound("User not found");
		}
		delete user.createdAt;
		delete user.updatedAt;
		delete user.password;

		return user;
	};
}
