const colorPicker = require('../helpers/getQRcolor')
const Todo = require('../models/todo-model')

class TodoController {

    static getAllTodo(req, res, next) {

        Todo.find({
            user_id: req.currentUser._id
        }).populate('user_id', '_id full_name email')
            .then(todo => {
                if(todo.length > 0) {
                    let output = []
                    todo.forEach(el => {
                        let colorCode = colorPicker(el.due_date)
                        output.push({
                            _id: el._id,
                            name: el.name,
                            description: el.description,
                            completed: el.completed,
                            due_date: el.due_date.toISOString().slice(0, 10) || "none",
                            qr_link: `http://api.qrserver.com/v1/create-qr-code/?data=Todo: ${el.name} Description: ${el.description} Due: ${el.due_date.toISOString().slice(0, 10)}&size=100x100&bgcolor=${colorCode}`
                        })
                    })

                    res.json(output.sort((a, b) => a.createdAt - b.createdAt))
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
            due_date: req.body.due_date,
            user_id: req.currentUser._id,
        }

        Todo.create(newTodo)
            .then((created) => {
                const {_id, name, description, due_date, completed} = created
                let colorCode = colorPicker(created.due_date)
                res.status(201).json({_id, name, description, due_date, completed, qr_link: `http://api.qrserver.com/v1/create-qr-code/?data=Todo: ${_id} Description: ${description} Due: ${due_date.toISOString().slice(0, 10)}&size=100x100&bgcolor=${colorCode}`})
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
                let output = []
                todos.forEach(el => {
                    let colorCode = colorPicker(el.due_date)
                    output.push({
                        _id: el._id,
                        name: el.name,
                        description: el.description,
                        completed: el.completed,
                        due_date: el.due_date.toISOString().slice(0, 10),
                        qr_link: `http://api.qrserver.com/v1/create-qr-code/?data=Todo: ${el.name} Description: ${el.description} Due: ${el.due_date.toISOString().slice(0, 10)}&size=100x100&bgcolor=${colorCode}`
                    })
                })
                res.json(output.sort((a, b) => a.createdAt - b.createdAt))
            })
            .catch(next)
    }

    static updateTodo(req, res, next) {
        const {_id} = req.params

        Todo.updateOne({_id}, {
            $set: {
                completed: true
            }
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
                res.status(200).json({message: "Todo successfuly deleted"})
            })
            .catch(next)
    }

}

module.exports = TodoController