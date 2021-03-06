const Entrepreneur = require("../models/entrepreneur");
const Instructor = require("../models/instructor");
const Partner = require("../models/partner");
const Company = require("../models/company");
const User = require("../models/user");
const Modules = require("../models/modules");
const Event = require("../models/event")
const fs = require("fs");

const imagesPath = "./server/images";

const documentPath = "./server/documents";

const userType = {
  Entrepreneur: Entrepreneur,
  Instructor: Instructor,
  Partner: Partner,
  Company: Company,
};

const { expect } = require("chai");

const create_module = async (req, res) => {
  const module = new Modules({
    name: req.body.name,
    user: req.params.id,
    description: req.body.description,
    assignments: [],
    content: [],
  });

  const refModule = await module.save();

  console.log(refModule);

  res.status(200).json(refModule);
};

const get_recent_modules = async (req, res) => {
  const modules = await Modules.find({}).sort("-date");
  const result = modules.slice(0, 10);
  var ans = [];

  for (const module of result) {
    var populated = await myPop(module, "user").then( async function (result) {
      let populated2 = await myPop(result, "events").then(function (result2) {
  
        return result2;
      })
      return populated2;
    });

    ans.push(populated);
  }

  const sentModules = ans;

  res.status(200).json(sentModules);
};

async function myPop(module, field) {
  let itemPopulated = await module.populate(field).execPopulate();
  return itemPopulated;
}

const delete_module = async (req, res) => {
  moduleid = req.body.id;
  await Modules.deleteOne({ _id: moduleid });
};

const get_assignment = (req, res) => {
  const name = req.params.name;
  res.sendFile(name, { root: documentPath });
};

const save_assignments = (req, res) => {
  var fileNames = [];
  var filePath = [];
  var fileName;
  var extenstion;

  if (typeof req.files.assignments !== "undefined") {
    for (let i = 0; i < req.files.assignments.length; i++) {
      filePath = req.files.assignments[i].path.split("/");
      extenstion = req.files.assignments[i].originalname.split(".");
      fileName =
        extenstion.slice(0, -1).join("") +
        "*" +
        filePath[filePath.length - 1] +
        "." +
        extenstion[extenstion.length - 1];
      fileNames.push(fileName);
    }

    var documentsList = [];
    const id = req.params.id;

    Modules.findById(id).then((result) => {
      documentsList = result.assignments;
      documentsList = documentsList.concat(fileNames);
      Modules.findByIdAndUpdate(id, { assignments: documentsList }).then((x) =>
        fs.rename(
          `./server/documents/${filePath[filePath.length - 1]}`,
          `./server/documents/${fileName}`,
          () => {
            res.sendStatus(200);
          }
        )
      );
    });
  } else {
    res.sendStatus(200);
  }
};

const get_content = (req, res) => {
  const name = req.params.name;
  res.sendFile(name, { root: documentPath });
};

const save_content = (req, res) => {
  var fileNames = [];
  var filePath = [];
  var fileName;
  var extenstion;

  if (typeof req.files.content !== "undefined") {
    for (let i = 0; i < req.files.content.length; i++) {
      filePath = req.files.content[i].path.split("/");
      extenstion = req.files.content[i].originalname.split(".");
      fileName =
        extenstion.slice(0, -1).join("") +
        "*" +
        filePath[filePath.length - 1] +
        "." +
        extenstion[extenstion.length - 1];
      fileNames.push(fileName);
    }

    var documentsList = [];
    const id = req.params.id;

    Modules.findById(id).then((result) => {
      documentsList = result.content;
      documentsList = documentsList.concat(fileNames);
      Modules.findByIdAndUpdate(id, { content: documentsList }).then((x) =>
        fs.rename(
          `./server/documents/${filePath[filePath.length - 1]}`,
          `./server/documents/${fileName}`,
          () => {
            res.sendStatus(200);
          }
        )
      );
    });
  } else {
    res.sendStatus(200);
  }
};

const get_lecture = (req, res) => {
  const name = req.params.name;
  res.sendFile(name, { root: documentPath });
};

const save_lectures = (req, res) => {
  var fileNames = [];
  var filePath = [];
  var fileName;
  var extenstion;

  if (typeof req.files.lectures !== "undefined") {
    for (let i = 0; i < req.files.lectures.length; i++) {
      filePath = req.files.lectures[i].path.split("/");
      extenstion = req.files.lectures[i].originalname.split(".");
      fileName =
        extenstion.slice(0, -1).join("") +
        "*" +
        filePath[filePath.length - 1] +
        "." +
        extenstion[extenstion.length - 1];
      fileNames.push(fileName);
    }

    var documentsList = [];
    const id = req.params.id;

    Modules.findById(id).then((result) => {
      documentsList = result.lectures;
      documentsList = documentsList.concat(fileNames);
      Modules.findByIdAndUpdate(id, { lectures: documentsList }).then((x) =>
        fs.rename(
          `./server/documents/${filePath[filePath.length - 1]}`,
          `./server/documents/${fileName}`,
          () => {
            res.sendStatus(200);
          }
        )
      );
    });
  } else {
    res.sendStatus(200);
  }
};

const get_exact_module = (req, res) => {
  Modules.findById(req.params.id).then((result) => {
    myPop(result, "user").then((result2) => {
      myPop(result2, "event").then((result3) => {
        console.log(result3);
        res.status(200).json(result3);
      });      
    });
  });
};

const edit_module = (req, res) => {
  Modules.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then((result) => {
    res.status(200).json(result);
  });
};

const get_all_content = async (req, res) => {
  const modules = await Modules.findById(req.params.id);
  const content = modules.content;

  res.status(200).json(content);
};

const get_all_lectures = async (req, res) => {
  const modules = await Modules.findById(req.params.id);
  const lectures = modules.lectures;

  res.status(200).json(lectures);
};

module.exports = {
  create_module,
  get_recent_modules,
  delete_module,
  get_assignment,
  save_assignments,
  get_content,
  save_content,
  get_exact_module,
  edit_module,
  get_lecture,
  save_lectures,
  get_all_content,
  get_all_lectures,
};
