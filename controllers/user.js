import User from "../models/user.js";
import path from "node:path";
import fs from "node:fs/promises";
import jimp from "jimp";
import HttpError from "../helpers/HttpError.js";
import { sendMail } from "../mail.js";

const avatarDir = path.resolve("public/avatars");

export const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const avatar = await jimp.read(req.file.path);
    await avatar.resize(250, 250);
    await avatar.writeAsync(path.resolve("public/avatars", req.file.filename));
    await fs.rm(req.file.path);

    const user = await User.findByIdAndUpdate(
      _id,
      {
        avatarURL: req.file.filename,
      },
      { new: true }
    );
    res.json({ avatarURL: path.resolve(avatarDir, user.avatarURL) });
  } catch (error) {
    next(error);
  }
};

export const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { verificationToken },
      {
        verify: true,
        verificationToken: null,
      },
      { new: true }
    );
    if (user === null) {
      throw HttpError(404);
    }

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

export const resendingVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(400, "Missing required field email");
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    await sendMail({
      to: email.toLowerCase(),
      from: "luckylionya@rambler.ru",
      subject: "Welcome to Phonebook",
      html: `To confirm your email please go to this <a href="http://localhost:3000/users/verify/${user.verificationToken}">link</a>`,
      text: `To confirm your email please open  http://localhost:3000/users/verify/${user.verificationToken}`,
    });

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

// export const updateAvatar = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       throw next(HttpError(400, "File not found"));
//     }

//     const { _id } = req.user;
//     const { path: tempUpload, originalname } = req.file;
//     const filename = `${_id}_${originalname}`;
//     const resultUpload = path.resolve(avatarDir, filename);

//     const image = await jimp.read(tempUpload);
//     await image.resize(250, 250).writeAsync(resultUpload);

//     await fs.unlink(tempUpload);
//     const avatarUrl = path.resolve("avatars", filename);

//     await User.findByIdAndUpdate(_id, { avatarUrl });

//     res.json({ avatarUrl });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateAvatar = async (req, res, next) => {
//   const { _id } = req.user;

//   try {
//     await fs.rename(
//       req.file.path,
//       path.resolve("public/avatar", req.file.filename)
//     );

//     const user = await User.findByIdAndUpdate(
//       _id,
//       { avatarUrl: req.file.filename },
//       { new: true }
//     );
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateAvatar = async (req, res, next) => {
//   console.log("Received file:", req.file);
//   console.log("User ID:", req.user._id);
//   const { _id } = req.user;
//   try {
//     if (!req.file) {
//       throw new Error("Файл не завантажено");
//     }

//     console.log(req.file);

//     const avatar = await jimp.read(req.file.path);
//     await avatar.resize(250, 250);
//     const newAvatarPath = path.join(avatarDir, req.file.filename);
//     await avatar.writeAsync(newAvatarPath);
//     await fs.rm(req.file.path);

//     const user = await User.findByIdAndUpdate(
//       _id,
//       {
//         avatarURL: req.file.filename,
//       },
//       { new: true }
//     );

//     if (!user) {
//       throw new Error("Користувача не знайдено");
//     }

//     res.json({ avatarURL: newAvatarPath });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
