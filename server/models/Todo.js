const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TodoSchema = new Schema({
    name: {
        type: String,
        required: [true, "Todo Name cannot be empty"]
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty"]
    },
    status: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date cannot be empty"]
    },
    UserId: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    }
}, {timestamps: true})

let Todo = mongoose.model('Todo',TodoSchema)

module.exports = Todo