var bodyParser = require("body-parser");
var express = require("express");
var UserModel = require("../Models/User-Model"); // test of a test meaning can delete later
var mongoose = require("mongoose"); // test of a test meaning can delete later

var app = express();

var User1 = new UserModel();

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/BizaarUser").then(
  () => {
    console.log("connected to database SUCCESS");
  },
  err => {
    console.log("failed to connect to data base FAIL");
  }
);

app.use(bodyParser.json()); // need this so i can retrieve json data

app.post("/test", (req, res) => {
  console.log(req.body);

  User1.name.firstName = req.body.firstname;
  User1.name.lastName = req.body.lastname;
  User1.email = req.body.email;
  User1.userName = req.body.username;

  User1.save().then(
    doc => {
      console.log("Successfully saved user to data base");
      res.send(doc);
    },
    err => {
      console.log("There was an error ", err);
      res.sendStatus(400).send(err);
    }
  );
});

app.listen(3000, () => console.log("Server running on port 3000"));
