const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname : {
        type: String,
        required : [true, 'Firstname null']
    },
    lastname : {
        type: String,
        require: [true, 'Lastname null']
    },
    email : {
        type : String,
        unique : [true, 'Email already used'],
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
    },
    password : {
        type : String,
        required: true
    }
})



const User = mongoose.model('User',userSchema)

module.exports = User