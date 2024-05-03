// const CloudServices = require("../cloud/cloudServices");
const UserServices = require("../user/userServices");
const PostModels = require("../models/postModels");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const CloudControls = require("../cloud/cloudControl");
const Post = require("../schema/post");
class PostServices {
  static likePostService = async (id) => {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    return post;
  };
  static createPostService = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("No token provided");
    }

    const parts = authHeader.split(" ");

    if (!parts.length === 2) {
      throw new Error("Token error");
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      throw new Error("Token malformatted");
    }
    if (!req.body.title || !req.body.description) {
      throw new Error("Title and content are required");
    }
    const decodedToken = await jwt.decode(token);
    console.log(decodedToken);
    const user = await UserServices.getUserByUsername(
      decodedToken.user.username
    );

    let data = {
      title: req.body.title,
      description: req.body.description,
      authorId: user._id,
      authorUsername: decodedToken.user.username,
    };
    if (req.file) {
      const url = await CloudControls.uploadImagetoCloud(req.file.buffer);
      console.log("image url in the service fun: ", url);
      data.images = url;
    }
    const post = await PostModels.createPost(data);
    const response = await UserServices.updatePostList(post.authorId, post._id);
    return post;
  };

  static renderAllPostsService = async () => {
    const posts = await PostModels.getAllPosts();
    if (!posts) {
      const error = new Error("Unable to retrieve data");
      error.stack = 404;
      throw error;
    }
    const serializedPosts = posts.map((post) => ({
      id: post._id.toString(), // Convert ObjectId to string
      title: post.title,
      description: post.description,
      image: post.images,
      upvotes: post.upvotes,
      date: post.createdAt.toDateString(),
    }));
    const data = serializedPosts.filter((post) => post !== null);
    return data;
  };
}

module.exports = PostServices;
