/* eslint-disable max-classes-per-file */
'use strict'

const { httpCodes } = require('./http')

/**
 * ApiError base class
 */
class ApiError extends Error {
  constructor(name, payload, httpCode) {
    super()
    this.name = name
    this.payload = payload
    this.httpCode = httpCode
  }
}

/**
 * HTTP 404 NotFound Error class
 */
class NotFoundError extends ApiError {
  constructor(payload = {}, name = 'Not Found') {
    super(name, payload, httpCodes.NOT_FOUND)
  }
}

/**
 * HTTP 400 BadRequest Error class
 */
class BadRequestError extends ApiError {
  constructor(payload = {}, name = 'Bad Request') {
    super(name, payload, httpCodes.BAD_REQUEST)
  }
}

/**
 * HTTP 401 UnathorizedError Error class
 */
class UnathorizedError extends ApiError {
  constructor(payload = {}, name = 'Unauthorized') {
    super(name, payload, httpCodes.UNAUTHORIZED)
  }
}

/**
 * HTTP 500 InternalError Error class
 */
class InternalError extends ApiError {
  constructor(payload = {}, name = 'Internal Server Error') {
    super(name, payload, httpCodes.INTERNAL_ERROR)
  }
}

/**
 * Returns function which throws HTTP 404 Error
 * @returns {Function}
 */
const notFoundHandler = () => () => {
  throw new NotFoundError()
}

module.exports = {
  ApiError,
  NotFoundError,
  BadRequestError,
  UnathorizedError,
  InternalError,
  notFoundHandler,
}
