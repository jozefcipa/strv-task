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

// index users by email
userSchema.index({ email: 1 })

// create model
const User = mongoose.model('User', userSchema)

module.exports = User
