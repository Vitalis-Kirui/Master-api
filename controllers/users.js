const User = require("../models/user");
const bcrypt = require("bcryptjs");

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
                  res
                    .status(201)
                    .json({ message: "User registered successfully" });
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

module.exports ={
    registerUser
}