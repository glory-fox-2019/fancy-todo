const router = require('express').Router(),
    TodoController = require('../controllers/todo'),
    authentication = require('../middlewares/authentication'),
    authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.findAll)

router.use('/:todoId', authorization)
router.get('/:todoId', TodoController.findOne)
router.patch('/:todoId', TodoController.updateOne)
router.delete('/:todoId', TodoController.deleteOne)

module.exports = router