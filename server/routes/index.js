const express = require('express');
const routes = express.Router();
const todos = require('./router-todo')
const users = require('./router-user')
const authentication = require('../midleware/authentication')

routes.use('/users', users)
routes.use('/todos', authentication, todos)

routes.get('*', (req, res) => {
    res.status(404).json({msg: 'Page not found'})
})

module.exports = routes