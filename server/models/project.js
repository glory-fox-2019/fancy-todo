const { Schema, model, ObjectId } = require('mongoose')

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please fill in Project Name']
    },
    todos: [{ type: ObjectId, ref: 'Todo' }],
    users: [{ type: ObjectId, ref: 'User' }]
})

module.exports = model('Project', projectSchema)