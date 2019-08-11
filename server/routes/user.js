const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/', UserController.create)
router.post('/signIn', UserController.signIn)
router.post('/signInGoogle', UserController.googleSignIn)

module.exports = router
