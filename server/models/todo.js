const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./user')

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: String,
    due_date: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                let currentDate = new Date()
                if (v.getTime() < currentDate.getTime()) {
                    return false
                } else {
                    return true
                }
            },
            message: 'Due date cannot before current date.'
        }
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ProjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
})

todoSchema.post('deleteOne', function (v) {
    User.remove({
        todos: this.getQuery()
    })
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;