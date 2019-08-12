const {verifyToken} = require('../helpers/jwt')
module.exports = {
  authentication(req, res, next) {
    console.log(req.headers.token);
    if(req.headers.token) {
      let decoded = verifyToken(req.headers.token)
      req.decoded = decoded
      next()
    } else {
      next({code: 400, message: 'anda tidak memiliki akses'})
    }
  }
}