import Joi from "joi";

export const songSchema = Joi.object({
  title: Joi.string().min(1).required(),
  performer: Joi.string().min(1).required(),
  theme_id: Joi.number().required(),
});

export const updateSongSchema = Joi.object({
  title: Joi.string().min(1).required(),
  performer: Joi.string().min(1).required(),
  id: Joi.number().required(),
});