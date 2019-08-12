const router = require('express').Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')

router.use('/users', userRouter)
router.use('/todos', todoRouter)

module.exports = router