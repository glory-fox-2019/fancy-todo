// if (process.env.NODE_ENV == 'development') {
//     require('dotenv').config()
// }
const dotenv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


mongoose.connect('mongodb://localhost:27017/fancy-todo', {useNewUrlParser: true})
.then(() => {
    console.log('mongo connected')
})
.catch((err) => {
    console.log(err)
})


const todo = require('./routes/todos')
const user = require('./routes/user')
app.use('/todos', todo)
app.use('/users', user)

function errorHandler (err, req, res, next) {
    console.log(err)
    res.status(500).json({
        message: 'Internal server error'
    })
}
app.use(errorHandler)

app.listen(port, () => console.log(`Hello from port : ${port}! 😙`))