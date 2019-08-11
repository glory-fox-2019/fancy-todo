if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = 3000;
const {
    errorHandler
} = require('./middlewares/errorHandler')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fancy-todo', {
    useNewUrlParser: true
});

const cors = require('cors')
const auth = require('./middlewares/auth')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const userRoute = require('./routes/user-router')
const todoRoute = require('./routes/todo-route')
const projectRoute = require('./routes/project-route')
const thirdApiRoute = require('./routes/thirdApi-route')

app.use('/users', userRoute)

app.use(auth.authentication)

app.use('/todos', todoRoute)
app.use('/projects', projectRoute)
app.use('/thirdApi', thirdApiRoute)

app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}`))