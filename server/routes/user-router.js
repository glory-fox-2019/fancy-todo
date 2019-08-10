const router = require('express').Router()
const UserController = require('../controllers/user-controller')

router.post('/register', UserController.register) // normal register

router.post('/signin', UserController.getLogin) // normal sign-in

router.post('/googlesignin', UserController.googleSignIn) // google sign-in

module.exports = router