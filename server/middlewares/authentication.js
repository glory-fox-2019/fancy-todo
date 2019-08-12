const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    if(req.headers.token){
        const decoded = verify(req.headers.token)
        if(decoded !== Error){
            req.decoded = decoded
            next()
        } else {
            next({ code: 400, message: 'Invalid token' })
        }
        
    } else {
        next({ code: 400, message: 'No token' })
    }
}