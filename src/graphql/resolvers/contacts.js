'use strict'

const operations = require('../../operations/contacts')
const { newContactSchema } = require('../../validations/schemas/contacts')
const { validate } = require('../../validations')

module.exports = {
  Mutation: {
    createContact: async (root, args, ctx) => {
      const user = await ctx.authenticate()
      args.input.userId = user._id
      validate(args.input, newContactSchema)
      return operations.createContact(args.input)
    },
  },
}
