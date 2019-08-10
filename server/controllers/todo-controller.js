const axios = require('axios')
const Todo = require('../models/todo-model')

class TodoController {

    static getAllTodo(req, res, next) {
        Todo.find()
            .then(todo => {
                if(todo) {
                    res.json(todo)
                } else {
                    next({status: 404, message: "There are no todos yet"})
                }
            })
            .catch(next)
    }

    static addTodo(req, res, next) {
        const {name, description} = req.body
        Todo.create({
            name,
            description
        })
            .then(() => {
                res.status(201).json({name, description})
            })
            .catch(next)
    }

    static filterTodo(req, res, next) {
        const {name} = req.body
        Todo.find({
            name: {
                $regex: name
            }
        })
            .then(todos => {
                res,json(todos)
            })
            .catch(next)
    }

    static updateTodo(req, res, next) {
        
    }

    static removeTodo(req, res, next) {
        const {_id} = req.body
        Todo.deleteOne({_id})
            .then(() => {
                res.status(204).json({message: "todo successfuly deleted"})
            })
            .catch(next)
    }
}

module.exports = TodoController