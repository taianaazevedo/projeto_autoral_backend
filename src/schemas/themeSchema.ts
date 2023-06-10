import Joi from "joi";

export const themeSchema = Joi.object({
  title: Joi.string().min(6).required(),
});
