const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Instructor = require('./models/instructor');
const Partner = require('./models/partner')
const Company = require('./models/company')
const User = require('./models/user');
const Entrepreneur = require('./models/entrepreneur')

const bodyParser = require('body-parser');

const userRoutes = require('./routes/routes')

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/african-impact-challenge", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// app.use(cors);
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', '*');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/add', (req, res) => {

  const ins = new Partner({
    biography: "Hello",
  })

  const user = new User({
    image: "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg",
    biography: 'My name is coolguy and I have a lot of money',
    name: 'HArry',
    username: 'Kharsm',
    email: 'mutase@lhars',
    password: 'hi123',
    typeOfUser: 'Partner',
    typeUser: ins._id
  })

  ins.save()
  .then(result => {
    user.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
});

//app.use(passport.initialize());

//app.use('/profile', userRoutes);
app.use('', userRoutes)

app.listen(3001, () => {
  console.log("Serving on port 3001");
});
