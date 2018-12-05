'use strict'

const { isEmpty } = require('ramda')
const logger = require('../utils/logger')
const errors = require('../utils/errors')
const config = require('../config')

const handleErrorsMiddleware = () =>
  async (ctx, next) => {
    try {
      return await next()
    } catch (err) {
      let responseError

      if (err instanceof errors.ApiError) {
        responseError = err
      } else {
        // wrap caught error into HTTP 500 error
        responseError = new errors.InternalError(err)
      }

      // set error status
      ctx.status = responseError.httpCode

      // prepare response error body
      const body = {
        error: err.message,
        code: responseError.httpCode,
      }
      if (!isEmpty(responseError.payload)) {
        body.payload = responseError.payload
      }
      // check if error stack should be provided
      if (['local', 'test', 'staging'].includes(config.env)) {
        body.stack = err.stack
      }

      // log error
      logger.error(JSON.stringify({
        ...responseError,
        stack: err.stack,
      }))

      // set body
      ctx.body = body
      return true
    }
  }


module.exports = handleErrorsMiddleware
