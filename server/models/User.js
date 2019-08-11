const mongoose = require('./connection')
const ObjectId = mongoose.Schema.Types.ObjectId
const bcrypt = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : [true, 'First Name required'],
    minlength : [2, 'First Name minimal 2 Character'],
    match : [/^[a-zA-Z]+$/, 'Only alphabet are allowed for firstname']
  },
  lastName : {
    type : String,
    required : [true, 'Last Name required'],
    minlength : [2, 'Last Name minimal 2 character'],
    match : [/^[a-zA-Z]+$/, 'Only alphabet are allowed for lastname']
  },
  email : {
    type : String,
    required : [true, 'Email required'],
    match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
, 'Invalid email address']
  },
  password : {
    type : String,
    required : [true, 'Password required']
  },
  todos : [{
    type: ObjectId,
    ref : 'Todos'
  }]
})

userSchema.pre('save', function() {
  this.password = bcrypt.hash(this.password)
})


const User = mongoose.model('User', userSchema)


module.exports = User