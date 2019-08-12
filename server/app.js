if(process.env.NODE_ENV==='development'){
    require('dotenv').config()
}

const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.PORT || 3000,
    routes = require('./routes'),
    logger = require('morgan'),
    errorHandler = require('./middlewares/errorHandler'),
    dbName = 'fancy-todo'
    
// Check mongoose connection
mongoose.connect(`mongodb://localhost/${dbName}-${process.env.NODE_ENV}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connect to mongodb')
});

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(logger('dev'))

// Routes
app.use('/api', routes)

// Error Handler
app.use(errorHandler)

app.listen(port, ()=> console.log('Listening on port', port))