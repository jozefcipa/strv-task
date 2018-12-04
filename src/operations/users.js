'use strict'

const repository = require('../repositories/users')
const User = require('../database/models/user')
const { NotFoundError, ConflictError, UnauthorizedError } = require('../utils/errors')
const security = require('../utils/security')

const createUser = async input => {
  const user = await User.findOne().byEmail(input.email)
  if (user) {
    throw new ConflictError({}, `Email address ${input.email} is already used`)
  }
  return repository.save(input)
}

/**
 * Verifies user's email and password and generates accessToken
 * @param {*} input Input object with email and password
 * @returns {Promise<{user, accessToken}>}
 */
const authenticateUser = async input => {
  const user = await User.findOne().byEmail(input.email)
  // check if user exists
  if (!user) {
    throw new NotFoundError({ email: input.email }, 'User with given email address doesn\'t exist')
  }
  // check password
  const verifiedPassword = await security.verifyPassword(input.password, user.password)
  if (!verifiedPassword) {
    throw new UnauthorizedError({}, 'Incorrect password')
  }
  // generate access token
  const tokenInfo = await security.generateAccessToken(user)

  return {
    user,
    tokenInfo,
  }
}

module.exports = {
  createUser,
  authenticateUser,
}
