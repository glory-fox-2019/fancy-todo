const jwt = require('jsonwebtoken')
const Todo = require('../models/todo-model')

function userAuthentication (req, res, next) {
    console.log(req.headers, "ini req headers")
    const {token} = req.headers
    console.log(token, "ini token")
    const currentUser = jwt.verify(token, process.env.JWT_SECRET)
    console.log(currentUser)
    if(currentUser) {
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
            console.log(req.currentUser._id, "dan", todo.user_id)
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