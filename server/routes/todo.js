const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.todo.findAll);
router.get('/:id', controllers.todo.findOne)
router.post('/', controllers.todo.create);
router.put('/:id', controllers.todo.edit);
router.delete('/:id', controllers.todo.delete);
router.get('/:id/check', controllers.todo.check);
router.get('/:id/uncheck', controllers.todo.uncheck);

module.exports = router;