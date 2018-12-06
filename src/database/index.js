'use strict'

const mongoose = require('mongoose')
const config = require('../config')

// Convert _id to string
const { ObjectId } = mongoose.Types
ObjectId.prototype.valueOf = function() {
  return this.toString()
}

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
