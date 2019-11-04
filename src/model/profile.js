const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, required: true },
})

const MongoProfile = mongoose.model('Profile', profileSchema)

module.exports = MongoProfile
