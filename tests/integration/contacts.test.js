'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const security = require('../../src/utils/security')
const { stubFirebase } = require('../mocks/firebase')

const contact = {
  name: 'John',
  surname: 'Brown',
  email: 'john@company.co.uk',
  phone: '+421950630637',
  birthday: '1987-12-05T17:10:54+0000',
  address: {
    street: 'Olive 39',
    city: 'Birmingham',
    country: 'England',
    zip: 'BH932',
  },
}

let accessToken

beforeAll(async () => {
  stubFirebase()

  // create token
  accessToken = await security.generateAccessToken({
    name: 'James',
    surname: 'Bright',
    email: 'jamie69@hotmail.com',
    _id: 'adfj9230fasdfk2',
  }).accessToken
})

// test creating a new contact
describe('POST /contacts', () => {
  test('Creates new contact', async () => {
    const res = await request(app)
      .post('/contacts')
      .set('Authorization', `jwt ${accessToken}`)
      .send(contact)
      .expect(201)

    expect(res.body).toEqual({
      created: 1,
    })
  })
})

