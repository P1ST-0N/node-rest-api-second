import Contact from "../models/contact.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  try {
    const contact = await Contact.findOne({ _id: id, owner });

    if (contact) {
      res.status(200).json(contact);
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const deletedContact = await Contact.findOneAndDelete({ _id: id, owner });
    if (deletedContact) {
      res.status(200).json({ deletedContact, message: "Delete Success" });
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,

      { new: true }
    );
    if (updatedContact) {
      return res
        .status(200)
        .json({ updatedContact, message: "Updated Success" });
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const result = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,

      { new: true }
    );

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ result, message: "Status contact updated Success" });
  } catch (error) {
    next(error);
  }
};
