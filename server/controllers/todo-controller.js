const Todo = require('../models/todo')
const User = require('../models/user')
const Project = require('../models/project')

class TodoController {

    static create(req, res, next) {

        Todo.create({
                name: req.body.name,
                description: req.body.description,
                status: 'undone',
                due_date: req.body.due_date,
                UserId: req.headers.decode.id,
                ProjectId: null
            })
            .then(todo => {
                return Promise.all([todo, User.updateOne({
                    _id: req.headers.decode.id
                }, {
                    $push: {
                        todos: todo._id
                    }
                })])
            })
            .then(([todo]) => {
                console.log(todo)
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Todo.findById(req.params.todoId)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static status(req, res, next) {
        // console.log(req.params.todoId, 'TODO ID  <<<<<<<<<<<<<<<<<<<<<<<<<')
        Todo.findById(req.params.todoId)
            .then(todo => {
                if (todo.status == 'undone') {
                    return Todo.updateOne({
                        _id: req.params.todoId
                    }, {
                        $set: {
                            status: 'done'
                        }
                    })
                } else {
                    return Todo.updateOne({
                        _id: req.params.todoId
                    }, {
                        $set: {
                            status: 'undone'
                        }
                    })
                }
            })
            .then(updated => {
                // console.log(updated)
                res.status(200).json('Successfuly change a Todo status.')
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Todo.deleteOne({
                _id: req.params.todoId
            })
            .then(deleted => {
                // console.log(deleted)
                return User.updateOne({
                    _id: req.headers.decode.id
                }, {
                    $pull: {
                        todos: req.params.todoId
                    }
                })

            })
            .then(updated => {
                res.status(200).json('Successfuly deleted a Todo.')
            })
            .catch(next)
    }

    static search(req, res, next) {
        User.findById(req.headers.decode.id)
            .populate('todos')
            .then(user => {
                let todos = user.todos
                let searched = todos.filter(todo => {
                    let regex = new RegExp(`${req.query.name}`, 'i')
                    return regex.test(todo.name)
                })
                // console.log(searched)
                res.status(200).json(searched)
            })
            .catch(next)
    }

    static update(req, res, next) {
        let update = {}

        req.body.name && (update.name = req.body.name)
        req.body.description && (update.description = req.body.description)
        // console.log(update)
        Todo.findOneAndUpdate({
                _id: req.params.todoId
            }, {
                $set: update
            }, {
                new: true
            })
            .then(updatedData => {
                res.status(200).json(updatedData)
            })
            .catch(next)
    }

}

module.exports = TodoController