const jwt = require('jsonwebtoken')

module.exports = {
  createToken(payload) {
   //  console.log(jwt.sign(payload, process.env.JWT_SECRET_KEY), 'kmkmskdmskdmskdmskdmskdmskdmskdmskdmskdmskm');
    return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`)
 },
 verifyToken(token) {
    return jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)
 }
}