//DEPENDANCIES
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const speakeasy = require("speakeasy");
const fs = require("fs");
var util = require("util");

//MONGODB MODELS
const User = require("../models/User");
const UserSites = require("../models/UserSites");

router.use(express.json());
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.post("/signup", (req, res) => {
  console.log("Signup");
  const name = req.param("name");
  const email = req.param("email");
  const password = req.param("password");
  var secret = speakeasy.generateSecret({ length: 8 });
  secret = secret.base32;

  //encryptPassword(password, "thePassword", iv);

  if (!name || !email || !password) {
    errors.push({ msg: "Please fill out all fields" });
  }

  let errors = [];

  if (errors.length > 0) {
    //testing sending errors
    return res.send(errors);
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.json({ error: "That email is already registered" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          secret,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                //***Redirect to login */

                console.log(user);
                res.json({ id: user._id });
                res.status(201).send();
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.post("/login", function (request, response, next) {
  console.log("Login");
  // passport.authenticate("local", function (err, user, info) {
  //   console.log(user.email);
  //   console.log(user.password);
  //   if (err) {
  //     return next(err);
  //   }

  //   console.log(user);
  //   if (!user) {
  //     return res.json({ message: "Invalid" });
  //   }
  //   req.logIn(user, function (err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     return res.json({ id: user._id });
  //   });
  // })(req, res, next);

  // if ((req.email = "password")) {
  //   res.json({ message: "The password is password good job" });
  // } else {
  //   res.json({ message: "The password is not what you typed" });
  // }

  const email = request.param("email");
  const password = request.param("password");

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      console.log("Email not registered");
      response.json({ error: "Email not registered" });
      return;
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        console.log("Logging in user " + user._id);
        response.json({ id: user._id });
      } else {
        console.log("Password incorrect");
        response.json({ error: "Password incorrect" });
      }
    });
  });
});

//ADDS A USER ACCOUNT
router.post("/addAcc", function (request, response) {
  console.log("Add Account");
  const userID = request.param("userID");
  var accID;
  const name = request.param("name");
  const url = request.param("url");
  const accUsername = request.param("accUsername");
  var accPassword = request.param("accPassword");
  const masterPassword = request.param("masterPassword");
  var encryptResults;
  var encryptedAccPassword;
  var userAccountIV;

  UserSites.find({ userID: userID })
    .sort({ accID: -1 })
    .exec(function (err, docs) {
      if (err) {
        response.json({ success: false });
        throw error;
      } else {
        if (docs == "") {
          accID = "0001";
        } else {
          accID = docs[0].accID;
          accID = parseInt(accID, 10);
          accID++;
          accID = accID.toString();
          if (accID.length == 1) {
            accID = "000" + accID;
          } else if (accID.length == 2) {
            accID = "00" + accID;
          }
        }

        encryptResults = encryptPassword(masterPassword, accPassword);
        accPassword = encryptResults[0];
        accIV = encryptResults[1];

        const newSite = new UserSites({
          userID,
          accID,
          name,
          url,
          accUsername,
          accPassword,
          accIV,
        });

        newSite.save().then((user) => {
          console.log(user);
          response.json({ success: true });
        });
      }
    });
});

//UPDATES INFORMATION FOR ONE ACCOUNT
router.post("/updateAcc", async function (request, response) {
  console.log("Update Account");
  const userID = request.param("userID");
  const accID = request.param("accID");
  const name = request.param("name");
  const url = request.param("url");
  const accUsername = request.param("accUsername");
  var accPassword = request.param("accPassword");

  var accIV = await getAccountIV(userID, accID);
  //console.log("THE ACCOUNT IV IS: " + accIV);

  UserSites.deleteOne(
    { $and: [{ userID: userID }, { accID: accID }] },
    function (err, results) {
      if (err) {
        response.json({ success: false });
        throw error;
      }
      //console.log(results);
    }
  );

  const newSite = new UserSites({
    userID,
    accID,
    name,
    url,
    accUsername,
    accPassword,
    accIV,
  });

  console.log(newSite);

  newSite.save().then((user) => {
    //console.log(user);
    response.json({ success: true });
  });
});

//RETURNS ALL ACCOUNTS FOR ONE USER
router.post("/getAllAcc", function (request, response) {
  const userID = request.param("userID");
  const masterPassword = request.param("masterPassword");
  var error = false;
  console.log("Get All Accounts for" + userID);

  UserSites.find({ userID: userID }, function (err, results) {
    //console.log("RESULTS ARE: " + results);
    var i = 0;
    results.forEach((account) => {
      results[i]["accPassword"] = decryptPassword(
        masterPassword,
        results[i]["accPassword"],
        results[i]["accIV"]
      );
      if (results[i]["accPassword"] == "error") {
        error = true;
        response.json({ error: "Bad login" });
      }

      i++;
    });

    console.log(results);

    if (!error) {
      response.json(results);
    }
  });
});

//RETURNS ONE ACCOUNT FOR USER
router.post("/getAcc", function (request, response) {
  console.log("Get Account");
  const userID = request.param("userID");
  const accID = request.param("accID");
  const masterPassword = request.param("masterPassword");

  UserSites.find({ $and: [{ userID: userID }, { accID: accID }] }, function (
    err,
    results
  ) {
    if (err) throw error;
    else {
      const obj = JSON.parse(JSON.stringify(results));
      obj[0]["accPassword"] = decryptPassword(
        masterPassword,
        results[0]["accPassword"],
        results[0]["accIV"]
      );

      response.json(results);
    }
  });
});

//DELETES AN ACCOUNT ASSOCIATED WITH ONE USER
router.post("/deleteAcc", function (request, response) {
  console.log("Delete Account");
  const userID = request.param("userID");
  const accID = request.param("accID");

  UserSites.deleteOne(
    { $and: [{ userID: userID }, { accID: accID }] },
    function (err, results) {
      if (err) throw error;
      if (results.deletedCount == 1) {
        response.json({ success: true });
      } else {
        response.json({ success: false });
      }
    }
  );
});

router.post("/getSecret", function (req, res) {
  var secret = speakeasy.generateSecret({ length: 8 });
  res.send({ secret: secret.base32 });
});

router.post("/validateCode", function (req, res) {
  var secret = req.param("secret");
  var token = req.param("token");

  console.log(secret);
  console.log(token);

  res.send({
    valid: speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
      window: 2,
    }),
  });
});

//RETURNS A STRING ENCRYPTED USING THE USER'S MASTER PASSWORD AS ITS KEY
function encryptPassword(masterPassword, password) {
  const key = crypto.createHash("sha256").update(masterPassword).digest();

  //Create Unique IV for encrypting passwords
  let ivString = Math.random().toString(36).substring(7);
  resizedIV = Buffer.allocUnsafe(16);
  iv = crypto.createHash("sha256").update(ivString).digest();
  iv.copy(resizedIV);

  // console.log("KEY 1 IS: " + key);
  // console.log("IV STRING 1 IS: " + ivString);
  // console.log("IV 1 IS : " + iv);
  // console.log("RESIZED IV 1 IS : " + resizedIV);

  var cipher = crypto.createCipheriv("aes256", key, resizedIV);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  return [encrypted, ivString];
}

//RETURNS A DECRYPTED STRING
function decryptPassword(masterPassword, encrypted, ivString) {
  const key = crypto.createHash("sha256").update(masterPassword).digest();

  resizedIV = Buffer.allocUnsafe(16);
  iv = crypto.createHash("sha256").update(ivString).digest();
  iv.copy(resizedIV);

  // console.log("KEY 2 IS: " + key);
  // console.log("IV STRING 2 IS: " + ivString);
  // console.log("IV 2 IS : " + iv);
  // console.log("RESIZED IV 2 IS : " + resizedIV);

  try {
    var decipher = crypto.createDecipheriv("aes256", key, resizedIV);
    let dencrypted = decipher.update(encrypted, "hex", "utf8");
    dencrypted += decipher.final("utf8");
    return dencrypted;
  } catch (err) {
    return "error";
  }
}

async function getAccountIV(userID, accID) {
  return new Promise(function (resolve, reject) {
    UserSites.find({ $and: [{ userID: userID }, { accID: accID }] }, function (
      err,
      results
    ) {
      if (err) throw error;
      else {
        const obj = JSON.parse(JSON.stringify(results));
        console.log(obj[0]["accIV"]);
        resolve(obj[0]["accIV"]);
      }
    });
  });
}

module.exports = router;
