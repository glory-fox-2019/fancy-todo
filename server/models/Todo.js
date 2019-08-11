const mongoose = require('./connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const todoSchema = new mongoose.Schema({
  title : {
    type : String,
    required : [true, 'Title is required'],
    minlength : [5, 'Title must be 5 or more characters'],
    maxlength : [40, 'Title must be 40 or less characters']
  },
  description : {
    type : String,
    minlength : [5, 'Description must be 5 or more characters'],
    maxlength : [100, 'Description must be 100 or less characters']
  },
  deadline : {
    type : Date,
    required : [true, 'Deadline required'],
    validate: {
      validator :
        function(v) {
          const now = new Date()
          v = new Date(v)
          
          const diffTime = v.getTime() - now.getTime()
          const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          if(diffDay < 0) {
            return false
          }else{
            return true
          }
        },
      message : `Invalid Date`
    }
  },
  status : {
    type : String,
    default : 'Belum Selesai' //Belum Selesai | Selesai | Over
  },
  idUser : {
    type : ObjectId,
    ref : 'User'
  }
})
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo