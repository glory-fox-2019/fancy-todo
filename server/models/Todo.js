const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Todo = new Schema({
    name : {type: String, required:true},
    description :{type: String, require:true },
    status :{type:Boolean},
    due : Date,
    user : {
        type : ObjectId,
        ref : 'User'
    }

})

const model =  mongoose.model('Todo', Todo)
module.exports = model;