if(process.env.NODE_ENV === "development") {
  require('dotenv').config()
}
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3200;
const errHandling = require('./middlewares/errorHandler')
const cors = require('cors')
mongoose.connect('mongodb://localhost:27017/todo_db', {useNewUrlParser:true})
.then(()=> {
  console.log('Database connected')
})
.catch(err => {
  console.log('Database failed to connect')
})
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', routes);
app.use(errHandling)
app.listen(port, function() {
console.log('App listening on port', port);
})