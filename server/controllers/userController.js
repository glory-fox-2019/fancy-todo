const User = require('../models/user')
const {checkPassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')

class UserController {
  // 5d506d6326aea4214af6ec3b
  static signup(req, res, next) {
    const {name, email, password} = req.body
    User.create({name, email, password})
    .then(users => {
      res.status(201).json(users)
    })
    .catch(next) 
  }

  static signin(req, res, next) {
    const {email,password} = req.body
    User.findOne({
      email
    })
    .then(users => {
      if(users) {
        if(checkPassword(password, users.password)) {
          const payload = {
            id: users._id,
            name: users.name,
            email: users.email
          }
          const token = createToken(payload)
          res.status(201).json({
            token,
            message: 'success login'
          })
        } else {
          res.status(403).json({
            message: 'Email or password not found'
          })
        }
      } else {
        res.status(403).json({
          message: 'Email or password not found'
        })
      }
    })
    .catch(err => console.log(err))
  }
}


module.exports = UserController