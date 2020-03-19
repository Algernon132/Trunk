const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");

router.use(express.json());

router.get("/register", (req, res) => res.render("register"));

router.get("/login", (req, res) => res.render("login"));

router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill out all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (errors.length > 0) {
    //***Redirect to register form */
    //UNTIL the above is implemented, errors will cause a crash
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                //***Redirect to login */
                console.log(user);
                res.status(201).send();
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/", //***Redirect to logged in dashboard */
    failureRedirect: "/login" //***REdirect to login page - login failed */
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  //***REdirect to login page
});

module.exports = router;
