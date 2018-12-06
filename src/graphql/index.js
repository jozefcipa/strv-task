'use strict'

const { ApolloServer } = require('apollo-server-koa')
const config = require('../config')
const logger = require('../utils/logger')
const { typeDefs, resolvers } = require('./schema')
const { formatResponseError } = require('../utils/errors')

const errHandler = err => {
  // if (err.name === 'GraphQLError') {
  //   return err
  // }
  const responseError = formatResponseError(err.extensions.exception, config.env)
  // log error
  logger.error(JSON.stringify({
    ...responseError,
    stack: err.stack,
  }))
  return responseError
}

/**
 * Intializes GraphQL
 * @param {Koa app} app Koa instance
 */
const initializeGraphQL = app => {
  // Create Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: config.graphql.playground.enabled,
    introspection: config.graphql.playground.enabled,
    playground: config.graphql.playground.enabled ? config.graphql.playground : false,
    formatError: errHandler,
  })

  // Apply Apollo middleware
  server.applyMiddleware({
    app,
    path: '/graphql',
  })
}

module.exports = {
  initializeGraphQL,
}
