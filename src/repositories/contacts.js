'use strict'

const firebase = require('../services/firebase')
const { generateID } = require('../utils')

const COLLECTION_NAME = 'contacts'

/**
 * Save record to Firestore database
 * @param {*} input Input data
 * @returns {*}
 */
const save = async input => {
  const docRef = firebase.getDb().collection(COLLECTION_NAME).doc(generateID())
  await docRef.set(input)
  return {
    created: 1,
  }
}

module.exports = {
  save,
}
