const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter todo name"]
    },
    description: {
        type: String,
        required: [true, "Please enter description"]
    },
    completed: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    due_date: {
        type: Date,
        required: [true, "Please enter deadline"]
    }
}, {
    timestamps: true,
    versionKey: false
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo