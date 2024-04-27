const { Schema, model } = require("mongoose");
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  authorUsername: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Post = model("Post", postSchema);
module.exports = Post;
