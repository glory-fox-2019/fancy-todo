const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')
const todoSchema =  new Schema({
    name: {
        type: String
    },
    description: {
        type: String,
        required: [true, "description can't be blank"],
        maxlength: [100, "maximum description 100 characters"]
    },
    status: {
        type: Boolean,
        default: false
    },
    due_date: {
        type: Date,
        validate: {
            validator: function(value) {
                const today = moment()
                const dueDate = moment(value)
                if (dueDate < today) {
                    return false
                }
                else {
                    return true
                }
            },
            message: "your due date less than today"
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo