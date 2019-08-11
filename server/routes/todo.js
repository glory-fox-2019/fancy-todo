const router = require('express').Router()
const todoController = require('../controllers/todo')

router.post('/create',todoController.createTodo)
router.get('/gettodo',todoController.findTodo)
router.patch('/updatetodo',todoController.updateTodo)

module.exports = router