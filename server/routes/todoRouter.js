const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.post('/create/:userId', todoController.create)
router.get('/find-checked/:userId', todoController.findChecked)
router.get('/find-unchecked/:userId', todoController.findUnchecked)
router.patch('/check/:id', todoController.done)
router.patch('/uncheck/:id', todoController.undone)
router.patch('/update/:id', todoController.update)
router.delete('/delete/:id', todoController.delete)

module.exports = router