import { IN_PROD } from "./app";
import { MongoClientOptions } from "mongodb";

const env = process.env;

export const { DB_URI = "mongodb://localhost:27017" } = env;

export const { DB = "url-shortener" } = env;
export const DB_OPTIONS: MongoClientOptions = {};
