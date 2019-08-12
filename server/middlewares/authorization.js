const jwt = require('jsonwebtoken')
const Todo = require('../models/todo')

module.exports = {
  authorization(req, res, next) {
    Todo.findOne({
      where: {
        _id: req.params.id
      }
    })
    .then(todos => {
      if(todos) {
        if(req.decoded.id === todos.User) {
          next()
        } else {
          next({code: 400, message: 'Unauthorized User'})
        }
      } else {
        next({code: 400, message: 'Todo is not defined'})
      }
    }).catch((err) => { 
      next({code: 400, message: 'Todo is not defined'})
      // console.log(err);
    });
  }
}