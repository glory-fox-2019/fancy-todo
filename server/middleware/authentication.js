const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    req.body.user = {
      id : decoded.id,
      email : decoded.email,
      name : decoded.name
    }
    next()
  }catch(err){
    if(err.message === 'jwt must be provided') {
      next({
        status : 401,
        message : ['Anda belum login']
      })
    }else{
      next(err)
    }
  }
}

module.exports = authentication