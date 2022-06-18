import { SessionOptions } from "express-session";
import { IN_PROD } from "./app";

const ONE_HOUR = 1000 * 60 * 60;
const SIX_HOURS = ONE_HOUR * 6;
const TWELVE_HOURS = SIX_HOURS * 2;
const ONE_DAY = TWELVE_HOURS * 2;
const ONE_WEEK = ONE_DAY * 7;

const { env } = process;

export const {
	SESSION_SECRET = "secret",
	SESSION_NAME = "sid",
	SESSION_IDLE_TIMEOUT = ONE_HOUR * 3,
} = env;

export const SESSION_ABSOLUTE_TIMEOUT = +(env.SESSION_ABSOLUTE_TIMEOUT || ONE_WEEK);

export const SESSION_OPTIONS: SessionOptions = {
	secret: SESSION_SECRET,
	name: SESSION_NAME,
	cookie: {
		maxAge: +SESSION_IDLE_TIMEOUT,
		secure: IN_PROD,
		sameSite: IN_PROD ? "none" : false,
	},
	proxy: true,
	rolling: true,
	resave: false,
	saveUninitialized: false,
};
