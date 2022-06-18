import { Request, Response, NextFunction } from "express";
import { isLoggedIn, logOut } from "../auth";
import { BadRequest, Unauthorized } from "../errors";
import { SESSION_ABSOLUTE_TIMEOUT } from "../config";

export const guest = (req: Request, res: Response, next: NextFunction) => {
	if (isLoggedIn(req)) {
		return next(new BadRequest("Guest already logged in", true));
	}

	next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
	if (!isLoggedIn(req)) {
		return next(new Unauthorized("You must be logged in.", false));
	}

	next();
};

export const active = async (req: any, res: Response, next: NextFunction) => {
	if (isLoggedIn(req)) {
		const { createdAt } = req.session;
		if (Date.now() > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
			await logOut(req, res);
			return next(new Unauthorized("Session expired"));
		}
	}

	next();
};
