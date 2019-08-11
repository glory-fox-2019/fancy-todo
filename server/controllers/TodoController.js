const Todo = require('../models/Todo')
const moment = require("moment")
class TodoController {
    static create(req, res, next) {
        const { name, description, due_date } = req.body
        const owner = req.decode._id
        Todo.create({
            name,
            description,
            due_date,
            owner
        })
        .then(created => {
            res.status(201).json("Successfully create Activity :)")
        })
        .catch(next)
    }

    static findAll(req, res, next) {
        Todo.find({
            owner: req.decode._id
        }).populate('owner', 'username')
        .then(list => {
            let arrayOfList = []
            let status;
            for(let i = 0; i < list.length; i++){
                if (list[i].status == false) {
                    status = "Pending"
                }
                else {
                    status = "Done"
                }
                let obj = {
                    name: list[i].name,
                    description: list[i].description,
                    _id: list[i]._id,
                    due_date: moment(list[i].due_date).format("YYYY-MM-DD"),
                    status
                }
                arrayOfList.push(obj)
            }
            res.status(200).json(arrayOfList)
        })
        .catch(next)
    }

    static update(req, res, next) {
        Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static destroy(req, res, next) {
        Todo.findByIdAndDelete(req.params.id)
        .then(deleted => {
            res.status(200).json({
                name: deleted.name,
                description: deleted.description,
                status: "deleted"
            })
        })
        .catch(next)
    }
}

module.exports = TodoController