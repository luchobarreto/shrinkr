import { NotFound, Unauthorized } from "../../errors";

export default function makeListUrl({ urlsDb, usersDb }: { urlsDb: any; usersDb: any }) {
	return async function listUrl({ id, userId }: { id: string; userId: string }) {
		const user = await usersDb.findById({ id: userId });

		if (!user) throw new NotFound("User not found");

		const url = await urlsDb.findById({ id });
		if (!url) throw new NotFound("Url not found");

		if (user._id.toString() !== url.owner_id.toString())
			throw new Unauthorized("You are not allowed to access this url");

		return url;
	};
}
