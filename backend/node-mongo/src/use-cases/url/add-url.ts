import { NotFound } from "../../errors";
import makeUrl from "../../entities/url";

export default function makeAddUrl({ urlsDb, usersDb }: { urlsDb: any; usersDb: any }) {
	return async function addUrl({ url, userId }: { url: string; userId: string }) {
		const user = await usersDb.findById({ id: userId });
		if (!user) throw new NotFound("User does not exist");

		const Url = await makeUrl({ url, ownerId: user._id });

		const newUrl = await urlsDb.insertOne({
			url: Url.getUrl(),
			owner_id: Url.getOwnerId(),
			short_id: Url.getShortId(),
			views: Url.getViews(),
			active: Url.getActive(),
			createdAt: Url.getCreatedAt(),
		});

		return newUrl;
	};
}
