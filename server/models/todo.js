const mongoose = require('mongoose')

const {Schema} = mongoose

const todoSchema = new Schema ({
  name: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    default: new Date()
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo