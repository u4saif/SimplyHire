const mongoose = require("mongoose");

const uploadModel = new mongoose.Schema({
  name: String,
  size: Number,
  uploadTime: Date,
  fileData: {
    data: Buffer,
    contentType: String,
  },
});

module.exports =  mongoose.model("uploadedFile", uploadModel);
