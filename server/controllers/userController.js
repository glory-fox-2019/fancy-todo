const User = require('../models/User')
const Todo = require('../models/Todo')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const randomPassword = require('../helpers/randomPassword')
class UserController {

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      email : email
    })
    .then(user => {
      if(user) {
        if(bcrypt.check(password, user.password)){
          
          //Generate Token
          const token = 
          jwt.sign({
            id : user._id,
            email : user.email,
            name : user.firstName
          }, process.env.SECRET_KEY,
          {
            expiresIn : 60 * 60
          })
          res.json({
            token
          })
          
        }else{
          next({
            status : 403,
            message : ['wrong email/password']
          })
        }
      }else{
        next({
          status : 404,
          message : ['wrong email/password']
        })
      }
    })
    .catch(next)
  }

  static signUp(req, res, next) {
    const { firstName, lastName, email, password } = req.body

    User.findOne({
      email
    })
    .then(user => {
      if(!user){
        return User.create({
          firstName,
          lastName,
          email,
          password
        })
      }else{
        throw {
          status : 400,
          message : ['Email sudah terdaftar']
        }
      }
    })
    .then(data => {
      res.status(201).json({
        message : `User created successfully`,
        data : data
      })
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        let errors = []
        for(let key in err.errors) {
          errors.push(err.errors[key].message)
        }
        next({
          status : 400,
          message : errors
        })
      }else{
        next(err)
      }
    })
  }

  static dashboard(req, res, next) {
    Todo.find({
      idUser : req.body.user.id
    })
    .then(data => {
      res.json({
        data,
        name : req.body.user.name
      })
    })
    .catch(next)
  }

  static signinGoogle(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_KEY)
    const ticket = client.verifyIdToken({
      idToken : req.headers.token,
      audience : process.env.GOOGLE_KEY
    })
    .then(data => {
      return User.findOne({
        email : data.payload.email
      })
    })
    .then(user => {
      if(user) {
        return new Promise((resolve, reject) => {
          resolve(user)
        })
      }else{
        return User.create({
          firstName : data.payload.given_name,
          lastName : data.payload.family_name,
          email : data.payload.email,
          password : randomPassword()
        })
      }
    })
    .then(user => {
      const token = 
      jwt.sign({
        id : user._id,
        email : user.email,
        name : user.firstName
      }, process.env.SECRET_KEY,
      {
        expiresIn : 60 * 60
      })
      res.json({
        token
      })
    })
    .catch(next)
  }
}


module.exports = UserController