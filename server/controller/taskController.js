const Task = require('../model/task');

class TaskController {

    static findAll(req, res, next) {
        // console.log(req.query.id, `ini di findAll`)
        const UserId = req.query.id
        Task.find({
            UserId
        })
            .then(function (tasks) {
                res.status(200).json(tasks)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        // console.log(req.query);
        Task.findOne({
            _id: req.query.taskId,
            UserId: req.query.UserId
        })
            .then(function (task) {
                res.status(200).json(task)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { UserId, name, description, dueDate } = req.body;
        // console.log(req.body);
        Task.create({
            UserId,
            name,
            description,
            dueDate: new Date(dueDate),
            status: false
        })
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const taskId = req.params.id;
        const UserId = req.body.UserId;
        // console.log(taskId);
        // console.log(req.body);
        Task.deleteOne({
            _id: taskId,
            UserId
        })
            .then(function (data) {
                res.status(200).json(data);
                // console.log(`sukses delete`)
            })
            .catch(next)

    }

    static changeStatus(req, res, next) {
        const taskId = req.params.id;
        const UserId = req.body.UserId;
        Task.findOne({
            _id: taskId,
            UserId
        })
            .then(function (task) {
                if (task.status === true) {
                    return Task.updateOne({
                        _id: taskId,
                        UserId
                    }, {
                            status: false
                        })
                } else {
                    return Task.updateOne({
                        _id: taskId,
                        UserId
                    }, {
                            status: true
                        })
                }
            })
            .then(function (data) {
                res.status(201).json(data);
            })
            .catch(next)
    }

    static edit(req, res, next) {
        // console.log(req.body);
        const { taskId, UserId, name, description, dueDate } = req.body;
        // console.log(req.body)
        Task.updateOne({
            _id: taskId,
            UserId
        }, {
                name,
                description,
                dueDate
            })
            .then(function (data) {
                res.status(201).json(data);
            })
            .catch(next)
    }
}

module.exports = TaskController;