if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    console.log('development')
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const mongoose =require('mongoose')
const app = express()
const port = process.env.PORT
const userRoute = require('./routes/user')
const todoRoute = require('./routes/todo')

app.use(cors())
app.use( express.urlencoded({extended:false}))
app.use(express.json())
app.get('/',(req,res) => {
    res.send('aaaa')
})
app.use('/user',userRoute)
app.use('/todo',todoRoute)

mongoose.connect('mongodb://localhost:27017/fancy-todo', {useNewUrlParser: true})
.then( () => {
    console.log('Connected to db')
})
.catch( () => {
    console.log('Failed to connect db')
})

app.listen(port, function(){
    console.log('Listen to : ' +port )
})