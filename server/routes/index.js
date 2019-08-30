const express = require('express')
const routes = express.Router()
const todos = require('./todos')
const users = require('./users')

routes.use('/todos',todos)
routes.use('/users',users)

module.exports = routes