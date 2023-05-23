const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { ...user };
  const secret = process.env.TOKEN_SECRET;
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secret, options);
  return token;
};

const decodeToken = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

const verifyToken = (token) => {
  const isValidToken = jwt.verify(token, process.env.TOKEN_SECRET);
  return isValidToken
};
module.exports = {
  generateToken,
  decodeToken,
  verifyToken
};
