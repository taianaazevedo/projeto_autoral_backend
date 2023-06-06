import Joi from 'joi';

export const movieSchema = Joi.object({
   title: Joi.string().min(1).required(),
   streaming: Joi.string().min(1).required()
});