const { Todo } = require('../Models')
const { TokenVerify } = require('../helpers')
const { ObjectId } = require('mongodb')
class TodoController {
    static addTodo(req, res, next) {
        console.log(req.decode.data._id , req.body)
        let { name, des , date } = req.body
        Todo.create({
            name ,  description : des , User : ObjectId(req.decode.data._id) , due_date :  new Date(date)
        })
        .then(data=>{
            console.log(req.body)
            console.log('eklwmfkewmfkewmfekwfmewkfmewkmf')
            console.log(data, ' ini isi dari data')
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static ShowTodo(req,res,next){
        // console.log(ObjectId(req.decode.data_id) , 'disini di dalam controller')
        Todo.find({
            User : req.decode.data._id
        })
        .then(todo=>{
            res.json(todo)
        })
        .catch(err=>{
            next(err)
        })
    }

    static Delete(req,res,next){
        Todo.deleteOne({
            _id : req.params.id,
            User : req.decode.data._id
        })
        .then(user=>{
            res.status(201).json({
                message : 'Berhasil menghapus'
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static completeTodo(req,res,next){
        Todo.updateOne({
            _id : req.params.id,
            User : req.decode.data._id
        },{
            status : true
        })
        .then(user=>{
            res.status(201).json({
                message : 'Berhasil Update',
                user
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    

    static UncompleteTodo(req,res,next){
        
        Todo.updateOne({
            _id : req.params.id,
            User : req.decode.data._id
        },{
            status : false
        })
        .then(user=>{
            res.status(201).json({
                message : 'Berhasil Update',
                user
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static updateDataTodo(req,res,next){
        let { name , des ,due_date  } = req.body
        console.log(req.params.id , ' ini params')
        Todo.findOneAndUpdate({
            _id : req.params.id
        },{
            name , description:  des , due_date 
        })
        .then(user=>{
            res.status(201).json({
                message : 'Berhasil Update',
                user
            })
        })
        .catch(err=>{
            next(err)
        })

    }
}

module.exports = TodoController