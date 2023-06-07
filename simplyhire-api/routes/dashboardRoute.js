const express = require("express");
const routes = express.Router();
const dashboardControler = require("../controlers/dashboardControler");

routes.get("/home", dashboardControler.home);
routes.get("/interviews", dashboardControler.interviews);
routes.get("/allPanelists", dashboardControler.allPanelists);
routes.put("/addnew", dashboardControler.addNew);
routes
  .get("/fullview/:id", dashboardControler.fullView)
  .put("/fullview/:id", dashboardControler.fullView);

module.exports = routes;