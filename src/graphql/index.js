'use strict'

const { ApolloServer } = require('apollo-server-koa')
const config = require('../config')
const logger = require('../utils/logger')
const { typeDefs, resolvers } = require('./schema')

const formatError = err => {
  const isDevelopment = ['local', 'test', 'staging'].includes(config.env)

  logger.error(err)
  return {
    error: err.extensions.exception.message,
    httpCode: err.extensions.exception.httpCode,
    stack: isDevelopment && err.extensions.exception.stacktrace,
  }
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
    formatError,
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
