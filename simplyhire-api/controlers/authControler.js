const bcrypt = require("bcryptjs");
const {
  generateToken,
  verifyToken,
  decodeToken,
} = require("../utilities/authToken");
const users = require("../models/usersModel");
const {authSchema} = require("../utilities/validationSchema");
/**
 * @desc   Register user
 * @route  POST /api/v1/auth/register
 * @access Public
 */

const register = async (req, res, next) => {
  try {
    const userData = await users(req.body);
    const result = await userData.save();
    const token = "Bearer " + generateToken({ username: req.body.username });
    res.status(201).json({ token });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

/**
 * @desc   Login user
 * @route  POST /api/v1/auth/login
 * @access Public
 */
const login = async (req, res, next) => {
  try {
    const validInput = await authSchema.validateAsync(req.body);
    const getuser = await users.findOne({ username: req.body.username });
    const compare =
      (getuser && bcrypt.compareSync(req.body.password, getuser.password)) ||
      false;
    if (compare) {
      const token = "Bearer " + generateToken({ username: req.body.username });
      res.status(200).json({ Token: token });
    } else {
      res.status(403).json({ message: "Invalid username/password." });
    }
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

module.exports = {
  login,
  register,
};
