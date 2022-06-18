import { hash, genSalt } from "bcrypt";
import buildMakeUser from "./User";

export async function hashPassword(password: string): Promise<string> {
    const salt = await genSalt(6);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}

const makeUser = buildMakeUser({ hashPassword });

export default makeUser;