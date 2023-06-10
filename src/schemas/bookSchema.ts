import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
  theme_id: Joi.number().required(),
});
