const mongoose = require("mongoose");

const UserSitesSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  accID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  accUsername: {
    type: String,
    required: true,
  },
  accPassword: {
    type: String,
    required: true,
  },
  accIV: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserSites = mongoose.model(
  "UsersSites",
  UserSitesSchema,
  "TrunkUsersSites"
);

module.exports = UserSites;
