const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema({
  name : {
      type : String,
      required : true
  },
  description : {
      type : String
  }, 
  status : {
    type : Boolean,
    default : false
  }, 
  due_date : {
    type : Date,
    default : new Date(),
    required : true
  },
  User : {
    type :  Schema.Types.ObjectId , ref : 'User'
  }
});


const Todo = mongoose.model('Todo' , TodoSchema)
module.exports = Todo