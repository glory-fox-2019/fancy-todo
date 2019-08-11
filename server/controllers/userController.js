require('dotenv').config()
const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const { hashPassword } = require('../helpers/hash')
const { generateToken } = require('../helpers/token')

class UserController {
    static signIn(req, res, next) {
        let user = {}
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            user.name = ticket.getPayload().name,
            user.email = ticket.getPayload().email,
            user.picture = ticket.getPayload().picture
            return User.findOne({email: user.email})
        })
        .then(foundUser => {
            if (!foundUser) {
                user.password = hashPassword(process.env.PASSWORD)
                return User.create({
                    name: user.name,
                    email: user.email,
                    password: user.password
                })
            } else {
                return foundUser
            }
        })
        .then(loggedUser => {
            const token = generateToken(loggedUser.email)
            const { _id } = loggedUser
            const { name, email, picture } = user
            res.json({ _id, name, email, picture, token})
        })
        .catch(next)
    }
}

module.exports = UserController