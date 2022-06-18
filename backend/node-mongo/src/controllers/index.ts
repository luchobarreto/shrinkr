import {
	addUser,
	editUser,
	listUser,
	deleteUser,
	signInUser,
	listUrl,
	listUrlsByUser,
	listUrlByShortId,
	addUrl,
	editUrl,
	deleteUrl,
} from "../use-cases";

import makeCreateUser from "./user/create-user";
import makeLoginUser from "./user/login-user";
import makePatchUser from "./user/patch-user";
import makeGetUserBySession from "./user/get-user-by-session";
import makeRemoveUser from "./user/remove-user";

import makeGetUrl from "./url/get-url";
import makeGetUrlsByUser from "./url/get-urls-by-user";
import makeGetUrlByShortId from "./url/get-url-by-short-id";
import makeCreateUrl from "./url/create-url";
import makePatchUrl from "./url/patch-url";
import makeRemoveUrl from "./url/remove-url";

const createUser = makeCreateUser({ addUser });
const patchUser = makePatchUser({ editUser });
const getUserBySession = makeGetUserBySession({ listUser });
const removeUser = makeRemoveUser({ deleteUser });
const loginUser = makeLoginUser({ signInUser });

const getUrl = makeGetUrl({ listUrl });
const getUrlsByUser = makeGetUrlsByUser({ listUrlsByUser });
const getUrlByShortId = makeGetUrlByShortId({ listUrlByShortId });
const createUrl = makeCreateUrl({ addUrl });
const patchUrl = makePatchUrl({ editUrl });
const removeUrl = makeRemoveUrl({ deleteUrl });

const usersController = Object.freeze({
	createUser,
	loginUser,
	patchUser,
	getUserBySession,
	removeUser,

	getUrl,
	getUrlsByUser,
	getUrlByShortId,
	createUrl,
	patchUrl,
	removeUrl,
});

export default usersController;

export {
	createUser,
	loginUser,
	patchUser,
	getUserBySession,
	removeUser,
	getUrl,
	getUrlsByUser,
	getUrlByShortId,
	createUrl,
	patchUrl,
	removeUrl,
};

export interface HttpResponse {
	headers: any;
	statusCode: number;
	body?: any;
	session?: any;
	cookies?: any;
	logOut?: boolean;
}
