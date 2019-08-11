const Todo = require('../models/todo');
const User = require('../models/user');
const { jwtSign, jwtVerify } = require('../helper/jwt');

class TodoController {
  static findAll(req, res, next) {
    const payload = jwtVerify(req.params.token);
    console.log(payload, req.params.token);
    if (!payload.username) {
      res.status(403).json({ status: false })
    }
    User.findOne({
      username: payload.username
    })
    .then(one => {
      console.log(one);
      return Todo.find({
        user_id: one._id
      })
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json({message: 'not found'})
    })
  }

  static createTodo(req, res, next) {
    const { todo, desc, due_date, user_id } = req.body;

    Todo.create({ todo, desc, due_date, user_id, status: false })
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  }

  static findOne(req, res, next) {
    Todo.findOne({ _id:  req.params.id})
    .then(one => {
      res.status(200).json(one);
    })
    .catch(err => {
      res.status(400).json(err);
    })
  }

  static delete(req, res, next) {
    console.log(req.params);
  }
}

module.exports = TodoController;