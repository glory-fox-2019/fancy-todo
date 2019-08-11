const router = require('express').Router()
const TodoController = require('../controllers/todos')
const verifyToken = require('../middlewares/verify');

router.post('/create', verifyToken ,TodoController.create)
router.get('/', verifyToken, TodoController.findAll)
router.get('/:id', verifyToken, TodoController.findOne)
router.patch('/update/:id', verifyToken, TodoController.update)
router.delete('/delete/:id', verifyToken, TodoController.delete)
router.get('/find/:id/keyword', verifyToken, TodoController.findTask)
routes.get('/pending',  verifyToken, TodoController.getPending)
routes.get('/completed', verifyToken, TodoController.getComplete)


module.exports = router