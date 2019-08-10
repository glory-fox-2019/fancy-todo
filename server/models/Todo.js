const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Todo = new Schema({
    name : String,
    description : String,
    status : Boolean,
    due : Date,
    user : {
        type : ObjectId,
        ref : 'User'
    }

})

const model =  mongoose.model('Todo', Todo)
module.exports = model;