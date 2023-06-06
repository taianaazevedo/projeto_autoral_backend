import Joi from 'joi';

export const songSchema = Joi.object({
   title: Joi.string().min(1).required(),
   performer: Joi.string().min(1).required()
});