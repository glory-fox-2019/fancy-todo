const Model = require('../models');

class Todo {
  static findAll(req,res,next){
    Model.Todo
      .find()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch(next);
  }
  static findOne(req,res,next){
    Model.Todo
      .findOne({
        _id: req.params.id
      })
      .then((data) => {
        if(data){
          res.status(201).json(data);
        }else{
          next({
            httpStatus: 404,
            message: 'Not Found!'
          })
        }
      })
      .catch(next);
  }
  static create(req,res,next){
    Model.Todo
      .create({
        title: req.body.title,
        dueDate: req.body.dueDate,
        description: req.body.description,
        tag: req.body.tag,
        thumbnail: req.body.thumbnail,
        status: false
      })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch(next)
  }
  static edit(req,res,next){
    let input = {};
    req.body.title && (input.title = req.body.title)
    req.body.dueDate && (input.dueDate = req.body.dueDate)
    req.body.description && (input.description = req.body.description)
    req.body.tag && (input.tag = req.body.tag)
    req.body.thumbnail && (input.thumbnail = req.body.thumbnail)

    Model.Todo
      .findByIdAndUpdate(req.params.id, input, {new: true})
      .then((data) => {
        res.json(data);
      })
      .catch(next)
  }
  static delete(req,res,next){
    Model.Todo
      .deleteOne({_id: req.params.id})
      .then((data) => {
        if(data.deletedCount === 0){
          next({
            httpStatus: 404,
            message: 'Not Found!'
          })
        }else{
          res.json({
            message: 'Successfully Deleted!'
          });
        }
      })
  }
  static check(req,res,next){
    Model.Todo
      .updateOne({
        _id: req.params.id
      },{
        status: true
      })
      .then((data) => {
        // console.log(data)
        if(data.n > 0){
          res.json({
            message: 'Successfully Updated'
          })
        }else{
          next({
            httpStatus: 404,
            message: 'Not Found!'
          })
        }
      })
  }
  static uncheck(req,res,next){
    Model.Todo
      .updateOne({
        _id: req.params.id
      },{
        status: false
      })
      .then((data) => {
        if(data.n > 0){
          res.json({
            message: 'Successfully Updated'
          })
        }else{
          next({
            httpStatus: 404,
            message: 'Not Found!'
          })
        }
      })
  }
}

module.exports = Todo;