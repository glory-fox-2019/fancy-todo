const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.photo.search);

module.exports = router;