import Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  eventVenue: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string().required(),
    geoLocation: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required()
    }).required()
  }).required(),
  eventDate: Joi.date().required(),
  eventTime: Joi.string().required(),
  attendees: Joi.array().items(Joi.string()).required(),
  interested: Joi.array().items(Joi.string()).required(),
  notInterested: Joi.array().items(Joi.string()).required(),
  comments: Joi.array().items(Joi.string()),
  likes: Joi.number().required(),
  dislikes: Joi.number().required(),
  image: Joi.string(),
  video: Joi.string(),
  tags: Joi.array().items(Joi.string()).required(),
  category: Joi.string().required(),
  status: Joi.string().required(),
  isDeleted: Joi.boolean().required(),
  isFlagged: Joi.boolean().required(),
  isReported: Joi.boolean().required(),
  isBanned: Joi.boolean().required(),
  isVerified: Joi.boolean().required(),
  createdBy: Joi.string().required()
})