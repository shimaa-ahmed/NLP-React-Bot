// 1. Import dependencies
console.log("Begin");
const express = require("express");
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin: *");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/index", (req, res) => {
  res.send("Hello World!");
});
require("dotenv").config();

// 1.1 Allow parsing on request bodies
app.use(express.json());

// 2. Import routes for api
const watsonRoutes = require("./routes/api/watson");
// 2.1 Direct requests to /api/watson to Watson Routes
app.use("/api/watson", watsonRoutes);

// 3. Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server listening on port ", port);
});
