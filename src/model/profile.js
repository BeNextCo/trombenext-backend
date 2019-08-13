const mongoose = require('mongoose')

var profileSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, required: true }
});

var MongoProfile = mongoose.model('Profile', profileSchema);

module.exports = MongoProfile
