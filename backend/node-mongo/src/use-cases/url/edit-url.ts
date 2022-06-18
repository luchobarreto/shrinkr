import { NotFound, Unauthorized } from "../../errors";

export default function makeEditUrl({ urlsDb, usersDb }: { urlsDb: any; usersDb: any }) {
	return async function editUrl({
		id,
		userId,
		changes,
	}: {
		id: string;
		userId: string;
		changes: object;
	}) {
		const user = await usersDb.findById({ id: userId });
		if (!user) throw new NotFound("User not found");

		const url = await urlsDb.findById({ id });
		if (!url) throw new NotFound("Url not found");

		if (user._id.toString() !== url.owner_id.toString())
			throw new Unauthorized("You are not allowed to edit this url");

		await urlsDb.updateOne({ _id: url._id }, changes);

		return {
			updatedCount: 1,
			message: "Url updated successfully",
		};
	};
}
