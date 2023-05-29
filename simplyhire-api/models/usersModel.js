const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const users = new Schema({
  username: {
    type: String,
    required: [true, "please provide username"],
    unique: true,
    validate: {
      validator: function(value) {
          const self = this;
          const errorMsg = 'Email already in use!';
          return new Promise((resolve, reject) => {
              self.constructor.findOne({ username: value })
                  .then(model => model._id ? reject(new Error(errorMsg)) : resolve(true)) // if _id found then email already in use 
                  .catch(err => resolve(true)) // make sure to check for db errors here
          });
      },
  }
  },
  name:{type: String},
  password: { type: String, required: [true, "please provide password"] },
});

users.pre("save", function (next) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  console.log("pre save called".silly, this.password);
  next();
});

module.exports = mongoose.model("users", users);
