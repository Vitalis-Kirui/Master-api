const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require('./comment')

const postSchema = new Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    comments: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;
