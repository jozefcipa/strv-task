'use strict'

const Router = require('koa-router')
const config = require('../config')
const { createContact } = require('../controllers/contacts')
const { createUser, loginUser } = require('../controllers/users')
const { authenticated } = require('../middlewares/security')

const router = new Router()

router.get('/', ctx => {
  ctx.body = {
    app: config.app.name,
    version: config.app.version,
  }
})

// Contacts
router.post('/contacts', authenticated, createContact)

// Users
router.post('/users', createUser)
router.post('/login', loginUser)

module.exports = router.routes()
