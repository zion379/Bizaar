const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Bizaar", {
  useNewUrlParser: true
});

const users = require("./Routes/api/users");
const profiles = require("./Routes/api/profiles");

const port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.use("/api/users", users);
app.use("/api/profile", profiles);

//passport
app.use(passport.initialize());

//passport Config
require("./config/passport")(passport);

app.listen(port, () => console.log(`Server running on port ${port}`));
