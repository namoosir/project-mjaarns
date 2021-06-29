require("dotenv").config();

const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/user");
const Ent = require("../models/entrepreneur");
const Instructor = require("../models/instructor");
const Partner = require("../models/partner");
const Company = require("../models/company");

const saltRounds = 10;
let id = 0;

module.exports.registerUser = async (req, res) => {
  let refUser = 0;
  const user = await User.findOne({
    email: req.body.email,
    username: req.body.username,
  });
  if (user) {
    res.status(400).json({
      user: "user already exists",
      success: false,
      redirectUrl: "/register",
    });
    res.redirect("/register");
  }

  if (req.body.typeOfUser === "Entrepreneur") {
    const ent = new Ent({});
    refUser = await ent.save();
  } else if (req.body.typeOfUser === "Partner") {
    const partner = new Partner({});
    refUser = await partner.save();
  } else if (req.body.typeOfUser === "Company") {
    const company = new Company({});
    refUser = await company.save();
  } else {
    const instructor = new Instructor({});
    refUser = await instructor.save();
  }


  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    typeOfUser: req.body.typeOfUser,
    typeUser: refUser._id,
  });

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      } else {
        newUser.password = hash;
        newUser
          .save()
          .then((ent) => res.json(ent))
          .catch((err) => console.log(err));
      }
    });
  });
};

