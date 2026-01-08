import { Router } from "express";
import { registerUser, loginUser, loggedOut } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(loggedOut);

export default router;