const router = require('express').Router(),
    UserController = require('../controllers/user'),
    authentication = require('../middlewares/authentication')

router.get('/', authentication, UserController.findAll)
router.post('/signin', UserController.signIn)
router.post('/signup', UserController.signUp)
router.post('/signin/google', UserController.googleSignIn)

module.exports = router