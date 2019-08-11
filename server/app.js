require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const todoRoute = require('./routes/todoRoute')

app.use(express.urlencoded({extended : false}))
app.use(cors())
app.get('/', (req, res, next) => {
  res.json({
    message : 'Hello world'
  })
})

app.use('/user', userRoute)
app.use('/todo', todoRoute)

app.use((err, req, res, next) => {

  console.log(err)

  let status = err.status || 500
  let message = err.message || 'Internal server errorrrrr'
  res.status(status).json({
    message : message
  })

})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})