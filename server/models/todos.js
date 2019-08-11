const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: String,
    description: String,
    creator:  { 
        type : Schema.Types.ObjectId,
        ref: `User`
    },
    password: String,
    isFinised: Boolean,
    due_date: Date
})

var Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo