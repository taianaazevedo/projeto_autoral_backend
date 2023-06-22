import Joi from "joi";

export const serieSchema = Joi.object({
  title: Joi.string().min(1).required(),
  streaming: Joi.string().min(1).required(),
  theme_id: Joi.number().required(),
});

export const updateSerieSchema = Joi.object({
  title: Joi.string().min(1).required(),
  streaming: Joi.string().min(1).required(),
  id: Joi.number().required(),
});