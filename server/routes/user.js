const router = require('express').Router();
const controllers = require('../controllers');

router.post('/login/google', controllers.user.loginWithGoogle);
router.get('/', controllers.user.getUser);

module.exports = router;