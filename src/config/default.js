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
    port: 3000 || process.env.PORT,
    bodyParser: {
      patchKoa: true,
      urlencoded: true,
      text: false,
      json: true,
      multipart: false,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'Date',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
  database: {},
  logger: {
    enabled: true,
    stdout: true,
    minLevel: 'debug',
  },
  auth: {},
})
