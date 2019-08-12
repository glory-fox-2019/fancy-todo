const mongoose = require('mongoose')

const {Schema} = mongoose
const {hashPassword} = require('../helpers/bcrypt')

const userSchema = new Schema ({
  name: {
    type: String
  },
  email: {
    type: String,
    required: 'Email address is required',
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
  },
  password: {
    type: String
  }
})

userSchema.pre('save', function(next, data) {
  this.password = hashPassword(this.password)
  next()
})

let User = mongoose.model('User', userSchema)

module.exports = User