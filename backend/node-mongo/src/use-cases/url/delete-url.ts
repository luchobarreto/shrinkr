import { NotFound, Unauthorized } from "../../errors";

export default function makeDeleteUrl({ urlsDb, usersDb }: { urlsDb: any; usersDb: any }) {
	return async function deleteUrl({ userId, id }: { userId: string; id: string }) {
		const user = await usersDb.findById({ id: userId });
		if (!user) throw new NotFound("User not found");

		const url = await urlsDb.findById({ id });
		if (!url) throw new NotFound("Url not found");

		if (user._id.toString() !== url.owner_id.toString())
			throw new Unauthorized("You are not allowed to delete this url");

		await urlsDb.deleteOne({ _id: url._id });

		return {
			deletedCount: 1,
			message: "Url deleted successfully",
		};
	};
}
