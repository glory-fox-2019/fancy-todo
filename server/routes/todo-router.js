const router = require('express').Router()
const TodoController = require('../controllers/todo-controller')
const { userAuthentication, userAuthorization } = require('../middlewares/authUser')

router.use(userAuthentication)

router.get('/', TodoController.getAllTodo) // get all todos based on current user
router.post('/', TodoController.addTodo) // make todo

router.get('/:name', TodoController.filterTodo) // filter todo by name

router.patch('/:_id', TodoController.updateTodo) // update a todo

router.delete('/:_id', userAuthorization, TodoController.removeTodo) // delete a todo

module.exports = router