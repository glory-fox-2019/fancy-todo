const Todo = require('../models/Todo')

module.exports = (req, res, next) => {
    Todo.findOne({
        _id: req.params.id
    })
    .then(todo => {
        if (todo.owner == req.decode._id) {
            next()
        }
        else {
            res.status(400).json("You are not authorized user")
        }
    })
    .catch(next)
}