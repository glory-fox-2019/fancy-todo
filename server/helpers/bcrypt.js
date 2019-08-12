const {genSaltSync, hashSync, compareSync} = require('bcryptjs')

module.exports = {
  hashPassword(password) {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt);

    return hash
  },

  checkPassword(password, hash) {
    return compareSync(password, hash);
  }
}