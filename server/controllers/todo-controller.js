const axios = require('axios')
const Todo = require('../models/todo-model')

class TodoController {

    static getAllTodo(req, res, next) {
        console.log(req.currentUser, "dalam getall")
        Todo.find({
            user_id: req.currentUser._id
        }).populate('user_id', '_id full_name email')
            .then(todo => {
                if(todo.length > 0) {
                    res.json(todo.sort((a, b) => a.createdAt - b.createdAt))
                } else {
                    next({status: 404, message: "There are no todos yet"})
                }
            })
            .catch(next)
    }

    static addTodo(req, res, next) {
        const newTodo = {
            name: req.body.name,
            description: req.body.description,
            user_id: req.currentUser._id
        }
        req.body.due_date && (newTodo.due_date = new Date(req.body.due_date))

        Todo.create(newTodo)
            .then(created => {
                res.status(201).json(created)
            })
            .catch(next)
    }

    static filterTodo(req, res, next) {
        const {name} = req.params
        Todo.find({
            name: {
                $regex: name,
                $options: 'i'
            },
            user_id: req.currentUser._id
        }).populate('user_id', '_id full_name email')
            .then(todos => {
                if(todos.due_date) {
                    todos.due_date = todos.due_date.toISOString().slice(0, 11)
                }
                res.json(todos.sort((a, b) => a.createdAt - b.createdAt))
            })
            .catch(next)
    }

    static updateTodo(req, res, next) {
        const {_id} = req.body
        const todoUpdate = {}
        req.body.name && (todoUpdate.name = req.body.name)
        req.body.description && (todoUpdate.description = req.body.description)
        req.body.completed && (todoUpdate.completed = req.body.completed)
        req.body.due_date && (todoUpdate.due_date = req.body.due_date)

        Todo.updateOne(_id, {
            $set: todoUpdate
        })
            .then(updated => {
                res.json(updated)
            })
            .catch(next)
    }

    static removeTodo(req, res, next) {
        const {_id} = req.params
        Todo.deleteOne({_id})
            .then(() => {
                res.status(204).json({message: "Todo successfuly deleted"})
            })
            .catch(next)
    }

}

module.exports = TodoController