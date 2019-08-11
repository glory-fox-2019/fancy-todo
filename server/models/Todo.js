const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  title: {
    type:'string',
    required: true,
  },
  description: 'string',
  thumbnail: 'string',
  tag: 'array',
  status: {
    type:'boolean',
    required: true,
  },
  dueDate: 'date',
});

const Todo = mongoose.model('Todos',todoSchema);

module.exports = Todo;