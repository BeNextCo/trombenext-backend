const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', function (req, res) {
  console.log('GET hello world')
  res.send('Hello world from API!')
})

app.listen(port, function () {
  console.log(`App is running on port ${port}`)
})