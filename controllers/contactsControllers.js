<<<<<<< HEAD
import Contact from "../models/contact.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (contact) {
      res.status(200).json(contact);
=======
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedContact = await removeContact(id);
    if (deletedContact) {
      res.status(200).json(deletedContact);
>>>>>>> ab71173a2041efc1d06d4bc3e803d91cfb196407
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (deletedContact) {
      res.status(200).json({ deletedContact, message: "Delete Success" });
    } else {
      throw HttpError(404, "Not found");
    }
=======
    validateBody(createContactSchema)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, email, phone } = req.body;
      const newContact = await addContact(name, email, phone);
      res.status(201).json(newContact);
    });
>>>>>>> ab71173a2041efc1d06d4bc3e803d91cfb196407
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
<<<<<<< HEAD
  try {
    const { id } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedContact) {
      return res
        .status(200)
        .json({ updatedContact, message: "Updated Success" });
=======
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const unknownFields = Object.keys(req.body).filter(
      (key) => !Object.keys(updateContactSchema.describe().keys).includes(key)
    );
    if (unknownFields.length > 0) {
      return res
        .status(400)
        .json({ message: `Unknown field(s): ${unknownFields.join(", ")}` });
    }

    const { error } = updateContactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedContact = await updateContactById(id, { name, email, phone });
    if (updatedContact) {
      return res.status(200).json(updatedContact);
>>>>>>> ab71173a2041efc1d06d4bc3e803d91cfb196407
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};
<<<<<<< HEAD

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ result, message: "Status contact updated Success" });
  } catch (error) {
    next(error);
  }
};
=======
>>>>>>> ab71173a2041efc1d06d4bc3e803d91cfb196407
