/* eslint-disable func-names */
'use strict'

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  password: String,
  email: String,
})

// Find user by email
userSchema.query.byEmail = function(email) {
  return this.where({ email })
}

// Find user by email and password
userSchema.query.byEmailAndPassword = function(email, password) {
  return this.where({ email, password })
}

// index users by email
userSchema.index({ email: 1 })

// create model
const User = mongoose.model('User', userSchema)

module.exports = User
