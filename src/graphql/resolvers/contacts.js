'use strict'

const operations = require('../../operations/contacts')

module.exports = {
  Mutation: {
    createContact: async (root, args, ctx) => {
      const user = await ctx.authenticate()
      args.userId = user._id
      return operations.createContact(args.input)
    },
  },
}
