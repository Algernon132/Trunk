const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
var https = require("https");

const app = express();

app.use(cors());
app.use(express.json());

//Adds the Passport file for login authentication
require("./config/passport")(passport);

//Connect to MongoDB database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//start up passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Link to routing files
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
