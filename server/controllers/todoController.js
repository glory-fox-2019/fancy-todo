const Todo = require('../models/todo')
const User = require('../models/user')

class TodoController {
    static findChecked (req, res, next) {
        Todo.find({
            status: true,
            user: req.params.userId
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static findUnchecked(req, res, next) {
        Todo.find({
            status: false,
            user: req.params.userId   
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static create(req, res, next) {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            status : false,
            user: req.params.userId
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }

    static done(req, res, next) {
        let { id }  = req.params
        Todo.findByIdAndUpdate(id, {status: true}, {new: true, runValidators: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static undone(req, res, next) {
        let { id }  = req.params
        Todo.findByIdAndUpdate(id, {status: false}, {new: true, runValidators: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let { id } = req.params
        let updatedData = {}
        req.body.name && (updatedData.name = req.body.name)
        req.body.description && (updatedData.description = req.body.description)
        req.body.status && (updatedData.status = req.body.status)

        Todo.findByIdAndUpdate(id, updatedData, {new: true, runValidators: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Todo.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(200).json({
                message: 'delete success'
            })
        })
        .catch(next)
    }
}

module.exports = TodoController