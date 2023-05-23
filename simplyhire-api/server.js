const express = require("express");
const colors = require("../simplyhire-api/utilities/consolColors");
const dotenv = require("dotenv");
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀🚀 Server running at 🚨PORT: ${PORT} with ProcessID: ${process.pid}`.info
  );
});
