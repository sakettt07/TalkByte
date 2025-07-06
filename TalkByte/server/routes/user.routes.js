import express from "express";

import {registerUser,login,logout,getMyProfile,updateProfile} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout);
router.route("/me").get(isAuthenticated,getMyProfile);
router.route("/update-profile").put(isAuthenticated,updateProfile);

export default router;
