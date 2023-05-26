const express = require("express");
const routes = express.Router();
const auth = require("../controlers/authControler");

routes.post("/login", auth.login);
routes.post("/register",auth.register);
routes.post("/refresh",auth.refreshToken);

module.exports = routes;