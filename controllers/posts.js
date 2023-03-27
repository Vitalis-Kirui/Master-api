const Post = require("../models/post");

const createPost = async (req, res) => {
  const { caption } = req.body;
  let { image } = req.body;

  // Check if image is provided, set it to null otherwise
  if (!image) {
    image = null;
  }

  // Handle file upload
  if (req.file) {
    image = req.file.path;
  }

  try {
    const post = new Post({ caption, image });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { 
    createPost
 };
