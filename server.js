const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const config = require("./config/config");

// Routes
const userroutes = require('./routes/users');
const postroutes = require('./routes/posts');
const commentroutes = require('./routes/comments');

// Declaring app
const app = express();

// Using cors
app.use(cors());

// Using bodyParser
app.use(bodyParser.json());

// Connecting to the database
mongoose
  .connect(config.dbconnectionstring)
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

// Serve static files from the 'images' directory
app.use( express.static(path.join(__dirname, 'images')) );

// Default link
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

// Using user routes
app.use('/users', userroutes)

// Using posts routes
app.use('/posts', postroutes);

// Using comment routes
app.use('/comments', commentroutes);