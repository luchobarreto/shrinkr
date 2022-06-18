import { Storage } from "@google-cloud/storage";
import makeUser from "../../entities/user";
import { Conflict } from "../../errors";
import { User } from "../../validation";

export default function makeAddUser({ usersDb }: { usersDb: any }) {
	return async function addUser({ email, password, name, photo }: User) {
		const exists = await usersDb.findOne({ email });
		if (exists) {
			throw new Conflict("User already exists.");
		}

		const storage = new Storage({ keyFilename: "./key.json" });

		let photoUrl = "";

		const newUser = await makeUser({
			email,
			password,
			name,
			createdAt: new Date(),
			photoUrl,
		});
		const user = await usersDb.insertOne({
			email: newUser.getEmail(),
			name: newUser.getName(),
			password: newUser.getPassword(),
			photo_url: newUser.getPhotoUrl(),
		});
		return user;
	};
}
