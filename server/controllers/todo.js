const Todo = require('../models/todo')

class TodoController {
    static findTodo (req,res,next){
        // const {id} = req.decode
        const id = "5d4ef84266c31c5827711147"
        Todo.find({owner : id})
        .then(data=> {
            let groupDate = {};
            for(let i=0; i<data.length; i++){
                if(groupDate[data[i].date] == undefined){
                    groupDate[data[i].date] = []
                }
                const{id,title,description,status} = data[i]
                groupDate[data[i].date].push({id,title,description,status})
            }
            res.status(200).json(groupDate)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static createTodo (req,res,next){
        // const {id} = req.decode
        const {id,title,description,date} = req.body
        Todo.create({title,description,date,owner: id})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateTodo(req,res,next){
        const {id} = req.body
        let input = {};
        req.body.title && (input.title = req.body.title)
        req.body.description && (input.description = req.body.description)
        req.body.status && (input.status = req.body.status)
        Todo.findOneAndUpdate({_id: id},input,{new: true})
        .then(data => {

            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json("Internal server error")
        })
    }
}

module.exports = TodoController