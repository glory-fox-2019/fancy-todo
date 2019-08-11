const jwt = require('jsonwebtoken')
const Todo = require('../models/todo-model')

function userAuthentication (req, res, next) {

    const {token} = req.headers

    if(token) {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET)
        req.currentUser = currentUser
        next()
    } else {
        next({status: 403, message: "You are not logged in"})
    }
}

function userAuthorization (req, res, next) {
    Todo.findById(req.params._id)
    .then(todo => {
        if(todo) {
                if(todo.user_id == req.currentUser._id) {
                    next()
                } else {
                    next({status: 401, message: "This todo is not yours"})
                }
            } else {
                next({status: 404, message: "todo not found"})
            }
        })
        .catch(next)
}

module.exports = {
    userAuthentication,
    userAuthorization
}