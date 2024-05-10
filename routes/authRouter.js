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

import authenticate from "../helpers/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch("/", authenticate, subscriptionUpdate);

export default authRouter;
