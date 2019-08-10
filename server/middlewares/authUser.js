const jwt = require('jsonwebtoken')
const { userAuthentication, userAuthorization } = require('../middlewares/authUser')

function userAuthentication (req, res, next) {
    const {token} = req.headers.token
    const aaa = jwt.verify(token, process.env.JWT_SECRET)
}

function userAuthorization (req, res, next) {

}

module.exports = {
    userAuthentication,
    userAuthorization
}