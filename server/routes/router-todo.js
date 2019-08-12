const express = require('express');
const controllerTodo = require('../controllers/controller-todo');
const router = express.Router()
const authorize = require('../midleware/authorize');

routes.post('/', controllerTodo.create)
routes.get('/', controllerTodo.list)
router.use(authorize)
routes.get('/search', controllerTodo.search)
routes.put('/:id', controllerTodo.update)
routes.patch('/:id', controllerTodo.update)
routes.delete('/:id', controllerTodo.delete)

module.exports = router