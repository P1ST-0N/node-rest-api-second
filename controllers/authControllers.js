import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";

dotenv.config();

const { DB_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email is use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });
    res.status(201).json({
      user: { subscription: newUser.subscription, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, DB_SECRET, { expiresIn: "22h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: { subscription: user.subscription, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({ message: "No content" });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch {
    next(error);
  }
};

export const subscriptionUpdate = async (req, res, next) => {
  try {
    const { subscription: newValueSub } = req.body;
    const { email, _id } = req.user;

    switch (newValueSub) {
      case "starter":
      case "business":
      case "pro":
        const updatedUser = await User.findOneAndUpdate(
          { _id },
          { subscription: newValueSub },
          { new: true }
        );
        res.json({
          email,
          subscription: updatedUser.subscription,
        });
        break;
      default:
        res.status(400).json({ message: "This subscription does not exist" });
    }
  } catch (error) {
    next(error);
  }
};
