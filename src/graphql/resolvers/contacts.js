'use strict'

const operations = require('../../operations/contacts')

module.exports = {
  Mutation: {
    createContact: (root, args) => operations.createContact(args.input),
  },
}
