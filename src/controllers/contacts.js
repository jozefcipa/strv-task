'use strict'

const operations = require('../operations/contacts')
const { validate } = require('../validations')
const { newContactSchema } = require('../validations/schemas/contacts')
const { httpCodes } = require('../utils/http')

/**
 * Creates new contact
 * @param {KoaContext} ctx Koa context
 * @returns {Promise<void>}
 */
const createContact = async ctx => {
  const input = ctx.request.body
  input.user_id = ctx.user._id
  validate(input, newContactSchema)
  ctx.status = httpCodes.CREATED
  ctx.body = await operations.createContact(input)
}

module.exports = {
  createContact,
}
