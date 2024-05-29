import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authSchema } from "../schemas/authSchema.js";
import {
  register,
  login,
  getCurrent,
  logout,
  subscriptionUpdate,
} from "../controllers/authControllers.js";
import { updateAvatar, verify } from "../controllers/user.js";

import authenticate from "../helpers/authenticate.js";
import upload from "../helpers/upload.js";
import { emailSchema } from "../schemas/emailSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch("/", authenticate, subscriptionUpdate);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);
//need add verify middleware
authRouter.get("/verify/:verificationToken", verify);
authRouter.post("verify", validateBody(emailSchema)); //resendingVerifyEmail

export default authRouter;
