const Todo = require('../models/todos')
const User = require('../models/user')

class ControllerTodo {
    static create(req, res, next) {
        const { name, description, creator, due_date, isFinished} = req.body
        //    console.log('masuuuuk create')
        Todo.create({
           name, description, creator, due_date, isFinished
        })
        .then((todo) => {
            // console.log('masuk sinii')
            res.status(200).json({ todo })
        })
        .catch((err) => {
            // console.log('masuk error')
            console.log(err, 'masuk siniiiii')
            next(err)
        })
    }

    static findAll(req, res, next) {
        console.log('masukkk')
        Todo
         .find({
            creator : req.params.id
         })
         .then((lists)=> {
            res.status(200).json(lists)
         })
         .catch((err)=> {
             next(err)
         })
    }

    static findOne(req, res, next) {
        Todo.findById({
            _id: req.params._id
        })
        .then((todo) => {
            res.status(200).json({todo})
        })
        .catch((err) => {
            next(err)
        })
    }

    static update(req, res, next) {
        Todo.findById({
            _id: req.params._id
        })
        .then((found) => {
            // console.log(found)
            found.isFinished = true
            found.save()
            console.log(found);
            res.status(200).json(found)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
    }

    static delete(req, res, next) {
        Todo.deleteOne({
            _id: req.headers._id
        })
        .then((found) => {
            res.status(200).json({
                message: 'success delete data'
            })
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
    }

    static findTask(req, res, next) {
        const taskRegex = new RegExp(req.query.name, 'i')
        Todo.find({
          name : taskRegex,
          creator : req.decoded.id
        })
        .then((found) => {
          res.status(200).json(found)
        })
        .catch((err) => {
            next(err)
        })
    }

    static pending(req, res, next) {
        Todo.find({
            creator : req.decoded.id,
            isFinished : false
        })
        .then((results) => {
            res.status(200).json(results)
          })
        .catch((err) => {
            next(err)
        })
    }

    static complete(req, res, next) {
        Todo.find({
          creator : req.decoded.id,
          isFinished : true
        })
        .then((results) => {
          res.status(200).json(results)
        })
        .catch(next)
    }
    
}

module.exports = ControllerTodo