import { usersDb, urlsDb } from "../data-access";

import makeListUser from "./user/list-user";
import makeAddUser from "./user/add-user";
import makeSignInUser from "./user/sign-in-user";
import makeDeleteUser from "./user/delete-user";
import makeEditUser from "./user/edit-user";

import makeListUrl from "./url/list-url";
import makeListUrlsByUser from "./url/list-urls-by-user";
import makeListUrlByShortId from "./url/list-url-by-short-id";
import makeAddUrl from "./url/add-url";
import makeDeleteUrl from "./url/delete-url";
import makeEditUrl from "./url/edit-url";

const listUser = makeListUser({ usersDb });
const addUser = makeAddUser({ usersDb });
const signInUser = makeSignInUser({ usersDb });
const deleteUser = makeDeleteUser({ usersDb, urlsDb });
const editUser = makeEditUser({ usersDb });

const listUrl = makeListUrl({ urlsDb, usersDb });
const listUrlsByUser = makeListUrlsByUser({ usersDb, urlsDb });
const listUrlByShortId = makeListUrlByShortId({ urlsDb });
const addUrl = makeAddUrl({ usersDb, urlsDb });
const editUrl = makeEditUrl({ usersDb, urlsDb });
const deleteUrl = makeDeleteUrl({ usersDb, urlsDb });

const usersService = Object.freeze({
	listUser,
	addUser,
	signInUser,
	deleteUser,
	editUser,
	listUrl,
	listUrlsByUser,
	listUrlByShortId,
	addUrl,
	editUrl,
	deleteUrl,
});

export default usersService;
export {
	listUser,
	addUser,
	signInUser,
	deleteUser,
	editUser,
	addUrl,
	listUrlsByUser,
	listUrlByShortId,
	editUrl,
	listUrl,
	deleteUrl,
};
