const todoRouter = require('express').Router()
const todoController = require('../controllers/todoController')
const {authorization} = require('../middlewares/authorization')
const {authentication} = require('../middlewares/authentication')

todoRouter.use(authentication)
todoRouter.post('/', todoController.addTodo)
todoRouter.get('/', todoController.show)
todoRouter.delete('/:id', authorization, todoController.deleteOne)
todoRouter.patch('/:id/complete', authorization, todoController.complete)
todoRouter.patch('/:id/uncomplete', authorization, todoController.uncomplete)

module.exports = todoRouter

