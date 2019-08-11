const route = require('express').Router()
const todoController = require('../controllers/todoController')

const authentication = require('../middleware/authentication')


route.use(authentication)
route.post('/addTodo', todoController.addTodo)
route.get('/getTodo', todoController.getTodo)
route.get('/findOne', todoController.findOne)
route.delete('/deleteTodo', todoController.deleteTodo)
// route.put('/updateTodo', todoController.updateTodo)
route.patch('/updateTodo', todoController.updateTodo)
route.patch('/updateStatusTodo', todoController.updateStatusTodo)

module.exports = route