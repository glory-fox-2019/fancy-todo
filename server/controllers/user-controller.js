const axios = require('axios')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res, next) {
        res.json(req.body)
    }

    static getLogin(req, res, next) {
        res.json(req.body)
    }

    static googleSignIn(req, res, next) {

    }
}

module.exports = UserController