const { Joi } = require('celebrate');
const { regexUrl } = require('./regex');

const signInValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};

const signUpValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl)
  })
};

const getUserValidation = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required()
  })
};

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required()
  })
};

const updateAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexUrl).required()
  })
};

const cardIdValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
  })
};

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexUrl)
  })
};

module.exports = {
  signInValidation,
  signUpValidation,
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
  cardIdValidation,
  createCardValidation
};
