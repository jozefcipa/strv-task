'use strict'

const firebaseAdmin = require('firebase-admin')
const config = require('../config')

/**
 * Firestore instance
 * @type {null}
 */
let db = null

/**
 * Initialiazes and authenticates Firebase connection
 * @returns {Promise<admin>}
 */
const init = () => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(config.firebase.serviceAccount),
    databaseURL: config.firebase.databaseUrl,
  })
  return firebaseAdmin
}

/**
 * Initializes Firestore database
 * @param {Firebase} firebase Initialized Firebase instance
 * @returns {admin.firestore.Firestore | *}
 */
const initDb = firebase => {
  const firestore = firebase.firestore()
  firestore.settings({ timestampsInSnapshots: true })
  db = firestore
  return firestore
}

/**
 * Returns Firestore instance
 * @returns {Firestore}
 */
const getDb = () => db

module.exports = {
  init,
  initDb,
  getDb,
}
