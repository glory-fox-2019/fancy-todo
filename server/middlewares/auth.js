const jwtoken = require('../helpers/jwt')
const Todo = require('../models/todo')
const Project = require('../models/project')

module.exports = {
    authentication(req, res, next) {
        try {
            var decoded = jwtoken.verifyToken(req.headers.token)
            req.headers.decode = decoded
            next()
        } catch (err) {
            next(err)
        }
    },
    authorization(req, res, next) {
        Todo.findById(req.params.todoId)
            .then(todo => {
                if (todo.UserId == req.headers.decode.id) {
                    next()
                } else {
                    next({
                        code: 401,
                        msg: "Unauthorized process"
                    })
                }
            })
    },
    authProjectOwner(req, res, next) {
        let projectId = ''
        req.query.projectId && (projectId = req.query.projectId)
        req.params.projectId && (projectId = req.params.projectId)

        Project.findById(projectId)
            .then(project => {
                if (project.UserId == req.headers.decode.id) {
                    next()
                } else {
                    next({
                        code: 401,
                        message: "Please ask the owner to do this process!"
                    })
                }
            })
    },
    authProjectMember(req, res, next) {
        // console.log(req.params, 'from auth <<<<<<<<<<<<<<<<<<<<<<')
        let projectId = ''
        req.query.projectId && (projectId = req.query.projectId)
        req.params.projectId && (projectId = req.params.projectId)
        req.body.projectId && (projectId = req.body.projectId)
        
        Project.findById(projectId)
            .then(project => {
                let members = project.members
                let check = members.find(member => member == req.headers.decode.id)
                if (check) {
                    next()
                } else {
                    next({
                        code: 401,
                        message: 'You are not a member of this project.'
                    })
                }
            })
            .catch(next)
    }
}