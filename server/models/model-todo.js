const mongoose = require('mongoose');
const Schema = mongoose.Schema

const todoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User' // sesuai sama model
    },
    title: {
        type: String,
        required: [true, 'Title tidak boleh kosong']
    },
    description: {
        type: String,
        require: [true, 'Deskripsi tidak boleh kosong']
    },
    status: {
        type: Boolean,
    },
    duedate: {
        type: Date,
        required: [true, 'Due date harus di isi']
    }
}, { timestamps: true })

todoSchema.pre('save', function (next, done) {
    this.status = false
    next()
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo


