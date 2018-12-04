'use strict'

const security = require('../../src/utils/security')
const errors = require('../../src/utils/errors')

test('hash and compare password', async () => {
  const password = 'veryStr0ngPa$$w0rd.'
  const hashed = await security.hash(password)
  expect(security.verifyPassword(password, hashed)).toBeTruthy()
})

test('generate and verify access token', async () => {
  const user = {
    name: 'John',
    surname: 'Doe',
    age: 39,
  }
  const { accessToken } = await security.generateAccessToken(user)
  expect(await security.verifyAccessToken(accessToken)).toEqual(user)
})

test('parse access token from HTTP header', async () => {
  const httpHeader1 = 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjMDZlMmRhNGYwZmI3MjE4NTBjNGM3OSIsIm5hbWUiOiJKb3plZiIsInN1cm5hbWUiOiJDaXBhIiwiZW1haWwiOiJjaXBham96ZWYrMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR0ZXg0dW5jZ1dhV1VnMXJxZGkyN2cuWEJObWxzcGNHeGpvazd5ay5wSzNyTmdqeVZ0WjN2aSIsIl9fdiI6MH0sImlhdCI6MTU0Mzk1OTQ0MSwiZXhwIjoxNTQzOTYzMDQxLCJpc3MiOiJjb20uam96ZWZjaXBhLmFkZHJlc3Nib29rLWFwaS5sb2NhbCJ9.iHJNDyLtAtuMdeEhiKE6R8MVomTSlBpQL1598vaDoX4'
  const accessToken1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjMDZlMmRhNGYwZmI3MjE4NTBjNGM3OSIsIm5hbWUiOiJKb3plZiIsInN1cm5hbWUiOiJDaXBhIiwiZW1haWwiOiJjaXBham96ZWYrMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR0ZXg0dW5jZ1dhV1VnMXJxZGkyN2cuWEJObWxzcGNHeGpvazd5ay5wSzNyTmdqeVZ0WjN2aSIsIl9fdiI6MH0sImlhdCI6MTU0Mzk1OTQ0MSwiZXhwIjoxNTQzOTYzMDQxLCJpc3MiOiJjb20uam96ZWZjaXBhLmFkZHJlc3Nib29rLWFwaS5sb2NhbCJ9.iHJNDyLtAtuMdeEhiKE6R8MVomTSlBpQL1598vaDoX4'
  const token1 = security.parseJwtTokenFromHeader(httpHeader1)
  expect(token1).toBe(accessToken1)

  const httpHeader2 = ''
  const token2 = security.parseJwtTokenFromHeader(httpHeader2)
  expect(token2).toBeNull()
})

test('throw UnauthorizedError when invalid access token', async () => {
  const httpHeader = 'jwt wrong'
  const token = security.parseJwtTokenFromHeader(httpHeader)
  let threw = false
  try {
    await security.verifyAccessToken(token)
  } catch (err) {
    if (err instanceof errors.UnauthorizedError) {
      threw = true
    }
  }
  expect(threw).toBe(true)
})
