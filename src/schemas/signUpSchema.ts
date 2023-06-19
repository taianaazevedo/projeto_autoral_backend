import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).required(),
  imgUrl: Joi.string().uri().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
