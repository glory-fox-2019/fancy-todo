const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
    isUnique: true,
  },
  password: {
    type:String,
    required: true,
  },
  email: {
    type:String,
    required: true,
    isUnique: true,
    validate: {
      validator: function(v){
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email` 
    }
  },
  todos: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Todos'
  }],
},{
  versionKey: false,
  timestamps: true
});

const User = mongoose.model('Users',userSchema);

module.exports = User;