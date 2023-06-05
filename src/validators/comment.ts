import joi from 'joi';

export const createCommentSchema = joi.object({
  comment: joi.string().required(),
  owner: joi.string().required(),
  eventId: joi.string().required(),
})