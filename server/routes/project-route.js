const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const ProjectController = require('../controllers/project-controller')
const TodoController = require('../controllers/todo-controller')

// projects
router.get('/', ProjectController.getAll)
router.get('/:projectId', auth.authProjectMember, ProjectController.getOne)
router.post('/', ProjectController.create)
router.patch('/:projectId', auth.authProjectOwner, ProjectController.update)
router.delete('/:projectId', auth.authProjectOwner, ProjectController.delete)

// invite / remove member
router.post('/invite', auth.authProjectMember, ProjectController.inviteMember)
router.post('/remove-member', auth.authProjectOwner, ProjectController.removeMember)

// project-todos
router.post('/todos/add', auth.authProjectMember, ProjectController.createProjectTodo)
router.patch('/todos/:todoId/edit', auth.authProjectMember, ProjectController.updateProjectTodo)
router.get('/todos/:todoId', auth.authProjectMember, TodoController.getOne)
router.delete('/todos/:todoId/delete', auth.authProjectMember, TodoController.delete)


module.exports = router