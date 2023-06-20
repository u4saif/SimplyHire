const resume = require("../models/resumeModel");
const UploadModel = require("../models/uploadModel");
/**
 * @desc   Resume  Data 
 * @route  POST /api/v1/resume/new-upload
 * @access Private
 */
const upload = async (req, res, next) => {
  try {
    const data = req.body;
    const added = await resume.insertMany(data);
    res.status(201).json({ resume: added });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Resume  Finder 
 * @route  POST /api/v1/resume/uploaded/:id
 * @access Private
 */
const getOneWithID = async (req, res, next) => {
  try {
    const resumeId = req.params.id;
    const resumeData = await UploadModel.find({ _id: resumeId });
    res.status(200).json({ resume: resumeData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  getOneWithID,
};
