const Project = require('../models/project')
const User = require('../models/user')
const Todo = require('../models/todo')

class ProjectController {

    static getAll(req, res, next) {
        Project.find({
                members: {
                    $in: req.headers.decode.id
                }
            })
            .populate('members')
            .populate('todos')
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Project.findById(req.params.projectId)
            .populate('members')
            .populate('todos')
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static create(req, res, next) {
        let data = {
            name: req.body.name,
            description: req.body.description,
            UserId: req.headers.decode.id
        }
        //  console.log(data)
        Project.create(data)
            .then(project => {
                return Project.findOneAndUpdate({
                    _id: project._id
                }, {
                    $push: {
                        members: req.headers.decode.id
                    }
                })
            })
            .then(project => {
                res.status(201).json(project)
            })
            .catch(next)
    }

    static update(req, res, next) {

        let update = {}
        req.body.name && (update.name = req.body.name)
        req.body.description && (update.description = req.body.description)
        req.body.due_date && (update.due_date = req.body.due_date)

        Project.findOneAndUpdate({
                _id: req.params.projectId
            }, {
                $set: update
            })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Project.findOneAndDelete({
                _id: req.params.projectId
            })
            .then(deletedProj => {
                return Promise.all([
                    deletedProj,
                    Todo.deleteMany({
                        ProjectId: req.params.projectId
                    }),
                    User.updateOne({
                        _id: req.headers.decode.id
                    }, {
                        $pull: {
                            todos: {
                                ProjectId: req.params.projectId
                            }
                        }
                    })
                ])
            })
            .then(([deletedProj]) => {
                res.status(200).json(deletedProj)
            })
            .catch(next)
    }

    static inviteMember(req, res, next) {

        // check if the member exist?
        User.findOne({
                email: req.query.memberEmail
            })
            .then(user => {
                // console.log(req.query.projectId, 'project <<<<<<<<<<<<<<<<<<<')
                if (user) {
                    return Promise.all([
                        Project.findById(req.query.projectId).populate('members'),
                        user
                    ])
                } else {
                    next({
                        code: 404,
                        message: 'It seems like user did not registered in this app yet.'
                    })
                }
            })
            .then(([project, user]) => {
                // check if the member already on this project?
                let check = project.members.find(member => member.email == req.query.memberEmail)
                if (check) {
                    next({
                        code: 400,
                        message: 'User already a member of this project.'
                    })
                } else {
                    return Promise.all([
                        Project.findOneAndUpdate({
                            _id: req.query.projectId
                        }, {
                            $push: {
                                members: user._id
                            }
                        }),
                        user
                    ])
                }
            })
            .then(([project, user]) => {
                res.status(200).json(user)
            })
            .catch(next)

    }

    static removeMember(req, res, next) {
        let {
            userId,
            projectId
        } = req.query

        Project.findOneAndUpdate({
                _id: projectId
            }, {
                $pull: {
                    members: userId
                }
            })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static updateProjectTodo(req, res, next) {
        let update = {}
        req.body.name && (update.name = req.body.name)
        req.body.description && (update.description = req.body.description)
        req.body.due_date && (update.due_date = req.body.due_date)

        console.log(update)

        Todo.findOneAndUpdate({
                _id: req.params.todoId
            }, {
                $set: update
            }, {
                new: true,
                runValidators: true
            })
            .then(updatedData => {
                res.status(200).json(updatedData)
            })
            .catch(next)
    }

    static createProjectTodo(req, res, next) {
        // console.log(req.headers)
        let projectId = req.body.projectId

        Todo.create({
                name: req.body.name,
                description: req.body.description,
                status: 'undone',
                due_date: req.body.due_date,
                UserId: req.headers.decode.id,
                ProjectId: projectId
            })
            .then(todo => {
                return Promise.all([
                    todo,
                    Project.findOneAndUpdate({
                        _id: projectId
                    }, {
                        $push: {
                            todos: todo._id
                        }
                    })
                ])
            })
            .then(([todo]) => {
                res.status(200).json(todo)
            })
            .catch(next)
    }
}

module.exports = ProjectController