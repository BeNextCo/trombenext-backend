const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {authenticate} = require('./middlewares/auth')
const router = require('./routes')
const app = express()
const env = process.env.NODE_ENV || 'development'
if (env === 'development') {
  require('dotenv').config()
}
const port = process.env.PORT || 5000
const dbUri = process.env.DB_URI

app.use(cors())
app.use(authenticate)
app.use(bodyParser.json())
app.use(router)

mongoose
  .connect(dbUri, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, function() {
      console.log(`App is running on port ${port}`)
    })
  })
  .catch(err => {
    console.log(`Error connecting to database, ${err}`)
  })
