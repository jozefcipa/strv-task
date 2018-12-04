/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
'use strict'

const Joi = require('joi')

// https://www.regextester.com/97440
const phoneRegex = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/u

const newContactSchema = {
  name: Joi.string().min(2).max(50)
    .required(),
  surname: Joi.string().min(2).max(50)
    .required(),
  birthday: Joi.string().isoDate(),
  address: Joi.object()
    .keys({
      street: Joi.string().min(3).max(50)
        .required(),
      city: Joi.string().min(3).max(50)
        .required(),
      country: Joi.string().min(3).max(50)
        .required(),
      zip: Joi.string().min(5).max(10)
        .required(),
    })
    .required(),
  phone: Joi.string().regex(phoneRegex),
  email: Joi.string().email().required(),
  note: Joi.string().max(500).allow(''),
  user_id: Joi.string().required(),
}

module.exports = {
  newContactSchema,
  phoneRegex,
}
