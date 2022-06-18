import { NotFound } from "../../errors";

export default function makeListUrlByShortId({ urlsDb }: { urlsDb: any }) {
	return async function listUrlByShortId({ shortId }: { shortId: string }) {
		const url = await urlsDb.findOne({ short_id: shortId });

		if (!url) throw new NotFound("Url not found");

		return url;
	};
}
