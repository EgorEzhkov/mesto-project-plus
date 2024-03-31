import { celebrate, Joi } from 'celebrate';

const regUrl = /((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}/i;

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(2).max(30),
    password: Joi.string().required().min(2),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(2).max(30),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(regUrl),
  }),
});

export default {
  regUrl,
  signInValidation,
  signUpValidation,
};
