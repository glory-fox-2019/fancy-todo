const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generatePassword } = require('../helper/bcrypt');

let UserSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name cannot be empty`]
    },
    email: {
        type: String,
        validate: [{
            validator: function validateEmailFormat(email) {
                let checkFormat = /\S+@\S+\.\S+/;
                return checkFormat.test(email);
            },
            message: props => `${props.value} is an invalid email format`
        }, {
            validator: function checkUnique(email) {
                return User.findOne({ emal: this.email })
                    .then(function (user) {
                        if (user) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                    .catch(function (err) {
                        return false;
                    })
            },
            message: props => `Email ${props} already registered`
        }],
        required: [true, 'email cannot be emtpy']
    },
    password: {
        type: String,
        minlength: [8, `Password minimum length is 8`],
        required: [true, `Password cannot be empty`]
    }
},{
    timestamps: true,
    versionKey: false
});

UserSchema.pre('save', function(next) {
    this.password = generatePassword(this.password);
    // console.log(this.password)
    // console.log(this.name)
    // console.log(this.email)
    next();
});

let User = mongoose.model('User', UserSchema);

module.exports = User;