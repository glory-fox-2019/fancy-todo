const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type:'string',
    required: true,
    isUnique: true,
  },
  password: {
    type:'string',
    required: true,
  },
  email: {
    type:'string',
    required: true,
    isUnique: true,
    validate: {
      validator: function(v){
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email` 
    }
  },
  todo: {
    type:'array',
  },
});

const User = mongoose.model('Users',userSchema);

module.exports = User;