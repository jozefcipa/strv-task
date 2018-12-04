/* eslint-disable callback-return */
'use strict'

const logger = require('../utils/logger')

/**
 * Response time Koa middleware
 * @returns {Function}
 */
const responseTimeMiddleware = () =>
  async (ctx, next) => {
    const start = Date.now()
    await next()
    const responseTime = `${Date.now() - start}ms`
    ctx.set('X-Response-Time', responseTime)
    logger.debug(`Response time: ${responseTime}`)
  }


module.exports = responseTimeMiddleware
