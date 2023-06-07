const express = require("express");
const routes = express.Router();
const resumeControler = require("../controlers/resumeControler");

routes.post("/new-upload", resumeControler.upload);
// routes.get("/resume/:id", dashboardControler.getOneWithID);


module.exports = routes;