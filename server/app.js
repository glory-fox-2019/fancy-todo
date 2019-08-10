if(!process.env.NODE_ENV || process.env.NODE_ENV==='development'){
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000
mongoose.connect("mongodb://localhost:27017/fancyTodoApp", {useNewUrlParser: true})

const userRouter = require('./routes/user-router')
const todoRouter = require('./routes/todo-router')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/user', userRouter)
app.use('/todo', todoRouter)

app.get('/', (req, res) => {
    res.json({message: "yow"})
})

app.use((err, req, res, next) => {
    console.log(err)
    if(!err.status) {
        err.status = 500
    }
    res.status(err.status).json({message: err.message})
})

app.listen(PORT, () => console.log(`listening to port ${PORT}`))