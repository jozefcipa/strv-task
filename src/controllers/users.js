'use strict'

const operations = require('../operations/users')
const { validate } = require('../validations')
const { userSchema } = require('../validations/schemas/users')
const { httpCodes } = require('../utils/http')

const createUser = async ctx => {
  const input = ctx.request.body
  validate(input, userSchema)
  ctx.statusCode = httpCodes.CREATED
  ctx.body = await operations.createUser(input)
}

const loginUser = async ctx => {
  ctx.statusCode = 400
  // TODO: implement
}

module.exports = {
  createUser,
  loginUser,
}
