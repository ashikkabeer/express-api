// const CloudServices = require("../cloud/cloudServices");
const UserServices = require("../user/userServices");
const PostModels = require("../models/postModels");
const collegeServices = require("../college/collegeServices");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const CloudServices = require("../cloud/cloudServices")
class PostServices {
  static  createPostService = async (req, res) => {
    /*
    if (!req.session || !req.session.user || !req.session.user._id) {
      throw new Error('user not authenticated');
    }
    */
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
      const randomUUID = uuidv4().replace(/-/g, '');
      // -----------------------------------
      const imagePath = path.join(
        "C:/Users/ashik/Desktop/mini-project/frontend/public",
        randomUUID+".jpg"
      );
      fs.writeFileSync(imagePath, req.file.buffer);
      const imageUrl = imagePath;
      data.images = imageUrl;
      // data.images = randomUUID;

    }
    const post = await PostModels.createPost(data);
    const response = await UserServices.updatePostList(post.authorId, post._id);
    await collegeServices.updatePostIdsInCollegeDB(
      post.authorCollegeId,
      post._id
    );
    return response;
  };

  static renderAllPostsService = async (req) => {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   throw new Error("No token provided");
    // }

    // const parts = authHeader.split(" ");

    // if (!parts.length === 2) {
    //   throw new Error("Token error");
    // }

    // const [scheme, token] = parts;

    // if (!/^Bearer$/i.test(scheme)) {
    //   throw new Error("Token malformatted");
    // }
    const posts = await PostModels.getAllPosts();
    if (!posts) {
      const error = new Error("Unable to retrieve data");
      error.stack = 404;
      throw error;
    }
    const formattedPosts = await Promise.all(
      posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          description: post.description,
          image: post.images,
          authorId: post.authorId,
          authorUsername: post.authorUsername,
          upvotes: post.upvotes,
          views: post.views,
          date: post.createdAt,
        };
      })
    );
    const serializedPosts = posts.map(post => ({
      id: post._id.toString(), // Convert ObjectId to string
      title: post.title,
      description: post.description,
      image: post.images,
      upvotes: post.upvotes,
    }));
    const data = serializedPosts.filter((post) => post !== null);
    return data;
  };
}

module.exports = PostServices;
