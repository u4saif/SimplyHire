const express = require("express");
const colors = require("../simplyhire-api/utilities/consolColors");
const dotenv = require("dotenv");
const connectDB = require("../simplyhire-api/configs/dbConnection");
const app = express();
const cors = require('cors');
const { authMiddleware } = require("./middleware/authMiddleware");
const PORT = process.env.PORT || 5000;
const authRoutes = require("../simplyhire-api/routes/authRoute");
const dashboardRoutes = require("../simplyhire-api/routes/dashboardRoute");
const resumeRoutes = require("../simplyhire-api/routes/resumeRoutes");
const {
  errorHandler,
} = require("../simplyhire-api/middleware/errorMiddleware");

/**
 * COnfigure CORSS
 */
app.use(cors({
    origin: ['http://localhost:4200','http://localhost:3000']
}));

/**
 * Configure ENV Path
 */
dotenv.config({ path: "./configs/config.env" });

/**
 * Database Conection
 */
connectDB();
app.use(express.json({limit: '25mb'}));

/**
 * App Routes
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", authMiddleware, dashboardRoutes);
app.use("/api/v1/resume", authMiddleware, resumeRoutes);

/**
 * Use the ErrorHandler to catch app wise Errors
 */
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `🚀🚀 Server running at 🚨PORT: ${PORT} with ProcessID: ${process.pid}`.info
  );
});
