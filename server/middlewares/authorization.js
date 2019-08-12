const Todo = require('../models/todo')

module.exports = (req, res, next) => {
    Todo.findById(req.params.todoId)
    .then(todo => {
        if(todo) {
            if(todo.user_id == req.decoded._id) {
                next()
            } else {
                next({ code: 401, message: "Not authorized" })
            }
        } else {
            next({ code: 401, message: 'Invalid todo id' })
        }
    })
    .catch(next)
}