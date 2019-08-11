const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    fullName: String,
    username: String,
    email: String,
    password: String,
    todos : [{
        type : Schema.Types.ObjectId,
        ref: 'todo'
    }]
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

var User = mongoose.model('User', userSchema)
module.exports = User