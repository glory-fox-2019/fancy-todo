const router = require('express').Router(),
    UserRoutes = require('./user'),
    TodoRoutes = require('./todo'),
    ProjectRoutes = require('./project')

router.use('/users', UserRoutes)
router.use('/todos', TodoRoutes)
router.use('/projects', ProjectRoutes)

module.exports = router