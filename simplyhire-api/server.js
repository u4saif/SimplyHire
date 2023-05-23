const express = require("express");
const colors = require("../simplyhire-api/utilities/consolColors");
const dotenv = require("dotenv");
const connectDB = require("../simplyhire-api/configs/dbConnection");
const app = express();
const { generateToken, verifyToken } = require("./utilities/authToken");
const {
  authMiddleware,
} = require("../simplyhire-api/middleware/jwtmiddleware");
const PORT = process.env.PORT || 5000;
const authRoutes = require("../simplyhire-api/routes/authRoute");
const {
  errorHandler,
} = require("../simplyhire-api/middleware/errorMiddleware");

/**
 * Configure ENV Path
 */
dotenv.config({ path: "./configs/config.env" });

/**
 * Database Conection
 */
connectDB();
app.use(express.json());

/**
 * App Routes
 */
app.use("/api/v1/auth", authRoutes);

/**
 * Use the ErrorHandler to catch app wise Errors
 */
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `🚀🚀 Server running at 🚨PORT: ${PORT} with ProcessID: ${process.pid}`.info
  );
});
