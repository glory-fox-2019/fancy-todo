const { Todo, User } = require('../models');


class ControllerTodo {
    static list(req, res) {
        Todo.find({ owner: req.headers.id })
            .populate('owner', 'email')
            .then(todos => {
                res.status(201).json(todos)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        let { title, description, duedate, owner } = req.body
        let todoCreate = ''

        Todo.create({
            title, description, duedate, owner
        })
            .then(todo => {
                todoCreate = todo
                return User.findOne({ id })
            })
            .then(data => {
                res.status(201).json(todoCreate)
            })
            .catch(err => {
                res.status(400).json({msg: err})
            })
    }

    static findOne(req, res) {
        Todo
            .findOne({
                name: req.params.name
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let id = req.params.id
        let object = {}

        object.keys(req.body).foreach(el => {
            object[el] = req.bodi[el]
        })
        todo.findOneAndUpdate({ _id: id }, object, { new: true })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        let id = req.params.id

        Todo.findOneAndDelete({ _id: id })
            .then(data => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static search(req, res) {
        let stepSearch = `^${req.query.name}`

        Todo
            .find({
                $and: [
                    { name: { $ragex: `${stepSearch}`, $options: i } },
                    { owner: req.headers.id }
                ]
            })
            .then(data => {
                // console.log(all);
                res.status(200).json(data)
            })
            .catch(err=> {
                res.status(400).json({'msg': err})
            })
    }
}

module.exports = ControllerTodo