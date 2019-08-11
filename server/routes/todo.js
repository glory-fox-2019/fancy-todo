const router = require('express').Router()
const todoController = require('../controllers/todo')
const authToken = require('../middlewares/authToken')

router.post('/create', authToken, todoController.createTodo)
router.get('/gettodo', authToken, todoController.findTodo)
router.get('/getbyid/:id', authToken, todoController.findOne)
router.patch('/updatetodo/:id', authToken, todoController.updateTodo)
router.delete('/delete/:id', authToken, todoController.deleteTodo)

module.exports = router