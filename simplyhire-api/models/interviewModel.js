const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewData = new Schema({
  basicDeails: {
    name: { type: String, required: [true, "please provide candidate Name"] },
    email: { type: String, required: [true, "please provide email"] },
    mobile: { type: String, required: [true, "please provide mobile number"] },
    otherNumber: { type: String, required: false },
    interviewDate: {
      type: String,
      required: [true, "please provide date time"],
    },
    qualification: {
      type: String,
      required: [true, "please provide qualification"],
    },
    skills: {
      type: Array,
      required: [true, "please provide candidate skills"],
    },
    resume: { type: String, required: [true, "please provide resume"] },
  },
  jobDiscription: {
    purpouse: { type: String, required: [true, "please provide purpouse"] },
    roleResponsiblity: {
      type: String,
      required: [true, "please provide purpouse"],
    },
  },
  scoreCard: { type: Array },
  interViewedBy: { type: Object },
  interviewPanel: {
    panelistName: {
      type: Array,
      require: [true, "please provide at least one panelist name"],
    },
  },
});

interviewData.pre("save", function (next) {
  this.scoreCard = this.basicDeails.skills.map((item) => {
    return {
      skillName: item,
      comment: null,
      score: null,
    };
  });
  this.scoreCard.push({
    skillName: 'Over ALL Score',
    comment: null,
    score: null,
  });
  next();
});

module.exports = mongoose.model("interviewData", interviewData);
