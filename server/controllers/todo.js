const Model = require('../models');

class Todo {
  static findAll(req,res,next){
    let whereData = {}
    if(req.query.search){
      whereData.title = { $regex: new RegExp(req.query.search.toLowerCase(), "i")
    };}
    Model.User
      .findOne({
        username: req.decode.username
      })
      .populate({
        path: 'todos',
        match: whereData
      })
      .then(({todos}) => {
        res.status(200).json(todos);
      })
      .catch(next);
  }
  static findOne(req,res,next){
    Model.User
      .findOne({
        username: req.decode.username
      })
      .populate({
        path: 'todos',
        match: {
          _id: req.params.id
        }
      })
      .then(({todos}) => {
        if(todos) res.json(todos[0]); 
        else{
          next({
            httpStatus: 404,
            message: 'Not Found!'
          })
        }
      })
      .catch(next);
  }
  static create(req,res,next){
    let todoData;
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
        todoData = data;
        return Model.User
          .findOneAndUpdate({
            username: req.decode.username
          },{
            $push: {todos: data._id}
          })
      })
      .then((data) => {
        res.status(201).json(todoData);
      })
      .catch(next)
  }
  static edit(req,res,next){
    console.log(req.body)
    let input = {"$set": {}};
    req.body.title && (input.title = req.body.title)
    req.body.dueDate && (input.dueDate = req.body.dueDate)
    req.body.description && (input.description = req.body.description)
    req.body['tag[]'] && (input.tag = req.body['tag[]'])
    input.thumbnail = req.body.thumbnail

    Model.User
      .findOne({
        username: req.decode.username,
      })
      .populate({
        path: 'todos',
        match: {
          _id:req.params.id
        }
      })
      .then((data) => {
        if(data){
          return Model.Todo
            .findOneAndUpdate({
              _id:req.params.id
            },input, { new: true})
        }else{
          next({httpStatus:404,message:'Todo is not found'})
        }
      })
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch(next)
  }
  static delete(req,res,next){
    Model.User
    .findOne({
      username: req.decode.username,
    })
    .populate({
      path: 'todos',
      match: {
        _id:req.params.id
      }
    })
    .then(data => {
      if(!data) next({httpStatus: 404, message: 'Not Found'})
      return Model.Todo
        .deleteOne({_id: req.params.id})
    })
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
    Model.User
      .findOne({
        username: req.decode.username,
      })
      .populate({
        path: 'todos',
        match: {
          _id:req.params.id
        }
      })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Not Found'}); 
        return Model.Todo
        .updateOne({
          _id: req.params.id
        },{
          status: true
        })
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
  static uncheck(req,res,next){
    Model.User
    .findOne({
      username: req.decode.username,
    })
    .populate({
      path: 'todos',
      match: {
        _id:req.params.id
      }
    })
    .then(data => {
      if(!data) next({httpStatus: 404, message: 'Not Found'}); 
      return Model.Todo
      .updateOne({
        _id: req.params.id
      },{
        status: false
      })
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