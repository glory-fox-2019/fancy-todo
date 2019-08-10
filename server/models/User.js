const mongoose = require('mongoose');
const generateHash = require('../helpers/bcrypt').generateHash
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username can't be empty"]
    },
    password: {
        type: String,
        required: [true, "password can't be empty"],
        minlength: [6, "Password min 6 characters"]
    },
    email: {
        type: String,
        required: [true, "email can't be empty"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: {
            validator: function (value) {
                return new Promise((resolve, reject) => {
                    User.findOne({
                        email: value,
                        _id: {
                            $ne: this._id
                        }
                    })
                    .then(found => {
                        if (found) {
                            resolve(false)
                        }
                        else {
                            resolve(true)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
                })
            },
            message: "Email has been used"
        }
    }
},{
    versionKey: false
})

userSchema.pre('save', function () {
    this.password = generateHash(this.password)
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User