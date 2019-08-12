const axios = require('axios')
const Todo = require('../models/Todo')

class ControllerTodos{
    static create(req,res,next){
        const {name,description,due} = req.body
        Todo.create({
            name,
            description,
            status :false,
            due,
            user : req.decoded._id
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }   

    static read(req,res,next){
        Todo.find({user: req.decoded._id})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static findOne(req,res,next){
        Todo.findById(req.params.id)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static update(req,res,next){
        let obj = {}
        const {name,status,description,due} = req.body
        if(name) obj.name = name
        if(status) obj.status = status
        if(description) obj.description =description
        if(due) obj.due = due
        console.log(req.params.id);
        Todo.where('_id',req.params.id).update(obj)
        .then((data)=>{
            console.log(data);
            res.json({message: "data is updated"})
        })
        .catch(err=> next(err))
    }

    static delete(req,res,next){
        Todo.deleteOne({_id:req.params.id})
        .then(()=>{
            res.json({message:"data is deleted"})
        })
        .catch(err=>{
            next(err)
        })
    }

    static holiday(req,res,next){
        axios.get('https://date.nager.at/api/v2/nextpublicholidays/ID')
        .then(({data})=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }


     

}

module.exports = ControllerTodos