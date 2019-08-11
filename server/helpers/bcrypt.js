const bcrypt = require('bcrypt')

const salt = bcrypt.genSaltSync(10)

function createPassword(password){
    return bcrypt.hashSync(password,salt)
}

function verifyPassword(password,hashPassword){
    return bcrypt.compareSync(password,hashPassword)
}

module.exports = { createPassword, verifyPassword}