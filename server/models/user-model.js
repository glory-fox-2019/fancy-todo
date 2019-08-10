const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loginType: {
        type: String,
        default: 'normal' // check if via google or normal login
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = mongoose.model(User)