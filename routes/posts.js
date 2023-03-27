const express = require('express');
const router = express.Router();
const postcontrollers = require('../controllers/posts');
const multer = require('multer');

// Configure multer middleware
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../images');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    callback(null, `image-${Date.now()}.${ext}`);
  }
});

const upload = multer({ storage });

// POST /posts - create a new post
router.post('/create-post', upload.single('image'), postcontrollers.createPost);

module.exports = router;