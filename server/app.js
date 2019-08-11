if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/fancy_todo', {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


// ROUTE 
const user = require('./routes/user');
app.use('/user', user);
const todo = require('./routes/todo');
app.use('/todo', todo);

app.listen(3000, () => {
  console.log(`Server >>>>>> 3000!`)
});