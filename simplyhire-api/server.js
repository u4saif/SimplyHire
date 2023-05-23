const express = require("express");
const colors = require("../simplyhire-api/utilities/consolColors");
const dotenv = require("dotenv");
const dbConnection = require("../simplyhire-api/configs/dbConnection");
const app = express();

const PORT = process.env.PORT || 5000;
//*******Configure ENV Path**********//
dotenv.config({path:'./configs/config.env'})

//*******Database Conection**********//
dbConnection();

app.listen(PORT, () => {
  console.log(
    `🚀🚀 Server running at 🚨PORT: ${PORT} with ProcessID: ${process.pid}`.info
  );
});
