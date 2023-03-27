const express = require('express');
const router = express.Router();
const Comment = require('../controllers/comments');

// Post a new comment
router.post('/create-comment', Comment.makeComment);

module.exports = router;