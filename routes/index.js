const router = require('express').Router()
const MongoProfile = require('../src/model/profile')
const {retrieveTokenInfo} = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.send('Hello world from API!')
})

router.put('/profile', async (req, res) => {
  const newProfile = new MongoProfile({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
  })
  newProfile.save((err, profile) => {
    if (err || !profile) {
      res.status(400).send(`Error adding new profile : ${err}`)
    } else {
      res.status(201).send(String(profile.id))
    }
  })
})

router.get('/profile/:id', async (req, res) => {
  MongoProfile.findOne({ _id: req.params.id }, (err, profile) => {
    if (err || !profile)
      return res.status(404).send(`Cannot find profile : ${err}`)
    return res.json(profile)
  })
})

router.get('/profiles', async (req, res) => {
  MongoProfile.find((err, profiles) => {
    if (err || !profiles)
      return res.status(404).send(`Cannot find profiles : ${err}`)
    return res.json(profiles)
  })
})

router.get('/login', async (req, res) => {
  const [,requestToken] = req.headers['authorization'].split(' ')
  const user = await retrieveTokenInfo(requestToken)
  res.status(200).json(user)
})

module.exports = router
