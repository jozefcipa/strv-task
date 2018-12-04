/* eslint-disable camelcase */
'use strict'

const pkg = require('../../package')

module.exports = env => ({
  env,
  // application meta data
  app: {
    name: pkg.name,
    version: pkg.version,
  },
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    url: process.env.DB_URL,
    options: {
      autoIndex: false,
      useNewUrlParser: true,
    },
  },
  logger: {
    enabled: true,
    stdout: true,
    minLevel: 'debug',
  },
  security: {
    secret: process.env.AUTH_SECRET,
    saltRounds: 10,
    createOptions: {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `com.jozefcipa.addressbook-api.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.jozefcipa.addressbook-api.${env}`,
    },
  },
  firebase: {
    databaseUrl: process.env.FIREBASE_DB_URL,
    serviceAccount: {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    },
  },
})
