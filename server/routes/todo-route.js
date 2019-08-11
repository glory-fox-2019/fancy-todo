const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const TodoController = require('../controllers/todo-controller')

router.post('/add', TodoController.create)

router.get('/search', TodoController.search)

router.get('/:todoId', auth.authorization, TodoController.getOne)
router.patch('/:todoId/status', TodoController.status)
router.patch('/:todoId/edit', auth.authorization, TodoController.update)
router.delete('/:todoId/delete', auth.authorization, TodoController.delete)

module.exports = router