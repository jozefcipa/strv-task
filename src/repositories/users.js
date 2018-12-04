'use strict'

const User = require('../database/models/user')

/**
 * Save user to database
 * @param {*} input Input data
 * @returns {*}
 */
const save = input => {
  const user = new User(input)
  return user.save()
}

module.exports = {
  save,
}
