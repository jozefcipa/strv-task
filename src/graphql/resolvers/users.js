'use strict'

const operations = require('../../operations/users')
const { userSchema, loginSchema } = require('../../validations/schemas/users')
const { validate } = require('../../validations')

module.exports = {
  Mutation: {
    login: (root, args) => {
      validate(args.input, loginSchema)
      return operations.authenticateUser(args.input)
    },
    registerUser: (root, args) => {
      validate(args.input, userSchema)
      return operations.createUser(args.input)
    },
  },
}

