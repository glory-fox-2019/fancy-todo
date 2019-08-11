const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    date : {
        type : Date,
        required: true
    },
    status : {
        type : Boolean,
    },
    owner : {type : Schema.Types.ObjectId, ref:'User'}
})

todoSchema.pre('save',function(){
    this.status = false;
})

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo