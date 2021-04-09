const mongoose = require('mongoose');const { ObjectId } = mongoose.Schema.Types
const ProfileImage = new mongoose.Schema({
  image:{
    type: String,
  },
  userId: {
    type: ObjectId,
    ref: "usetable",
  }
})

module.exports = mongoose.model('ProfileImage',ProfileImage);