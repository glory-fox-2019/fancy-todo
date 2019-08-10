const Todo = require('../models/Todo')

class TodoController {
    static create(req, res, next) {
        const { name, description, due_date } = req.body
        const owner = req.decode._id
        Todo.create({
            name,
            description,
            due_date,
            owner
        })
        .then(created => {
            res.status(201).json(created)
        })
        .catch(next)
    }

    static findAll(req, res, next) {
        Todo.find({
            owner: req.decode._id
        }).populate('owner', 'username')
        .then(list => {
            res.status(200).json(list)
        })
        .catch(next)
    }

    static update(req, res, next) {
        Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static destroy(req, res, next) {
        Todo.findByIdAndDelete(req.params.id)
        .then(deleted => {
            res.status(200).json({
                name: deleted.name,
                description: deleted.description,
                status: "deleted"
            })
        })
        .catch(next)
    }
}

module.exports = TodoController