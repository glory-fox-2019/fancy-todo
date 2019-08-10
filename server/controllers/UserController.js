const User = require('../models/User')
const comparePassword = require('../helpers/bcrypt').comparePassword

class UserController {
    static create(req, res, next) {
        User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        .then(created => {
            res.status(200).json(created)
        })
        .catch(next)
    }

    static findAll(req, res, next) {
        User.find()
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
}

module.exports = UserController