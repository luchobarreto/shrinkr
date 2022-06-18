import { Router } from "express";
import {
	getUrl,
	getUrlsByUser,
	getUrlByShortId,
	createUrl,
	patchUrl,
	removeUrl,
} from "../controllers";
import makeExpressCallback from "../express-callback";
import { auth } from "../middlewares";

const router = Router();

router.get("/", auth, makeExpressCallback(getUrlsByUser));
router.get("/:id", makeExpressCallback(getUrl));
router.get("/s/:shortId", makeExpressCallback(getUrlByShortId));
router.post("/", auth, makeExpressCallback(createUrl));
router.patch("/:id", auth, makeExpressCallback(patchUrl));
router.delete("/:id", auth, makeExpressCallback(removeUrl));

export default router;
