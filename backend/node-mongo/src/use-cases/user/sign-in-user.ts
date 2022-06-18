import { compare } from "bcrypt";
import { User } from "../../validation";
import { Unauthorized } from "../../errors";

interface props {
	usersDb: any;
}

export default function makeSignInUser({ usersDb }: props) {
	return async function signInUser({ email, password }: User) {
		const user = await usersDb.findOne({ email });

		if (!user || !(await compare(password, user.password))) {
			throw new Unauthorized("Your email or password is incorrect");
		}

		return user._id;
	};
}
