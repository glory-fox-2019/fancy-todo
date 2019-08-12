const express = require('express')
const mongoose = require('mongoose')
const mogran = require('morgan')
const cors = require('cors');
const port = 3000
const app = express()
const errHandler = require('./middlewares/errHandler')
const routes = require('./routes/index-route')

app.use(cors())
app.use(mogran('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Check Connection
mongoose.connect('mongodb://localhost:27017/fancy-todo',  {useNewUrlParser: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connect to mongodb')
});

app.use('/', routes)
app.use(errHandler)

app.listen(port, () => console.log(`You listen on port ${port}`))