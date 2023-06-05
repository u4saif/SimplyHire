const { interviewSchema } = require("../utilities/validationSchema");
const  interviewData  = require("../models/interviewModel");
const { decodeToken } = require("../utilities/authToken");

/**
 * @desc   Home Page
 * @route  GET /api/v1/dashboard/home
 * @access Private
 */
const home = (req, res, next) => {
  res.status(200).json(req.body);
};

/**
 * @desc   Add New Interview
 * @route  POST /api/v1/dashboard/addnew
 * @access Private
 */
const addNew = async (req, res, next) => {
  try {
    const data = req.body;
     const validateShema = await interviewSchema.validateAsync(data);
    const added = await interviewData.insertMany(data);
    res.status(200).json({ addInterview: added });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   All interviews upcomming and past interviews
 * @route  GET /api/v1/dashboard/allInterviews
 * @access Private
 */
const interviews = async (req, res, next) => {
  const { username } = decodeToken(
    req.headers.authorization.split(" ")[1] || req.body.token
  );
  const allInterviews = await interviewData.find({
    interviewerUsername: username,
  });
  res
    .status(200)
    .json({ allInterviews, username, totalCount: allInterviews.length });
};

/**
 * @desc   Details analisys of interview with score
 * @route  GET /api/v1/dashboard/fullView/:id
 * @access Private
 */
const fullView = async (req, res, next) => {
  const interviewID = req.params.id;
  const singleInterview = await interviewData.find({ _id: interviewID });
  res.status(200).json({ singleInterview, interviewID });
};

/**
 * @desc   Update Details analisys of interview
 * @route  PUT /api/v1/dashboard/fullView/:id
 * @access Private
 */
const updateView = async (req, res, next) => {
  //Will update the interview Details
  const interviewID = req.params.interviewID;
  const { valueNeedData, interviewerName } = req.body;
  const singleInterview = await interviewData.updateOne(
    { _id: interviewID },
    { $set: { data: valueNeedData, interviewerName } }
  );
  const updatedData = { ...valueNeedData, ...singleInterview.data };
  console.log(updatedData);
  res.status(200).json({ update: singleInterview });
};

module.exports = {
  home,
  addNew,
  interviews,
  fullView,
  updateView,
};
