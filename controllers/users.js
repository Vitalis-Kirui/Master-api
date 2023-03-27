const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Register a new user
const registerUser = (req, res, next) => {
  const {
    names,
    username,
    phonenumber,
    email,
    password,
    confirmpassword,
    subscribe,
  } = req.body;

  // Check if the username is already taken
  User.findOne({ username })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Hash the password and confirm password fields using bcrypt
      bcrypt
        .hash(password, 10)
        .then((hashedpassword) => {
          bcrypt
            .hash(confirmpassword, 10)
            .then((hashedconfirmpassword) => {
              // Create a new user object with the hashed passwords
              const newUser = new User({
                names,
                username,
                phonenumber,
                email,
                password: hashedpassword,
                confirmpassword: hashedconfirmpassword,
                subscribe,
              });

              // Save the new user to the database
              newUser
                .save()
                .then((result) => {
                  res.status(201).json({
                    message: "User registered successfully",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({ message: "Error registering user" });
                });
            })
            .catch((error) => {
              console.log(error);
              res
                .status(500)
                .json({ message: "Error hashing confirm password" });
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Error hashing password" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error checking username" });
    });
};

// Login user
const loginUser = (req, res, next) => {
  const { username, password } = req.body;

  // Find the user with the provided username
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json({ message: "Authentication failed" });
          }

          // Create a JWT token for the authenticated user
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            config.secretword,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "Authentication successful",
            token,
            expiresIn: 3600,
            user: {
              userId: user._id,
              name: user.names,
              username: user.username,
              email: user.email,
              phoneNumber: user.phonenumber,
              subscribe: user.subscribe,
            },
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Error comparing passwords" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error finding user" });
    });
};

module.exports = {
  registerUser,
  loginUser,
};
