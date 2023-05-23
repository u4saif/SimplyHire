const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const users = new Schema({
  username: {
    type: String,
    required: [true, "please provide username"],
    unique: true,
  },
  password: { type: String, required: [true, "please provide password"] },
});

users.pre("save", function (next) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  console.log("pre save called", this.password);
  next();
});

module.exports = mongoose.model("users", users);
