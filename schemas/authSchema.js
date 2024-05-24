import Joi from "joi";

export const authSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().trim().lowercase().required(),
});
