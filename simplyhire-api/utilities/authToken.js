const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { ...user };
  const secret = process.env.TOKEN_SECRET;
  const options = { expiresIn: "24h" };
  const token = jwt.sign(payload, secret, options);
  const refToken = jwt.sign(payload, process.env.TOKEN_REFRESH_SECRET, { expiresIn: "30d" });
  return {token,refToken};
};

const decodeToken = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

const verifyToken = (token,refToken=false) => {
  const secret = (refToken) ? process.env.TOKEN_REFRESH_SECRET : process.env.TOKEN_SECRET
  const isValidToken = jwt.verify(token, secret);
  return isValidToken
};
module.exports = {
  generateToken,
  decodeToken,
  verifyToken
};
