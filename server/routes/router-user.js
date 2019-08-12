const express = require('express');
const controllerLogin = require('../controllers/controller-login');
const controllerUser = require('../controllers/controller-user');
const router = express.Router()

routes.get('/', controllerUser.list)
routes.post('/signup', controllerUser.signup)
routes.post('/signin', controllerUser.signin)
routes.post('/googlesignin', controllerUser.signInGoogle)
routes.get('/:todoId', controllerUser.findUserTodo)

module.exports = router
