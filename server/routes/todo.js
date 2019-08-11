const router = require('express').Router();
const TodoController = require('../controllers/todo');

router.get('/:token', TodoController.findAll);
router.get('/detail/:id', TodoController.findOne);
router.delete('/:todo_id/token', TodoController.delete)
router.post('/', TodoController.createTodo);


module.exports = router;