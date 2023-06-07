const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResumeModel = new Schema({
  fileName: { type: String },
  fileData: { type: String },
  fileExtension: { type: String },
});

module.exports = mongoose.model("resume", ResumeModel);
