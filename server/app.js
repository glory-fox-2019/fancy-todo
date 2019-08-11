if (process.env.NODE_ENV = 'development') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const route = require('./routes/index');
const errorHandling = require('./middleware/errorHandler');

// mongoseeee
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mylist', { useNewUrlParser: true }, function (err) {
    if (!err) {
        console.log(`connect mas eeeee`);
    } else {
        throw err;
    }
})

// bodyParser & cors
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes & errorHandling
app.use('/', route);
app.use(errorHandling);

// listen
app.listen(port, function (err) {
    if (!err) {
        console.log(`Listening on port ${port}`);
    } else {
        throw err;
    }
})


