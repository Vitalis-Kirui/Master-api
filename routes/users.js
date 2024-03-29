const express = require('express');
const router = express.Router();
const usercontrollers = require('../controllers/users');

// Registering new users
router.post('/register', usercontrollers.registerUser);

// Login user
router.post('/login', usercontrollers.loginUser);

module.exports = router;