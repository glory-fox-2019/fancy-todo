if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    const env = require('dotenv').config()
}

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT; 
const { AuthRouter , TodoRouter } = require('./Routers');

app.use(express.json())
mongoose.connect('mongodb://localhost:27017/fancy-todo', {useNewUrlParser: true},()=>{
    console.log('mongodb is connected');
});

app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.listen(port,()=>{
    console.log('listening to port ',port);
})

app.use(cors()) 
app.get('/',(req,res,next)=>{
    res.send('HOME OF API')
})

app.use('/user' , AuthRouter)
app.use('/todo' ,  TodoRouter)

app.use(function (err, req, res, next) {
    console.log(err.name)
    if(err.name == 'ValidationError'){
        res.status(400).json({
            message : err
        })
    }else {
        res.status(500).send({message:'Internal Server Error'})
    }
})
