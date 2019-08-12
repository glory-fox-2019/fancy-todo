const jwt = require('../helpers/jwt')
module.exports = function(req,res,next){
  try{
    const decode = jwt.decodeToken(req.headers.token);
    // console.log('test')
    req.decode = decode;
    next();
  }catch(err){
    next({httpStatus:403,message:`You're not authorized`})
  }
}