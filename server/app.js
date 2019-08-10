require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')
const errHandler = require('./middlewares/errhandler')
const PORT = 3000;
const app = express()

mongoose.connect('mongodb://localhost:27017/fancy-todo', {useNewUrlParser: true}, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Successfully connected to database")
    }
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/home', routes)

app.use(errHandler)

app.listen(PORT, function () {
    console.log(`LISTENING TO PORT ${PORT}`)
})


