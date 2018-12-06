'use strict'

const operations = require('../../operations/users')

module.exports = {
  Mutation: {
    login: (root, args) => operations.authenticateUser(args.input),
    registerUser: (root, args) => operations.createUser(args.input),
  },
}

