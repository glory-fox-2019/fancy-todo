const router = require('express').Router();
const TaskController = require('../controller/taskController');

router.get('/', TaskController.findAll);
router.post('/create', TaskController.create);
router.delete('/:id', TaskController.delete);
router.patch('/:id', TaskController.changeStatus);
router.get('/findOne', TaskController.findOne);
router.post('/edit', TaskController.edit);

module.exports = router;