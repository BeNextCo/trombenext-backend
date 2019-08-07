const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());

app.get('/', function (req, res) {
  console.log('GET hello world')
  res.send('Hello world from API!')
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})