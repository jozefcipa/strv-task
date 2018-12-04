'use strict'

const { getDb } = require('../services/firebase')
const { generateID } = require('../utils')

const COLLECTION_NAME = 'contacts'

/**
 * Save record to Firestore database
 * @param {*} input Input data
 * @returns {*}
 */
const save = input => {
  const docRef = getDb().collection(COLLECTION_NAME).doc(generateID())
  return docRef.set(input)
}

module.exports = {
  save,
}
