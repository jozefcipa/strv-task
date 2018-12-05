'use strict'

const mongoose = require('mongoose')
const config = require('../config')

/**
 * Connects to MongoDB
 * @returns {Promise}
 */
const connect = () => mongoose.connect(config.database.url, config.database.options)

/**
 * Disconnects from MongoDB
 * @returns {Promise}
 */
const disconnect = () => mongoose.disconnect()

module.exports = {
  mongo: {
    connect,
    disconnect,
  },
}
