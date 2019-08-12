const router = require('express').Router();
const controllers = require('../controllers');
const authentication = require('../middlewares/authentication');

router.post('/login/google', controllers.user.loginWithGoogle);
router.get('/', authentication, controllers.user.getUser);

module.exports = router;