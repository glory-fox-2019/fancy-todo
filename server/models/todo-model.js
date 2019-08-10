const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    due_date: {
        type: Date
    }
}, {
    versionKey: false
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo