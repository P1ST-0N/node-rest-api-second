import User from "../models/user.js";
import path from "node:path";
import fs from "node:fs/promises";
import jimp from "jimp";
import HttpError from "../helpers/HttpError.js";

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw next(HttpError(400, "File not found"));
    }

    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.resolve("public/avatar", filename);

    const image = await jimp.read(tempUpload);
    await image.resize(250, 250).writeAsync(resultUpload);

    await fs.unlink(tempUpload);
    const avatarUrl = path.resolve("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    next(error);
  }
};

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
