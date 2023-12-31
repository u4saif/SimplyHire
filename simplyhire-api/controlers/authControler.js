const bcrypt = require("bcryptjs");
const {
  generateToken,
  verifyToken,
  decodeToken,
} = require("../utilities/authToken");
const users = require("../models/usersModel");
const ErrorResponse = require("../utilities/errorResponse");
const { authSchema, authRegisterSchema } = require("../utilities/validationSchema");
/**
 * @desc   Register user
 * @route  POST /api/v1/auth/register
 * @access Public
 */

const register = async (req, res, next) => {
  try {
    const validInput = await authRegisterSchema.validateAsync(req.body);
    const userData = await users(req.body);
    const result = await userData.save();
    const { token, refToken } = {
      ...generateToken({ username: req.body.username , id :  result['_id']}),
    };
    res.status(201).json({ token: "Bearer " + token, refToken });
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
      const { token, refToken } = {
        ...generateToken({ username: req.body.username, id: getuser._id }),
      };
      res.status(201).json({ token: "Bearer " + token, refToken });
    } else {
      res.status(403).json({ message: "Invalid username/password." });
    }
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

/**
 * @desc   Verify Refresh token and issue new access Token
 * @route  POST /api/v1/auth/refresh
 * @access Private
 */

const refreshToken = async (req, res, next) => {
  const reftoken = req.body.refToken;
  try {
    const isValid = verifyToken(reftoken, true);
    if (!isValid)
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    const { token, refToken } = {
      ...generateToken({ username: req.body.username }),
    };
    res.status(201).json({ token: "Bearer " + token, refToken });
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

/**
 * @desc   Verify Unique User
 * @route  GET /api/v1/auth/refresh/:check?username
 * @access Private
 */

const uniqueUser = async (req, resp, next) => {
  try {
    const getuser = await users.findOne({ username: req.query.username });
    if (!getuser) {
      resp.status(200).json({ usernameExist: false });
    } else {
      resp.status(200).json({ usernameExist: true });
    }
  } catch (error) {
    return next(new ErrorResponse("Bad request", 402));
  }
};

module.exports = {
  login,
  register,
  refreshToken,
  uniqueUser
};
