const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const {hashPass, compareHash} = require('../helpers/passHash')

class UserController {
    static register(req, res, next) {
        const newUserData = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: hashPass(req.body.password)
        }
        User.create(newUserData)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        let loggedIn = {}
        const {email, password} = req.body
        User.findOne({email})
            .then(user => {
                if(user) {
                    if(compareHash(password, user.password)) {
                        loggedIn._id = user._id
                        loggedIn.full_name = user.full_name
                        loggedIn.email = user.email
                        return jwt.sign(loggedIn, process.env.JWT_SECRET)
                    } else {
                        next({status: 403, message: "Wrong email / password"})
                    }
                } else {
                    next({status: 403, message: "Wrong email / password"})
                }
            })
            .then(token => {
                res.json({token})
            })
            .catch(next)
    }

    static googleSignIn(req, res, next) {

    }
}

module.exports = UserController