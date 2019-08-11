const Todo = require('../models/Todo')

class TodoController {
  static addTodo(req, res, next) {
    const { title, description, deadline } = req.body
    Todo.create({
      title,
      description,
      deadline,
      idUser : req.body.user.id
    })
    .then(todo => {
      res.json({
        todo
      })
    })
    .catch(err => {
      if(err.name === 'ValidationError') {
        let errors = []
        for(let key in err.errors) {
          errors.push(err.errors[key].message)
        }
        next({
          status : 400,
          message : errors
        })
      }else{
        next(err)
      }
    })
  }

  static getTodo(req, res, next) {
    Todo.find({
      idUser : req.body.user.id
    })
    .then(todos => {
      res.json({
        todos
      })
    })
    .catch(next)
  }

  static updateStatusTodo(req, res, next) {
    Todo.findOne({
      _id : req.body.id
    })
    .then(todo => {
      if(todo.status === 'Belum Selesai') {
        return Todo.updateOne({
          _id : req.body.id
        },{
          status : 'Selesai'
        })
      }else{
        return Todo.updateOne({
          _id : req.body.id
        },{
          status : 'Belum Selesai'
        })
      }
    })
    .then(data => {
      res.json({
        data
      })
    })
    .catch(next)
  }

  static deleteTodo(req, res, next) {
    Todo.findByIdAndDelete({
      _id : req.body.id
    })
    .then(data => {
      res.json({
        data
      })
    })
    .catch(next)
  }


  static findOne(req, res, next) {
    Todo.findOne({
      _id : req.headers.id
    })
    .then(todo => {
      res.json({
        todo
      })
    })
    .catch(next)
  }

  static updateTodo(req, res, next) {
    Todo.findByIdAndUpdate(req.headers.id, {
      title : req.body.title,
      description : req.body.description,
      deadline : req.body.deadline
    }, {
      runValidators : true
    })
    .then(data => {
      res.json({
        data
      })
    })
    .catch(err => {
      if(err.name === 'ValidationError') {
        let errors = []
        for(let key in err.errors) {
          errors.push(err.errors[key].message)
        }
        next({
          status : 400,
          message : errors
        })
      }else{
        next(err)
      }
    })
  }

}


module.exports = TodoController