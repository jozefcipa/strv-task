'use strict'

const repository = require('../repositories/contacts')

const createContact = input => repository.save(input)

module.exports = {
  createContact,
}
