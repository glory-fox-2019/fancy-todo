const bcrypt = require('bcryptjs')

class Bcryptjs {
  static hash(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  static check(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}


module.exports = Bcryptjs