const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  hashPassword(password){
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  compareSync(password,hash){
    return bcrypt.compareSync(password,hash); 
  }
}