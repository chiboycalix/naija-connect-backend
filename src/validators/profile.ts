import Joi from 'joi';

export const createProfileSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  bio: Joi.string().required(),
  profilePicture: Joi.string().required(),
  interests: Joi.array().items(Joi.string()).required(),
  username: Joi.string().required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string().required(),
    geoLocation: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required()
    })
  }).required()
});