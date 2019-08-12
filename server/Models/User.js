const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {  HashingPassword } = require('../helpers')

const UserSchema = new Schema({
  name : {
      type : String
  },
  password : {
      type : String
  }, 
  email : {
    type : String
  },
  Todos : [
    {
      type : Schema.Types.ObjectId ,  ref : 'Todo'
    }
  ]
});
// const UserSchema = new Schema({
//   name : {
//       type : String
//   },
//   description : {
//       type : String
//   }, 
//   status : {
//     type : String
//   }, 
//   due_date : {
//       type : Date
//   }
// });

UserSchema.pre('save' , function(next,data){
    // this.
    this.password = HashingPassword(this.password)
    next()
})

const User = mongoose.model('User' , UserSchema)
module.exports = User