if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  require('dotenv').config();
}
const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT;
const authentication = require('./middlewares/authentication');

app.use(cors());

app.use(express.urlencoded({extended:false}));
app.use(express.json({}));

mongoose.connect('mongodb://localhost:27017/task_fancytodo', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/task_hacktivgit', {useNewUrlParser: true});

app.use('/api/user', routes.user);

app.use(authentication)
app.use('/api/todos', routes.todo);
app.use('/api/photos', routes.photo);

app.use(function(err,req,res,next){
  console.log(err);
  res.status(err.httpStatus || 500)
    .json({error: err.message});
});

app.listen(port,() => console.log(`Successfully Connected to PORT: ${port}`));
