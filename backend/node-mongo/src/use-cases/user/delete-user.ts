import { NotFound } from "../../errors";
import { BUCKET } from "../../config";
import { Storage } from "@google-cloud/storage";

export default function makeDeleteUser({ usersDb, urlsDb }: { usersDb: any; urlsDb: any }) {
	return async function deleteUser({ userId }: { userId: string }) {
		let deletedCount = 0;
		const user = await usersDb.findById({ id: userId });
		if (!user) throw new NotFound("User not found");

		if (user.photo_url !== "") {
			const storage = new Storage({ keyFilename: "./key.json" });
			const previousPhotoName =
				user.photo_url.split("/")[user.photo_url.split("/").length - 1];
			await storage
				.bucket(BUCKET)
				.file(previousPhotoName)
				.delete()
				.catch((err: any) => {});
			deletedCount++;
		}

		deletedCount += await urlsDb.deleteMany({ owner_id: user._id });

		await usersDb.deleteOne({ _id: user._id }).catch((err: any) => {});

		deletedCount++;
		return {
			deletedCount,
		};
	};
}
