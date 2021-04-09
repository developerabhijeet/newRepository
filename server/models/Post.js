const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const Post = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  likes: [{ type: ObjectId, ref: "usetable" }],
  comments: [{
    text: String,
    postedBy: { type: String, ref: "usetable" },
    userInfo: { type: ObjectId, ref: "usetable" },
    date: {
      type: Date,
      default: Date.now
    }
  }],

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('post', Post);