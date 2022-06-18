import { Url } from "../../validation";
import { urlsDb } from "../../data-access";

export default function buildMakeUrl({ idGenerator }: { idGenerator: any }) {
	return async function makeUrl({
		url,
		ownerId,
		views = 0,
		createdAt = new Date(),
		active = true,
	}: Url) {
		const shortId = await idGenerator({ urlsDb });

		return Object.freeze({
			getUrl: () => url,
			getOwnerId: () => ownerId,
			getViews: () => views,
			getCreatedAt: () => createdAt,
			getActive: () => active,
			getShortId: () => shortId,
		});
	};
}
