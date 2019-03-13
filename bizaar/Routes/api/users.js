const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../Models/User-Model");
const keys = require("../../config/keys");

// Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route GET api/users/test
// @desc Tests users route
// @access public

router.get("/test", (req, res) => {
  res.json({ msg: "users are working" });
});

// @route POST api/users/register
// @desc users registration
// @access public

router.post("/register", (req, res) => {
  //console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        console.log("email already exist");
        return res.status(400).json({ email: "email already exist" });
      } else {
        // create new user
        console.log("create new user");
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          userName: req.body.userName,
          password: req.body.password
        });
        bycrypt.genSalt(10, (err, salt) => {
          bycrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.json(user);
                console.log("new user created");
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const email = req.body.email;
    const password = req.body.password;
    // find user by email.
    User.findOne({ email: email }, (err, user) => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // check password
      bycrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched

          const payload = { id: user.id, name: user.name };

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token // needs to be space here or else token will not authnicate
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          res.status(400).json(errors);
        }
      });
    });
  }
});

// @route GET api/users/current
// @desc Return current user
// @access private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      userName: req.user.userName,
      email: req.user.email
    });
  }
);

module.exports = router;
