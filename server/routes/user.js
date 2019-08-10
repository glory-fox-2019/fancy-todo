const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/dev', userController.findAll)
router.post('/', userController.signIn)
router.post('/google', userController.googleSignIn)

module.exports = router;