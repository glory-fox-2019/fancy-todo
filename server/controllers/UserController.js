const User = require('../models/User')
const comparePassword = require('../helpers/bcrypt').comparePassword
const generateToken = require('../helpers/jwt').generateToken
const {OAuth2Client} = require("google-auth-library");
const CLIENT_ID = process.env.client_id
const client = new OAuth2Client(CLIENT_ID)
class UserController {
    static create(req, res, next) {
        User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        .then(created => {
            res.status(200).json("Sucessfully Register !")
        })
        .catch(next)
    }

    static signIn (req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
        .then(user => {
            if (!user) {
                throw {
                    status: 404,
                    message: "username / password wrong"
                }
            }
            else {
                if (comparePassword(password, user.password)) {
                    const payload = {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }
                    const token = generateToken(payload)
                    res.status(201).json({token, username: user.username})
                }
                else {
                    throw {
                        status: 404,
                        message: "username / password wrong"
                    }
                }
            }
        })
        .catch(next)
    }

    static googleSignIn(req, res, next) {
        let data = {}
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: CLIENT_ID
        })
        .then(response => {
            data.username = response.payload.name;
            data.email = response.payload.email;
            return User.findOne({
                email: data.email
            })
        })
        .then(result => {
            if (!result) {
                return User.create({
                    username: data.username,
                    email: data.email,
                    password: process.env.SECRET_PASSWORD
                })
            }
            else {
                return result
            }
        })
        .then(user => {
            if (comparePassword(process.env.SECRET_PASSWORD,user.password)){
                const payload = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
                const token = generateToken(payload)
                res.status(200).json({
                    token,
                    username: user.username
                })
            }
            else {
                throw {
                    status: 404,
                    message: "username / password wrong"
                }
            }
        })
        .catch(next)
    }
}

module.exports = UserController