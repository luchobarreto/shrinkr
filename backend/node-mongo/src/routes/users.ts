import { Router } from "express";
import { createUser, loginUser, patchUser, removeUser, getUserBySession } from "../controllers";
import makeExpressCallback from "../express-callback";
import { guest, auth } from "../middlewares";
import { multerUpload } from "../config";
import { logOut } from "../auth";

const router = Router();

router.post("/login", guest, makeExpressCallback(loginUser));
router.post("/logout", auth, async (req, res) => {
	await logOut(req, res);
	res.status(204).send();
});

router.get("/", auth, makeExpressCallback(getUserBySession));
router.post("/", guest, multerUpload.single("photo"), makeExpressCallback(createUser));
router.patch("/", multerUpload.single("photo"), auth, makeExpressCallback(patchUser));
router.delete("/", auth, makeExpressCallback(removeUser));

export default router;
