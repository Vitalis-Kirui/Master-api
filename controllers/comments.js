const Comment = require("../models/comment");
const Post = require("../models/post");

// Creating a new Comment
const makeComment = async (req, res) => {
  try {
    const { body, postId } = req.body;

    // Find the post the comment belongs to
    const post = await Post.findById(postId);

    // Create a new comment
    const comment = new Comment({
      body,
      post: postId,
    });

    // Save the comment to the database
    await comment.save();

    // Add the comment to the post's comments array
    post.comments.push(comment);

    // Save the updated post to the database
    await post.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  makeComment,
};
