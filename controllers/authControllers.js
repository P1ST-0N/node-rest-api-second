import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email is use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: { subscription: newUser.subscription, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};
