const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResumeModel = new Schema({
  name: { type: String },
  fileData: { type: String },
  size: { type: String },
  type: { type: String },
});

module.exports = mongoose.model("resume", ResumeModel);
