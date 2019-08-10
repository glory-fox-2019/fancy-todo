const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authen')
const authorization = require('../middlewares/author')
const TodoController = require('../controllers/TodoController')

router.use(authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.findAll)
router.put('/:id', authorization,TodoController.update)
router.delete('/:id', authorization ,TodoController.destroy)

module.exports = router