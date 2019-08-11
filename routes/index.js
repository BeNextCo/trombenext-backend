const router = require('express').Router()

router.get('/', function (req, res) {
  console.log('GET hello world')
  res.send( 'Hello world qdqsdqsd API!')
})

router.put('/profile', function (req,res) {
  const newProfileId = 1
  res.status(201).send(String(newProfileId))
})

module.exports = router