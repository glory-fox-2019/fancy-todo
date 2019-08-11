const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project;