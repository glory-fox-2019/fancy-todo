require('dotenv').config()

const express  = require('express')
const cors     = require('cors')
const morgan   = require('morgan')
const app      = express()
const port     = process.env.PORT || 3000
const routes   = require('./routes')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
.then(() => {
    console.log(`Connect to mongoose database`)
})
.catch(err => {
    console.log(err)
})
mongoose.set('useCreateIndex', true)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes);

app.listen(port, () => {
    console.log('App listening on port: ' + port)
})