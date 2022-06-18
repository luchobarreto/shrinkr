if (process.env.NODE_ENV !== "production") require("dotenv").config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
import methodOverride from "method-override";
import { redisClient } from "./data-access";
const RedisStore = require("connect-redis")(session);

import usersRouter from "./routes/users";
import urlsRouter from "./routes/urls";

import { IN_PROD, PORT, SESSION_OPTIONS, UI_URL, multerUpload } from "./config";
import { active, notFound, serverError } from "./middlewares";

const path = require("path");

const corsOptions: cors.CorsOptions = {
	allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
	methods: "POST, PUT, OPTIONS, DELETE, GET, PATCH",
	origin: UI_URL,
	credentials: true,
};

const app = express();

app.use(cors({ origin: UI_URL, credentials: true, exposedHeaders: "*" }));

app.options(
	"*",
	(req, res, next) => {
		next();
	},
	cors(corsOptions)
);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET, PATCH");
	res.header("Access-Control-Allow-Origin", UI_URL);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");

	if ("OPTIONS" == req.method) {
		res.send(200);
	} else {
		next();
	}
});

app.use("/api/static", express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(methodOverride());
app.use(cookieParser());

app.set("trust proxy", 1);

if (!IN_PROD) {
	app.use(morgan("dev"));
}

app.use(
	session({
		...SESSION_OPTIONS,
		store: new RedisStore({ client: redisClient }),
	})
);

app.use(active);

app.use("/api/users", usersRouter);
app.use("/api/urls", urlsRouter);

app.use(serverError);
app.use(notFound);

app.listen(PORT, () => {
	console.log(`Url Shortener listening into port: ${PORT}`);
});
