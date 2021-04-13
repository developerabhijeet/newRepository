const express = require('express');
const router = express.Router();
const User = require('../models/SignupModels');
// const ProfileImage = require('../models/ProfileImage');
const Post = require('../models/Post');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
// const multer = require('multer');
// const path = require('path')
const requireLogin = require('../middleware/requireLogin')


const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}))
// router.post('/upload',upload.single("file"),async (req,res)=>{
 
  
//   const id = req.body.userid
//   const file = req.file;
//   console.log("file",file)
//   try{
//     const url = req.protocol+'://'+req.get('host')
//     console.log(req.file);
//     const Imagedata ={
//       image :url + "/public/" + file.filename,
//     }
//     console.log
//     await User.findByIdAndUpdate(id, Imagedata).then(data =>res.json(data))
//       .catch(error => {
//         res.json(error)
//       })
//   }catch(error){
//     res.status(400).send(error)
//   }
// })

// router.route('/profileImage').get(async (req,res)=>{
//   try{
//     const imageData = await ProfileImage.find();
//     res.status(200).send(imageData);
//     imageData.exec(function(err,data){
//       if(err) throw err;
      
//       res.render({records: data})
//     })
//   }catch(error){
//     res.status(400).send(error);
//   }
// })

// router.put('/upload',upload.single("image"),async (req, res) => {
//   // // console.log(req)
 
//   const file = req.file; 
//   const id = req.body.userid;
 
//   console.log(file)
//   const url = req.protocol + '://' + req.get('host')

//   const Imagedata = {
//     image: url + "/public/" + file.filename
//   }
  
 

 
// })
router.post('/signup', async (request, response) => {
  const saltPassword = await bcrypt.genSalt(10)
  const securePassword = await bcrypt.hash(request.body.password, saltPassword)
  const signedUp = new User({
    name: request.body.name,
    email: request.body.email,
    password: securePassword,
    bio: request.body.bio,
    jobtitle: request.body.jobtitle,
    tech: request.body.tech
  })
  
  signedUp.save()
    .then(data => {
      console.log(data.email)
      transporter.sendMail({
        to: data.email,
        from: "abhijeettiwari1705@gmail.com",
        subject: "Registeration successfull",
        html: `<h2>Welcome ${data.name} to CSOVERFLOW, You are registered successfully</h2>`

      })
      console.log(data)
      response.json(data)
    })
    .catch(error => {
      response.json(error)
    })
})


router.route('/resetpassword').post((req, res) => {

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "user not found with this email" })
        }
        user.resetToken = token
        user.expireToken = Date.now() + 900000
        user.save().then((result) => {
          transporter.sendMail({
            to: result.email,
            from: "abhijeettiwari1705@gmail.com",
            subject: "Password-Reset",
            html: `<p>Your can change your password by clicking below</p>
            <h5><a href="http://localhost:3000/newpassword/${token}/">click here to reset password</a></h5>
            <h4><strong>Link will be active for 15 minutes only!</strong></h4>`
          })
          res.json({ message: "check your email" })
        })
      })
  })
})
router.route('/newpassword').post((req, res) => {
  const newPassword = req.body.password
  const setToken = req.body.token
  User.findOne({ resetToken: setToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" })
      }
      bcrypt.hash(newPassword, 10).then(hashedpassword => {
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser) => {
          transporter.sendMail({
            to: user.email,
            from: "abhijeettiwari1705@gmail.com",
            subject: "Password-Reset succesfull",
            html: `<p>Your password changed successfully ${user.name}</p>`
          })
          res.json({ message: "password updated success" })
        })
      })
    }).catch(error => {
      console.log(error)
    })
})
router.post('/post', async (request, response) => {
  const posted = new Post({
    name: request.body.name,
    post: request.body.post,
    domain: request.body.domain

  })
  posted.save()
    .then(data => {
      response.json(data)
    }).catch(error => {
      response.json(error)
    })
})



router.route('/').get((req, res) => {
  Post.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})





router.route('/post/:id').get(function (req, res) {
  let id = req.params.id;
  try {
    Post.findById(id, function (err, data) {
      res.json(data);
    });
  } catch (err) {
    console.log(err)
  }

});


router.route('/editprofile').put(async(req, res) => {
  let id = req.body.id;
 
  const user = await User.findById(id);
  if(user){
   
      user.bio= req.body.bio || user.bio;
      user.tech= req.body.tech || user.tech;
      user.jobtitle= req.body.jobtitle || user.jobtitle;
  const updatedUser = await user.save();
    
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    password: updatedUser.password,
    bio: updatedUser.bio,
    jobtitle: updatedUser.jobtitle,
    tech: updatedUser.tech
  }); 
  } 
})

const alertError = (err) => {
  console.log('error.message', err.message);
  console.log('error.message', err.code);
  let errors = { email: '', password: '', jobtitle: '', bio: '', tech: '', name: '' }
  if (err.message === 'incorrect email') {
    errors.email = 'thi email not found';
  }
  if (err.message === 'incorrect pwd') {
    errors.password = 'The password is incorrect';
  }
  if (err.code === 11000) {
    errors.email = 'This email already exist';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message

    });
  } return errors;
}


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email})
    if(user){
      const isAuthenticated = await bcrypt.compare(password, user.password);
      console.log(isAuthenticated)
      if(isAuthenticated){
        const token = createJWT(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user })
      }else{
        res.status(401)
      res.json({message:'OOPS, Your Password is Invalid'})
      }
    }else{
      res.status(401)
      res.json({message:'OOPS!, Entered Email ID does not exists'})
    }
    
  }catch (error) {
    res.status(400).json(error);
  }
})

router.route('/verifyuser').get(async (req, res, next) => {
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
})
router.route('/logout').get((req, res) => {
  res.cookie('jwt', "", { maxAge: 1 });
  res.status(200).json({ logout: true })
})

router.route('/like').put(requireLogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.id, {
    $push: { likes: req.body.user_Id }
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    } else {
      res.json(result)

    }
  })
})

router.route('/unlike').put((req, res) => {
  Post.findByIdAndUpdate(req.body.id, {
    $pull: { likes: req.body.user_Id }
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    } else {
      res.json(result)
    }
  })
})

router.route('/comment').put(requireLogin, (req, res) => {
  const comment = {
    text: req.body.texts,
    postedBy: req.body.user_Name,
    userInfo: req.body.user_Id
  }
  Post.findByIdAndUpdate(req.body.post_id, {
    $push: { comments: comment }
  }, {
    new: true
  })
    .populate("postedBy", "name")
    .populate("userInfo", "user_id")
    .populate("comments.postedBy", "_id name")
    .populate("comments.userInfo", "_id")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err })
      } else {
        res.json(result)
        console.log(result)

      }
    })
})

router.route('/search').post((req, res) => {
  let post = req.body.postname;
  Post.find(post)
    .then(post => {
      res.json({ post })
    }).catch((err) => {
      console.log(err)
    })
})

router.route('/user/:id').get(function (req, res) {
  let id = req.params.id;

  try {
    User.findById(id, function (err, data) {
      res.json(data);
    });
  } catch (err) {
    console.log(err)
  }

});

router.route('/profile/:id').get(function (req, res) {
  let id = req.params.id;

  try {
    User.findById(id, function (err, data) {
      res.json(data);
    });
  } catch (err) {
    console.log(err)
  }

})

module.exports = router