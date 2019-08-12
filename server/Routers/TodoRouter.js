    const express = require('express');
const router = express.Router();
const { TodoControllers } = require('../Controllers')
const { Authenthication , Authorized } = require('../middelware')

router.use(Authenthication)

router.post('/'  , TodoControllers.addTodo);
router.get('/'  , TodoControllers.ShowTodo);
router.delete('/:id' , Authorized , TodoControllers.Delete);
router.patch('/:id/complete' , Authorized , TodoControllers.completeTodo);
router.patch('/:id/uncomplete' , Authorized , TodoControllers.UncompleteTodo);
router.put('/:id' , TodoControllers.updateDataTodo )

module.exports = router