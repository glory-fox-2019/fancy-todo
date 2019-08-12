const router = require('express').Router()
const UserController = require('../controllers/user')
const verifyToken = require('../middlewares/verify');

router.post('/register', UserController.register)
router.get('/find/:email', UserController.findOne)
router.post('/signin', UserController.login)
router.post(('/google-signin', verifyToken, UserController.googleSignIn))

module.exports = router