/* eslint-disable no-empty */
'use strict'

const sinon = require('sinon')
const firebase = require('../../src/services/firebase')

/**
 * Stub for Firebase API
 * @returns {*}
 */
const stubFirebase = () => {
  try {
    sinon.stub(firebase, 'init')
      .returns({})
    sinon.stub(firebase, 'initDb')
      .returns({})
    sinon.stub(firebase, 'getDb')
      .returns({
        collection() {
          return {
            doc() {
              return {
                async set() {},
              }
            },
          }
        },
      })
  } catch (e) {}
}

module.exports = {
  stubFirebase,
}
