const router = require('express').Router(),
    ProjectController = require('../controllers/project'),
    authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', ProjectController.create)
router.get('/', ProjectController.findAll)
router.get('/:projectId', ProjectController.findOne)
router.patch('/:projectId', ProjectController.updateOne)
router.delete('/:projectId', ProjectController.deleteOne)

module.exports = router