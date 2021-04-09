const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const routeUrls = require('./routes/routes')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()

app.get('/get-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
})

app.use('/uploads',express.static('uploads'))

mongoose.connect("mongodb://localhost:27017/usetable",{useFindAndModify:false, useCreateIndex:true ,useNewUrlParser: true,useUnifiedTopology: true}, () => console.log("database connected successfullly"));

app.use(express.json())

app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use('/app', routeUrls)
app.listen(4000, () => console.log("server is running at 4000"))