const jwt = require('jsonwebtoken')

module.exports = {
    sign(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY)
    },
    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
}