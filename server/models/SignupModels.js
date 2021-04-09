const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const signUpTemplate = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bio: {
    type: String,
    required: true
  },
  jobtitle: {
    type: String,
    required: true
  },
  tech: {
    type: String,
    required: true
  },
  image:{
    type: String,
 
  },
  resetToken: String,
  expireToken: Date,
  date: {
    type: Date,
    default: Date.now
  }
})
//  signUpTemplate.pre('save', async function (next) {
//    const salt = await bcrypt.genSalt(10);
//    this.password = await bcrypt.hash(this.password, salt);
//    next()
//  })
// signUpTemplate.statics.login = async function (email, password) {

//   const user = await this.findOne({ email });
//   console.log(email)
//   console.log(user)
//   if (user) {

//     const isAuthenticated = await bcrypt.compare(password, user.password);
//     console.log(isAuthenticated)
//     //console.log(user);
//     if (isAuthenticated) {
//       return user;
      
//     }
//     else{
//     throw Error('incorrect pwd');
//   }
// }else {
//     throw Error('incorrect email');
//   }
// }
module.exports = mongoose.model('usetable', signUpTemplate)