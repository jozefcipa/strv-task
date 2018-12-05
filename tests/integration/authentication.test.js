'use strict'

const request = require('supertest-koa-agent')
const R = require('ramda')
const app = require('../../src/app')
const User = require('../../src/database/models/user')
const security = require('../../src/utils/security')
const { stubFirebase } = require('../stubs/firebase')
const { mongo } = require('../../src/database')

const userData = {
  name: 'John',
  surname: 'Brown',
  password: 'passw0rd',
  email: 'john@company.co.uk',
}

beforeAll(async () => {
  stubFirebase()
  // Clears the database
  await User.deleteMany({})
  // register new user
  const user = new User(userData)
  user.password = await security.hash(userData.password)
  await user.save()
})

afterAll(async () => {
  await mongo.disconnect()
})

// test authentication - login, access token
describe('POST /login', () => {
  test('Returns valid accessToken', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: userData.email,
        password: userData.password,
      })
      .expect(200)

    expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
      'user',
      'tokenInfo',
    ]))

    // validate accessToken
    const { accessToken } = res.body.tokenInfo
    const verifiedResult = await security.verifyAccessToken(accessToken)
    // validates if user's name, surname and email is in decoded token
    expect(R.pick(['name', 'surname', 'email'], verifiedResult))
      .toEqual(R.pick(['name', 'surname', 'email'], userData))
  })

  // verify authentication middleware with valid / invalid header
  test('Returns Unauthorized on wrong input', async () => {
    await request(app)
      .post('/login')
      .send({
        email: userData.email,
        password: 'wrong password',
      })
      .expect(401)
  })
})

