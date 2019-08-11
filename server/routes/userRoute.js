const route = require('express').Router()
const userController = require('../controllers/userController')
const authentication = require('../middleware/authentication')

route.post('/login', userController.login)
route.post('/signup', userController.signUp)
route.post('/signinGoogle', userController.signinGoogle)
route.get('/dashboard', authentication, userController.dashboard)


module.exports = route