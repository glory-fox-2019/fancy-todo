const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const {hashPass, compareHash} = require('../helpers/passHash')

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next) {
        let registered = {}
        const newUserData = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: hashPass(req.body.password)
        }
        User.create(newUserData)
            .then(newUser => {
                registered._id = newUser._id
                registered.full_name = newUser.full_name
                registered.email = newUser.email
                return jwt.sign(registered, process.env.JWT_SECRET)
            })
            .then(token => {
                res.status(201).json({full_name: registered.full_name, token})
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
                res.json({full_name: loggedIn.full_name, token})
            })
            .catch(next)
    }

    static googleSignIn(req, res, next) {
        let thisUser = {}
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {

                thisUser.full_name = ticket.getPayload().name
                thisUser.email = ticket.getPayload().email
                thisUser.password = hashPass(process.env.PASSWORD)
                return User.findOne({
                    email: ticket.getPayload().email
                })
            })
            .then(user => {
                if(user) {
                    return user
                } else {
                    return User.create(thisUser)
                }
            })
            .then( createdUser => {
                const {_id, full_name, email} = createdUser
                return jwt.sign({_id, full_name, email}, process.env.JWT_SECRET)
            })
            .then( token => {
                res.json({full_name: thisUser.full_name, token})
            })
            .catch(next)
    }
}

module.exports = UserController