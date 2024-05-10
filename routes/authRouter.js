import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authSchema } from "../schemas/authSchema.js";
import { register } from "../controllers/authControllers.js";

// import auth

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
// authRouter.post("/login", validateBody(authSchema), login);
// authRouter.get("/current",auth, getCurrent);
// authRouter.post("/logout", auth, logout);

export default authRouter;
