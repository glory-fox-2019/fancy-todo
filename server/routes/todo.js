const router = require('express').Router();
const TodoController = require('../controllers/todo');

router.get('/:token', TodoController.showDashboard);

router.get('/detail/:id', TodoController.findOne);

router.delete('/:todo_id/:token', TodoController.delete);

router.post('/', TodoController.createTodo);

router.get('/done/:todo_id/:token' , TodoController.doneTodo);


module.exports = router;