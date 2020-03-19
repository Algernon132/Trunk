const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

//Adds the Passport file for login authentication
require("./config/passport")(passport);

//Connect to MongoDB database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//start up passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Link to routing files
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
