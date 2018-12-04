'use strict'

const User = require('../database/models/user')
const { hash } = require('../utils/security')

/**
 * Save user to database
 * @param {*} input Input data
 * @returns {*}
 */
const save = async input => {
  const user = new User(input)
  user.password = await hash(input.password)
  return user.save()
}

module.exports = {
  save,
}
