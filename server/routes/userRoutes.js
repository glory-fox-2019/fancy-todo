const router = require('express').Router();
const UserController = require('../controller/userController');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/googleLogin', UserController.googleLogin);

module.exports = router;