const router = require('express').Router()
const MongoProfile = require('../src/model/profile')


router.get('/', function (req, res) {
  res.send('Hello world from API!')
})

router.put('/profile', function (req, res) {
  const newProfile = new MongoProfile({ first_name: req.body.first_name, last_name: req.body.last_name, gender: req.body.gender })
  newProfile.save((err, profile) => {
    if (err || !profile) {
      res.sendStatus(400).send('Error : cannot add new profile')
    } else {
      res.status(201).send(String(profile.id))
    }
  })
})

router.get('/profile', async function (req, res) {
  MongoProfile.findOne({ first_name: 'Baptiste' },
    (err, profile) => {
      if (err || !profile) return res.sendStatus(404)
      return res.json(profile)
    })
})

module.exports = router