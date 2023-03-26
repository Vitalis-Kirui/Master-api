const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./config/config");

// Declaring app
const app = express();

// Using cors
app.use(cors());

// Using bodyParser
app.use(bodyParser.json());

// Connecting to the database
mongoose
  .connect(config.dbConnectionString)
  .then(() => {
    // Port number
    app.listen(3000);

    // Showing connection
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to database");
    console.log(error.message);
  });

// Default link
app.get("/", (req, res) => {
  res.send("Hello from the server");
});
