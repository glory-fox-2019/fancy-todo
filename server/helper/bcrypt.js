const bcrypt = require('bcryptjs');

module.exports = {
    generatePassword(password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password , salt);
        return hash;
    }
    ,
    checkPassword(password, hash){
        return bcrypt.compareSync(password, hash);
    }
}