const Entrepreneur = require("../models/entrepreneur");
const Instructor = require("../models/instructor");
const Partner = require("../models/partner");
const Company = require("../models/company");
const User = require("../models/user");
const imagesPath = "./server/images";
const Event = require("../models/event");
const documentPath = "./server/documents";
const fs = require("fs")

const userType = {
  Entrepreneur: Entrepreneur,
  Instructor: Instructor,
  Partner: Partner,
  Company: Company,
};

const { expect } = require("chai");

const user_details = async (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((result) => {
      result.populate(
        { path: "typeUser", model: result.typeOfUser },
        async function (err, result) {
          const popEvent = await myPop(result, "events").then(async function (resultp) {
            return resultp
          })
          res.status(200).json(popEvent);
        }
      ); // always makes sure that the client sends the general user
    })
    .catch((err) => {
      console.log(err);
    }); 
};

/* documentsList = result.documents;
documentsList.push(fileName);
User.findByIdAndUpdate(req.params.id, {documents: documentsList }).then(result => res.sendStatus(200)) */

//timestamp = new Date().getTime().toString();

const get_all_profiles = async (req, res) => {
  var ans = [];
  var final = [];
  ans = await User.find()
    .sort("name")
    .then((result) => {
      return result;
    });

  for (const user of ans) {
    var populated1 = await myPop2(user).then(function (result) {
      return result;
    });

    final.push(populated1);
  }

  res.send(final);
};

async function myPop2(post) {
  let itemPopulated = await post
    .populate({ path: "typeUser", model: post.typeOfUser })
    .execPopulate();
  return itemPopulated;
}

const user_updates = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((result) => {
      const typeofUser = result.typeOfUser;
      userType[typeofUser]
        .findByIdAndUpdate({ _id: result.typeUser }, req.body.typeUser)
        .then(() => {
          result.populate(
            { path: "typeUser", model: result.typeOfUser },
            function (err, result) {
              res.send(result);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_image = (req, res) => {
  const id = req.params.id;
  User.findById(id).then((result) => {
    res.sendFile(result.image, { root: imagesPath });
  });
};

const save_image = (req, res) => {
  expect(req.files.imageURL, "file needed").to.exist;
  const expensesFile = req.files.imageURL[0];
  const filePath = expensesFile.path.split("/");
  const extenstion = expensesFile.originalname.split(".")
  const fileName = extenstion.slice(0, -1).join("") + "*" + filePath[filePath.length - 1] + "." + extenstion[extenstion.length - 1]

  User.findByIdAndUpdate(req.params.id, {
    image: fileName,
  }).then((result) => fs.rename(`./server/images/${filePath[filePath.length - 1]}`, `./server/images/${fileName}`, () => { res.sendStatus(200) }));
};

async function myPop2(post) {
  let itemPopulated = await post
    .populate({ path: "typeUser", model: post.typeOfUser })
    .execPopulate();
  return itemPopulated;
}

async function myPop(model, field) {
  let itemPopulated = await model.populate(field).execPopulate();
  return itemPopulated;
}

const get_document = (req, res) => {
  const name = req.params.name;
  res.sendFile(name, { root: documentPath });
};

const save_documents = (req, res) => {
  var fileNames = [];
  var filePath = [];
  var fileName;
  var extenstion;

  if (typeof req.files.documents !== "undefined") {
    for (let i = 0; i < req.files.documents.length; i++) {
      filePath = req.files.documents[i].path.split("/");
      extenstion = req.files.documents[i].originalname.split(".")
      fileName = extenstion.slice(0, -1).join("") + "*" + filePath[filePath.length - 1] + "." + extenstion[extenstion.length - 1];
      fileNames.push(fileName);
    }

    var documentsList = [];
    const id = req.params.id;

    User.findById(id).then((result) => {
      userType[result.typeOfUser].findById(result.typeUser).then((result2) => {
        documentsList = result2.documents;
        documentsList = documentsList.concat(fileNames);
        userType[result.typeOfUser]
          .findByIdAndUpdate(result.typeUser, { documents: documentsList })
          .then((x) => fs.rename(`./server/documents/${filePath[filePath.length - 1]}`, `./server/documents/${fileName}`, () => { res.sendStatus(200) }));
      });
    });
  } else {
    res.sendStatus(200);
  }
};

module.exports = {
  user_details,
  get_all_profiles,
  user_updates,
  get_image,
  save_image,
  get_document,
  save_documents,
};
