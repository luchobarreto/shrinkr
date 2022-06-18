import { MongoClient } from "mongodb";
import { DB_URI, DB_OPTIONS, DB } from "../config";

import makeUrlsDb from "./url-db";
import makeUsersDb from "./users-db";

import makeRedisClient from "./redis";

const client = new MongoClient(DB_URI, DB_OPTIONS);

export async function makeDb() {
	await client.connect();

	return client.db(DB);
}

export const urlsDb = makeUrlsDb({ makeDb });
export const usersDb = makeUsersDb({ makeDb });
export const redisClient = makeRedisClient();
