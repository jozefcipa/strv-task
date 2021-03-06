/* eslint-disable dot-notation,no-undefined */
'use strict'

const { authenticateByToken } = require('../utils/security')

const authenticated = async (ctx, next) => {
  const authHeader = ctx.headers['authorization']

  // append user to context
  ctx.app.context.user = await authenticateByToken(authHeader)
  return next()
}

/**
 * Omits sensitive data from API response
 * FIXME: not the best solution :/
 * @returns {Function}
 */
const omitSensitiveDataFromResponse = () => async (ctx, next) => {
  await next() // eslint-disable-line callback-return
  if (ctx.body) {
    // omit user data
    ctx.body.password = undefined
    ctx.body.__v = undefined // eslint-disable-line no-underscore-dangle
    if (ctx.body.user) {
      ctx.body.user.password = undefined
      ctx.body.user.__v = undefined // eslint-disable-line no-underscore-dangle
    }
  }
}

module.exports = {
  authenticated,
  omitSensitiveDataFromResponse,
}
