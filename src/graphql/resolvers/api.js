'use strict'

const config = require('../../config')

module.exports = {
  Query: {
    api: () => config.app,
  },
}
