const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const keys = require("../../config/keys");

// load profile model
const Profile = require("../../Models/Profile");
// load User profile
const User = require("../../Models/User-Model");

// @route POST api/users/test
// @desc test
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: "Profiles Work" });
});

// @route GET api/profile
// @desc get current user profile
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(errors));
  }
);

// @route POST api/profile
// @desc create user profile
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // check to see if handle exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
