import { User } from "../../validation";

export default function buildMakeUser({ hashPassword }: { hashPassword: any }) {
	return async function makeUser({
		name,
		email,
		createdAt = new Date(),
		photoUrl,
		password,
	}: User) {
		const hashedPassword = await hashPassword(password).catch((err: any) => {});
		return Object.freeze({
			getName: () => name,
			getEmail: () => email,
			getPassword: () => hashedPassword,
			getCreatedAt: () => createdAt,
			getPhotoUrl: () => photoUrl,
		});
	};
}
