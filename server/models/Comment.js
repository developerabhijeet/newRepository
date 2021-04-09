const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const comment = mongoose.Schema({
  body: {
    type: String,
    require: true,
  },
  post: {
    type: ObjectId,
    ref: "post",
  },
  user: {
    type: ObjectId,
    ref: "usetable"
  }
});

mongoose.model("Comment", comment);