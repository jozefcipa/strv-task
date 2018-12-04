'use strict'

const Joi = require('joi')
const { validate } = require('../../src/validations')
const errors = require('../../src/utils/errors')

test('validate input object according to provided schema', () => {
  const validObject = {
    name: 'Jozef',
    email: 'hello@jozefcipa.com',
    password: '1234asdf',
    passwordAgain: '1234asdf',
  }
  const invalidObject = {
    name: 'a',
    email: 'jozefcipa.com',
    password: 'dfad',
    passwordAgain: '',
  }
  const schema = {
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20)
      .required(),
    passwordAgain: Joi.string().min(8).max(20)
      .valid(Joi.ref('password'))
      .required(),
  }

  expect(validate(validObject, schema)).toEqual({
    valid: true,
  })
  expect(() => validate(invalidObject, schema)).toThrow(errors.BadRequestError)
})
