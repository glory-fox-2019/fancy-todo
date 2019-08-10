const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
    name : String,
    email : String,
    password : String,
    birthday_date : Date,
    todo : [
        {
            type : ObjectId,
            ref : 'Todo'
        }
    ]

})

const model =  mongoose.model('User', User)
module.exports = model;