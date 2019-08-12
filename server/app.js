if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    require('dotenv').config();
}

const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000
const router = require('./routes');

mongoose.connect(`mongodb://localhost:27017/todo`, { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => { res.send('selamat datang di aplikasi todo'); })
app.use('/api', router)

// error handling
// app.use((err, req, res, next) => {
//     if (!err.status) err.status = 500
//     res.status(err.status).json({ error: err.message })
// })

app.listen(port, function () {
    console.log(`listening on port ${port}`)
})