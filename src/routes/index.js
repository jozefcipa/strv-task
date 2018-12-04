'use strict'

const Router = require('koa-router')
const config = require('../config')
const { createContact } = require('../controllers/contacts')

const router = new Router()

router.get('/', ctx => {
  ctx.body = {
    app: config.app.name,
    version: config.app.version,
  }
})

// Contacts
router.post('/contacts', createContact)

module.exports = router.routes()
