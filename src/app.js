'use strict'

const Koa = require('koa')
const koaCors = require('kcors')
const koaBody = require('koa-body')
const config = require('./config')
const logger = require('./utils/logger')
const routes = require('./routes')
const koaTime = require('./middlewares/time')
const koaErrors = require('./middlewares/errors')
const { notFoundHandler } = require('./utils/errors')
const firebase = require('./services/firebase')

const services = {
  httpServer: null,
  db: null,
  firebase: null,
}

const start = async () => {
  logger.info('Starting server')

  // Start HTTP server
  const app = new Koa()
  app
    .use(koaTime())
    .use(koaErrors())
    .use(koaCors())
    .use(koaBody())
    .use(routes)
    .use(notFoundHandler())

  services.httpServer = await new Promise(resolve => {
    const server = app.listen(config.server.port, () => resolve(server))
  })
  logger.info(`Server listening on port ${config.server.port}`)

  // TODO: connect do DB

  // initialize Firebase
  services.firebase = await firebase.init()
  firebase.initDb(services.firebase)
  logger.info('Firebase connection initialized')
}

const stop = async () => {
  logger.warn('Shutting down server')
  await services.httpServer.close()
  logger.warn('Server is down')
}

start()
  .then(() => logger.info('App is running'))
  .catch(err => logger.error('An error occurred', err))

process.once('SIGINT', stop)
process.once('SIGTERM', stop)
