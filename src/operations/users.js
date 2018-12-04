'use strict'

const repository = require('../repositories/users')
const User = require('../database/models/user')
const { ConflictError } = require('../utils/errors')

const createUser = async input => {
  const user = await User.findOne().byEmail(input.email)
  if (user) {
    throw new ConflictError({}, `Email address ${input.email} is already used`)
  }
  return repository.save(input)
}

module.exports = {
  createUser,
}
