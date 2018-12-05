'use strict'

const Koa = require('koa')
const koaCors = require('kcors')
const koaBody = require('koa-body')
const mongoose = require('mongoose')
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

const app = new Koa()
app
  .use(koaTime())
  .use(koaErrors())
  .use(koaCors())
  .use(koaBody())
  .use(routes)
  .use(notFoundHandler())

app.start = async () => {
  logger.info('Starting server')

  // start HTTP server
  services.httpServer = await new Promise(resolve => {
    const server = app.listen(config.server.port, () => resolve(server))
  })
  logger.info(`Server listening on port ${config.server.port}`)

  // connect do DB
  services.db = await mongoose.connect(config.database.url, config.database.options)
  logger.info('Connected to MongoDB')

  // initialize Firebase
  services.firebase = await firebase.init()
  firebase.initDb(services.firebase)
  logger.info('Firebase connection initialized')
}

app.stop = async () => {
  logger.warn('Shutting down server')
  await services.httpServer.close()
  await services.db.disconnect()
  logger.warn('Server is down')
}

// Launch app
if (require.main === module) {
  app.start()
    .then(() => logger.info('App is running 🎉'))
    .catch(err => logger.error(`Error occurred: ${err.stack}`))
}

process.once('SIGINT', () => app.stop())
process.once('SIGTERM', () => app.stop())

module.exports = app
