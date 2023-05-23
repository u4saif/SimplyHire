const { verifyToken } = require("../utilities/authToken");
const ErrorResponse = require("../utilities/errorResponse");

const authMiddleware = (req, re, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return next(new ErrorResponse("Not authorized to access this route", 401));

  try {
    const isavalid = verifyToken(token);
    req.headers["user"] = isavalid;
    isavalid
      ? next()
      : next(new ErrorResponse("Not authorized to access this route", 401));
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

module.exports = {
  authMiddleware,
};
