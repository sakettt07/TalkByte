import express from "express";

import {registerUser,login,logout} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout);

export default router;
