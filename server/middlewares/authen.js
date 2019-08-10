const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        req.decode = jwt.verify(req.headers.token, process.env.secret_key)
        next()
    }
    catch (err) {
        res.status(400).json("please login first")
    }
}