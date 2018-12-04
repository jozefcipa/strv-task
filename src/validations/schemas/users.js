/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
'use strict'

const Joi = require('joi')

const userSchema = {
  name: Joi.string().min(2).max(50)
    .required(),
  surname: Joi.string().min(2).max(50)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20)
    .required(),
  passwordAgain: Joi.string().min(8).max(20)
    .valid(Joi.ref('password'))
    .required(),
}

const loginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20)
    .required(),
}

module.exports = {
  userSchema,
  loginSchema,
}
