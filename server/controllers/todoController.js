const Todo =  require('../models/todo')
const {ObjectId} = require('mongodb')

class TodoController {
  static addTodo(req, res, next) {
    const {name, description, date} = req.body
    console.log(req.decoded.id);
    Todo.create({
      name, description, dueDate: new Date(date), User: ObjectId(req.decoded.id)
    })
    .then(todos => {
      // console.log(todos);
      res.status(201).json(todos)
    })
    .catch(next)
  }

  static show(req, res, next) {
    console.log(req.decoded.id);
    Todo.find({
      User: req.decoded.id
    })
    .then(todos => {
      console.log(todos);
      res.json(todos)
    })
    .catch(next)
  }

  static deleteOne(req, res, next) {
    Todo.deleteOne({
      _id: req.params.id,
      User: req.decoded.id
    })
    .then(todos => {
      res.status(200).json({
        message: 'sukses dihapus'
      })
    })
    .catch(next)
  }

  static complete(req, res, next) {
    Todo.updateOne({
      _id: req.params.id,
      User: req.decoded.id
    }, {
      status: true
    })
    .then(todos => {
      res.status(200).json({
        message: 'completed',
        todos
      })
    })
    .catch(next)
  }

  static uncomplete(req, res, next) {
    Todo.updateOne({
      _id: req.params.id,
      User: req.decoded.id
    }, {
      status: false
    })
    .then(todos => {
      res.status(200).json({
        message: 'uncompleted',
        todos
      })
    })
  }
}

module.exports = TodoController