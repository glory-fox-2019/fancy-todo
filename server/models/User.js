const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
    name : {type: String, required:true},
    email : {type: String, required:true, unique:true},
    password : {type: String, require:true},
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