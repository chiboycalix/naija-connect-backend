import Joi from 'joi';

export const createRoleSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().min(1).required(),
});