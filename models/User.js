const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
