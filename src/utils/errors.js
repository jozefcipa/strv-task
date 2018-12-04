/* eslint-disable max-classes-per-file */
'use strict'

const { httpCodes } = require('./http')

/**
 * ApiError base class
 */
class ApiError extends Error {
  constructor(message, payload, httpCode) {
    super()
    this.message = message
    this.payload = payload
    this.httpCode = httpCode
  }
}

/**
 * HTTP 404 NotFound Error class
 */
class NotFoundError extends ApiError {
  constructor(payload = {}, message = 'Not Found') {
    super(message, payload, httpCodes.NOT_FOUND)
  }
}

/**
 * HTTP 400 BadRequest Error class
 */
class BadRequestError extends ApiError {
  constructor(payload = {}, message = 'Bad Request') {
    super(message, payload, httpCodes.BAD_REQUEST)
  }
}

/**
 * HTTP 401 UnauthorizedError Error class
 */
class UnauthorizedError extends ApiError {
  constructor(payload = {}, message = 'Unauthorized') {
    super(message, payload, httpCodes.UNAUTHORIZED)
  }
}

/**
 * HTTP 409 InternalError Error class
 */
class ConflictError extends ApiError {
  constructor(payload = {}, message = 'Conflict') {
    super(message, payload, httpCodes.CONFLICT)
  }
}

/**
 * HTTP 500 InternalError Error class
 */
class InternalError extends ApiError {
  constructor(payload = {}, message = 'Internal Server Error') {
    super(message, payload, httpCodes.INTERNAL_ERROR)
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
  UnauthorizedError,
  InternalError,
  ConflictError,
  notFoundHandler,
}
