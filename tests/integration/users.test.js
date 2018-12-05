'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const User = require('../../src/database/models/user')

beforeAll(async () => {
  // Clears the database
  await User.deleteMany({})
})

describe('POST /users', () => {
  const userData = {
    name: 'Brian',
    surname: 'Leaf',
    email: 'brian.leaf@company.co.uk',
    password: 'briansPassw0rd',
    passwordAgain: 'briansPassw0rd',
  }

  test('Creates new user', async () => {
    const res = await request(app)
      .post('/users')
      .send(userData)
      .expect(201)

    expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
      'name',
      'surname',
      'email',
      '_id',
    ]))

    // TODO: uncomment
    // expect(Object.keys(res.body)).not.toEqual(expect.arrayContaining([
    //   'password',
    // ]))
  })

  test('Returns 400 when invalid data provided', async () => {
    const res = await request(app)
      .post('/users')
      .send({})
      .expect(400)

    expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
      'error',
      'code',
      'payload',
    ]))
  })

  test('Returns 409 when duplicate email is provided', async () => {
    const res = await request(app)
      .post('/users')
      .send(userData)
      .expect(409)

    expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
      'error',
      'code',
    ]))
  })
})
