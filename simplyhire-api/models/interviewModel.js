const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewData = new Schema({
  candidateName: {
    type: String,
    required: [true, "please provide candidate Name"],
  },
  interviewerName: { type: String, default: "not available" },
  interviewerUsername: { type: String, default: "not available" },
  data: [
    {
      title: { type: String },
      technology: { type: String },
      score: { type: Number },
    },
  ],
  ovelAllScore: { type: Number , default : null},
});

module.exports = mongoose.model("interviewData", interviewData);
