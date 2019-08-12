const Todo = require('../models/todo')

module.exports = class TodoController {
    static create (req, res, next) {
        const { name, description, due_date, project_id } = req.body
        const user_id = req.decoded._id

        Todo.create({ name, description, due_date, project_id, user_id })
            .then( todo => {
                res.status(201).json(todo)
            })
            .catch(next)
    }

    static findAll (req, res, next) {
        Todo.find({ project_id: req.query.id })
            .then( todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static findOne (req, res, next) {
        Todo.findById(req.params.todoId)
            .then( todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static updateOne (req, res, next) {
        let update = {}
        const { name, description, due_date, project_id } = req.body

        name && (update.name = name)
        description && (update.description = description)
        due_date && (update.due_date = due_date)
        project_id && (update.project_id = project_id)

        Todo.findByIdAndUpdate(req.params.todoId, { $set: update }, { new: true, runValidators: true })
            .then( todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static deleteOne (req, res, next) {
        Todo.findByIdAndDelete(req.params.todoId)
            .then( todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }
}

