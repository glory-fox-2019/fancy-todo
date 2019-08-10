const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v)
            },
            message: "This email is not valid"
        }
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    loginType: {
        type: String,
        default: 'normal' // check if via google or normal login
    }
})

const User = mongoose.model('User', UserSchema)

User.schema.path('email').validate(function(value, next) {
    return new Promise(function (resolve, reject) {
        User.findOne({email: value})
            .then(member => {
                if(member && this._id !== member._id) {
                    reject(new Error("This email is in use"))
                } else {
                    resolve()
                }
            })
            .catch(err => {throw err})

    })
})

module.exports = User