const bcrypt = require('bcryptjs')

function hashPass(pass) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash
}

function compareHash(inputPass, saltedPass) {
    return bcrypt.compare(inputPass, saltedPass)
}

module.exports = {
    hashPass,
    compareHash
}