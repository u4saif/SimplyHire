const resume = require("../models/resumeModel");

/**
 * @desc   Home Page
 * @route  POST /api/v1/resume/new-upload
 * @access Private
 */
const upload = async (req,res,next) =>{
    const { name, fileData, size, type } = req.body;

    try {
        const data = req.body;
        const added = await resume.insertMany(data);
        res.status(201).json({ resume: added });
      } catch (error) {
        next(error);
      }
}

module.exports = {
    upload
}