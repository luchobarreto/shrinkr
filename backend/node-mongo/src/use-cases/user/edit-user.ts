import { Storage } from "@google-cloud/storage";
import { InternalError, NotFound, Conflict } from "../../errors";
import Jimp from "jimp";
import makeUser from "../../entities/user";
import imagemin from "imagemin";
import { v4 as uuidv4 } from "uuid";
import { BUCKET } from "../../config";
import imageminPngquant from "imagemin-pngquant";

export default function makeEditUser({ usersDb }: { usersDb: any }) {
	return async function editUser({ id, changes }: { id: string; changes: any }) {
		const user = await usersDb.findById({ id });
		if (!user) {
			throw new NotFound("User not found");
		}

		if (changes.email) {
			const userWithSameEmail = await usersDb.findOne({ email: changes.email });
			if (userWithSameEmail) throw new Conflict("User with same email already exists");
		}

		if (changes.photo) {
			try {
				const storage = new Storage({ keyFilename: "./key.json" });

				const resizedImage = await (await Jimp.read(changes.photo.buffer)).cover(400, 400);
				const compressedImage = await imagemin.buffer(
					await resizedImage.getBufferAsync(Jimp.MIME_PNG),
					{
						plugins: [
							imageminPngquant({
								quality: [0.7, 0.8],
							}),
						],
					}
				);

				const imageName = `${uuidv4()}-${user._id.toString()}.png`;
				const previousPhotoName =
					user.photo_url.split("/")[user.photo_url.split("/").length - 1];

				await storage
					.bucket(BUCKET)
					.file(imageName)
					.save(compressedImage)
					.catch((err) => {
						console.error(err);
						throw new InternalError("Something went wrong");
					});
				if (user.photo_url !== "") {
					await storage.bucket(BUCKET).file(previousPhotoName).delete();
				}
				const savedPhoto = storage.bucket(BUCKET).file(imageName);
				await savedPhoto.makePublic();
				changes.photoUrl = await savedPhoto.publicUrl();
			} catch (err) {
				console.log(err);
				throw new InternalError("Something went wrong");
			}
		}

		delete user.password;

		const newUser = await makeUser({
			...user,
			...changes,
		});

		const updatedUser: any = {
			email: newUser.getEmail(),
			name: newUser.getName(),
			photo_url: newUser.getPhotoUrl(),
		};

		if (changes.password) updatedUser.password = newUser.getPassword();

		await usersDb.updateOne({ _id: user._id }, updatedUser);
		return {
			updatedCount: 1,
		};
	};
}
