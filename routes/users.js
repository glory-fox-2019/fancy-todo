const express = require('express')
const routes = express.Router()
const controller = require('../controllers/controllerUser')

routes.post('/',controller.create)
routes.post('/login',controller.login)

module.exports = routes