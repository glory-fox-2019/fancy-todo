let date = new Date();
date.setDate( date.getDate() - 1 )

const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },
  description: String,
  thumbnail: String,
  tag: Array,
  status: {
    type:Boolean,
    required: true,
  },
  dueDate: {
    type:Date,
    min: date,
  },
},{
  versionKey: false,
  timestamps: true
});

const Todo = mongoose.model('Todos',todoSchema);

module.exports = Todo;