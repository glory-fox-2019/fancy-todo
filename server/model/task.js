const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    UserId:{
        type: String,
        required: [true, 'Forbidden Action, must Sign In first']
    },
    name: {
        type: String,
        maxlength: [25, `Max length of task name is 25 character`],
        required: [true, `Task name cannot be empty`]
    },
    description: {
        type: String,
        maxlength: [200, `Max length of description 200 character`],
        required: [true, `Task name cannot be empty`]
    },
    status: {
        type: Boolean,
        required: [true, `Boolean value cannot be empty`]
    },
    dueDate: {
        type: Date,
        require: [true, `Due date cannot be empty`]
    }
},{
    timestamps: true,
    versionKey: false
});

let Task = mongoose.model('Task', TaskSchema);

module.exports = Task;