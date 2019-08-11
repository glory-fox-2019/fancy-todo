const User = require('../model/user');
const { generateToken } = require('../helper/jwt');
const { checkPassword } = require('../helper/bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


class UserController {

    static login(req, res, next) {
        console.log(req.body)
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                console.log(user)
                if (user) {
                    if (checkPassword(req.body.password, user.password)) {
                        let payload = {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        }
                        let token = generateToken(payload)
                        res.status(200).json({
                            token,
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        })
                    }
                    else {
                        throw { code: 404, message: "wrong email/password" }
                    }
                }
                else {
                    throw { code: 404, message: "wrong email/password" }
                }
            })
            .catch(next)
    }


    static register(req, res, next) {
        let { name, email, password } = req.body
        User.create({ name, email, password })
            .then((user) => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {
        // console.log(req.body.idToken)
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(function (ticket) {
                // console.log(ticket)
                let { name, email } = ticket.getPayload();
                let password = process.env.DEFAULT_PASSWORD;
                let input = { name, email, password };
                return Promise.all([User.findOne({
                    email: email
                }), input])
            })
            .then(function ([foundUser, input]) {
                // console.log(foundUser);
                if (foundUser) {
                    return foundUser
                } else {
                    // console.log(`test`)
                    return User.create(input)
                }
            })
            .then(function (user) {
                // console.log(user, `ini data user`)
                let payLoad = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                };
                let token = generateToken(payLoad)
                // console.log(payLoad);
                let data = {
                    token,
                    _id: user._id,
                    name: user.name,
                    email: user.email
                };
                res.status(201).json(data)
            })
            .catch(next)
    }


}

module.exports = UserController;