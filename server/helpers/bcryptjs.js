const bcryptjs = require('bcryptjs')

module.exports = {
    encrypt(password) {
        return bcryptjs.hashSync(password, 15)
    },
    compare(password, hash) {
        return bcryptjs.compareSync(password, hash)
    } 
}