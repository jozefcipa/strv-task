'use strict'

const errors = require('../../src/utils/errors')

test('not found handler should return 404 error', () => {
  expect(errors.notFoundHandler()).toThrow(errors.NotFoundError)
})
