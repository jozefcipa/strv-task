'use strict'

const R = require('ramda')
const request = require('supertest-koa-agent')
const app = require('../../src/app')
const User = require('../../src/database/models/user')
const { mongo } = require('../../src/database')

beforeAll(async () => {
  // Clears the database
  await User.deleteMany({})
})

afterAll(async () => {
  await mongo.disconnect()
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

    expect(Object.keys(res.body)).not.toEqual(expect.arrayContaining([
      'password',
    ]))
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

describe('GraphQL users mutation', () => {
  test('registerUser mutation', async () => {
    const query = {
      operationName: 'addNewUser',
      variables: {
        register: {
          name: 'novy',
          surname: 'pouzivatel',
          email: 'novy.pouzivadtel+2@gmail.com',
          password: 'noveheslo',
          passwordAgain: 'noveheslo',
        },
      },
      query: `
        mutation addNewUser($register: RegisterInput!) {
          registerUser(input: $register) {
            _id
            name
            surname
            email
          }
        }`,
    }

    const result = {
      data: {
        registerUser: R.pick(['name', 'surname', 'email'], query.variables.register),
      },
    }

    const res = await request(app)
      .post('/graphql')
      .send(query)
      .expect(200)

    expect(res.body).toMatchObject(result)
  })
})
