const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const userRoutes = require('./routes');
const Instructor = require('./models/instructor');
const Partner = require('./models/partner')
const Company = require('./models/company')
const User = require('./models/user');
//const passport = require('passport');
const Entrepreneur = require('./models/entrepreneur')



/* const Entrepreneur = require('./models/entrepreneur')
const Instructor = require('./models/instructor')
const Partner = require('./models/partner');
const Company = require('./models/company') */

const app = express();
const server = app.listen(3001);
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

app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
}); */

//app.use(passport.initialize());
//app.use(passport.session());
//passport.use(new LocalStrategy(User.authenticate()));

//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

/* app.post('/register', async(req, res, next) =>{
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const user = new Entrepreneur({ firstName, lastName, email, username, password });
        const registeredUser = await Entrepreneur.register(email, username, password);
        // req.login(registeredUser, err => {
        //     if (err) return next(err);
        //     req.flash('success', 'Welcome to Yelp Camp!');
        //     res.redirect('/campgrounds');
        // });

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }

}) */

 //routes
app.get('/add1', (req, res) => {
  
  const ins = new Entrepreneur({
    company: 'Muta',
    image: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg',
    role: 'MDF',
    biography: " MUTA Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  })

  const user = new User({
    name: 'Muta',
    username: 'mut',
    email: 'mut@lhars',
    password: 'mut',
    typeOfUser: 'Entrepreneur',
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

app.get('/add2', (req, res) => {
  
  const ins = new Entrepreneur({
    company: 'Muta2',
    image: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg',
    role: 'MDF2',
    biography: " 2MUTA Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  })

  const user = new User({
    name: 'Muta2',
    username: 'mut2',
    email: 'mut@lhars2',
    password: 'mut2',
    typeOfUser: 'Entrepreneur',
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

 app.get('/addCompany', (req, res) => {
  
  const ins = new Company({
    company: 'Nike',
    administrator: "60c176b86a997baf8757c270",
    employees: ["60c176b86a997baf8757c270"],
    numEmployees: "zero",
    lookingFunding: true,
    documents: ["hi/me/money"],
    image: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg',
    role: 'MDF',
    biography: " MUTA Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  })

  const user = new User({
    name: 'Muta',
    username: 'mut',
    email: 'mut@lhars',
    password: 'mut',
    typeOfUser: 'Company',
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

app.use('/profile', userRoutes);//2emlpoyees 2 addcompany