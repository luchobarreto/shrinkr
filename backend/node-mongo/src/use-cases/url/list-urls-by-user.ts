import { InternalError, NotFound } from "../../errors";

export default function makeListUrlsByUser({ urlsDb, usersDb }: { urlsDb: any; usersDb: any }) {
	return async function listUrlsByUser({
		id,
		page = 0,
		size,
	}: {
		id: string;
		page: any;
		size: any;
	}) {
		const user = await usersDb.findById({ id });
		if (!user) throw new NotFound("User not found");

		page = parseInt(page);
		const skip = page === 0 ? 0 : size * page;

		try {
			const count = await urlsDb.countQuery({ owner_id: user._id });
			const urls = await urlsDb.findLimited({ owner_id: user._id }, size, skip);
			return {
				data: urls,
				count,
			};
		} catch (error) {
			throw new InternalError("Something went wrong");
		}
	};
}
