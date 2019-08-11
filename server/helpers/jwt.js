const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (payload) => { 
    return jwt.sign(payload, process.env.JWT_KEY);
  },
  decodeToken(token){
    return jwt.verify(token, process.env.JWT_KEY);
  }
}