'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const security = require('../../src/utils/security')
const { stubFirebase } = require('../stubs/firebase')
const { mongo } = require('../../src/database')

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

afterAll(async () => {
  await mongo.disconnect()
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

describe('GraphQL contacts mutation', () => {
  test('createContact mutation', async () => {
    const query = {
      operationName: 'addNewContact',
      variables: {
        contact: {
          name: 'novy',
          surname: 'kontakt',
          email: 'novy.pouzivatel+2@gmail.com',
          note: 'poznamka',
          address: { street: 'Hlavna 9', city: 'Praha', zip: '03829', country: 'Czechia' },
        },
      },
      query: `
        mutation addNewContact($contact: ContactInput!) {
          createContact(input: $contact) {
            created
          }
        }`,
    }

    const result = {
      data: {
        createContact: {
          created: 1,
        },
      },
    }
    const res = await request(app)
      .post('/graphql')
      .set('Authorization', `jwt ${accessToken}`)
      .send(query)
      .expect(200)

    expect(res.body).toMatchObject(result)
  })
})
