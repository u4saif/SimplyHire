const express = require("express");
const routes = express.Router();
// const AuthController = require("../controlers/authControler");

routes.post("/login",(req,res)=>{
    res.status(200).json(req.headers);
});
// routes.post("/register",AuthController.registerNewUser);
// routes.post("/validate",AuthController.verifyToken);

module.exports = routes;