const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function generate(password) {
    return bcrypt.hashSync(password, 10)
}

function comparePass(password, passwordDB){
    return bcrypt.compareSync(password, passwordDB)
}

function generateJwt(userPayload) {
    return jwt.sign(userPayload, process.env.SECRET_TOKEN, {expiresIn: 'id'})
}

function verifyJwt(token) {
    return jwt.verify(token, process.env.SECRET_TOKEN)
}

module.exports = generate, comparePass, generateJwt, verifyJwt