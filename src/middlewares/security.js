/* eslint-disable dot-notation */
'use strict'

const { UnathorizedError } = require('../utils/errors')
const { parseJwtTokenFromHeader, verifyAccessToken } = require('../utils/security')

const authenticated = async (ctx, next) => {
  const authHeader = ctx.headers['authorization']
  const token = parseJwtTokenFromHeader(authHeader)

  // check if token is provided
  if (!token) {
    throw new UnathorizedError({}, 'Missing authorization header')
  }

  // check token validity
  const user = await verifyAccessToken(token)

  // append user to context
  ctx.app.context.user = user
  return next()
}

module.exports = {
  authenticated,
}
