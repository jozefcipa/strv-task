'use strict'

const operations = require('../operations/users')
const { validate } = require('../validations')
const { userSchema, loginSchema } = require('../validations/schemas/users')
const { httpCodes } = require('../utils/http')

const createUser = async ctx => {
  const input = ctx.request.body
  validate(input, userSchema)
  ctx.status = httpCodes.CREATED
  ctx.body = await operations.createUser(input)
}

const loginUser = async ctx => {
  const input = ctx.request.body
  validate(input, loginSchema)
  ctx.body = await operations.authenticateUser(input)
}

module.exports = {
  createUser,
  loginUser,
}
