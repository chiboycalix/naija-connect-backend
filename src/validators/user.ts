import Joi from 'joi';

export const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
});