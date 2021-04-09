const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const User = mongoose.model('usetable');
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'chatroom secret', async (err, decodedToken) => {
      console.log('decoded Token', decodedToken)
      if (err) {
        console.log(err)
      }
      else {
        let user = await User.findById(decodedToken.id)
        res.json(user);
        next();
      }
    })
  } else {
    next();
  }
}