const express = require("express");
const colors = require("../simplyhire-api/utilities/consolColors");
const dotenv = require("dotenv");
const connectDB = require("../simplyhire-api/configs/dbConnection");
const app = express();
const {generateToken, verifyToken} = require("./utilities/authToken");
const {authMiddleware} = require("../simplyhire-api/middleware/jwtmiddleware");
const PORT = process.env.PORT || 5000;
const authRoutes = require("../simplyhire-api/routes/authRoute")
//*******Configure ENV Path**********//
dotenv.config({path:'./configs/config.env'})

//*******Database Conection**********//
connectDB();
app.use(express.json());

console.log(generateToken());
app.use("/auth",authRoutes);

app.listen(PORT, () => {
  console.log(
    `🚀🚀 Server running at 🚨PORT: ${PORT} with ProcessID: ${process.pid}`.info
  );
});
