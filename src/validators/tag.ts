import Joi from 'joi';

export const createTagSchema = Joi.object({
  name: Joi.string().required(),
})