import { Request, Response } from "express";
import { isLoggedIn, logIn, logOut } from "../auth";
import { HttpResponse } from "../controllers";
import { ServerError } from "../errors";

export interface HttpRequest {
	body: Request["body"];
	query: Request["query"];
	params: Request["params"];
	file: Request["file"];
	files: any;
	session: any;
	ip: Request["ip"];
	method: Request["method"];
	path: Request["path"];
	headers: {};
}

function makeExpressCallback(controller: Function) {
	return (req: Request, res: Response) => {
		const httpRequest: HttpRequest = {
			body: req.body,
			query: req.query,
			params: req.params,
			ip: req.ip,
			file: req.file,
			files: req.files,
			method: req.method,
			session: req.session,
			path: req.path,
			headers: {
				"Content-Type": req.get("Content-Type"),
				Referer: req.get("referer"),
				"User-Agent": req.get("User-Agent"),
			},
		};

		controller(httpRequest)
			.then(async (httpResponse: HttpResponse) => {
				if (httpResponse.headers) {
					res.set(httpResponse.headers);
				}
				if (httpResponse.session?.userId) {
					logIn(req, httpResponse.session.userId);
				}
				if (httpResponse.session?.sid) {
					isLoggedIn(req, true);
				}
				if (httpResponse.logOut) {
					await logOut(req, res);
				}
				res.type("json");
				res.status(httpResponse.statusCode).send(httpResponse.body);
			})
			.catch((err: ServerError) => {
				if (!err.statusCode) {
					console.error(err);
				}
				const error: any = { error: err.message, ...err };
				delete error.statusCode;
				return res.status(err.statusCode).send(error);
			});
	};
}

export default makeExpressCallback;
