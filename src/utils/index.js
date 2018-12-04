'use strict'

const uuid = require('uuid/v4')

/**
 * Generates random ID string
 * @returns {*}
 */
const generateID = () => uuid()

module.exports = {
  generateID,
}
