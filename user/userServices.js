const authServices = require("../auth/authServices");
const CloudServices = require("../cloud/cloudServices");
const UserModels = require("../models/userModels");
const jwt = require("jsonwebtoken");
const { User } = require("../schema/user");
class UserServices {
  static getUsernameFromParams = (req) => {
    return req.params.username;
  };
  static getMentorsNameService = async (department) => {
    const allusers = await User.find();
    console.log(allusers);
    const mentors = await User.find({
      department: department,
      role: "faculty",
    });
    const res = mentors.map((mentor) => {
      return {
        name: mentor.name,
        username: mentor.username,
        id: mentor._id,
      };
    });
    console.log(res);
    return res;
  };
  static getUserFromToken = async (req) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const id = await this.getUserByUsername(decoded.user.username);
    return {
      username: decoded.user.username,
      role: decoded.user.role,
      userId: id._id,
    };
  };

  updateProfileService = async () => {};
  static updatePostList = async (authorId, tweetDataId) => {
    await UserModels.findUserByIdAndUpdatePostList(authorId, tweetDataId);
    await UserModels.findUserByIdAndUpdatePostList(authorId, tweetDataId);
  };
  static getUserByUsername = async (username) => {
    return await UserModels.findUserByUsername(username);
  };
  static userInfoService = async (req) => {
    const username = req.params.username;
    let userFromDb = await UserModels.findUserByUsername(username);
    const user = {
      name: userFromDb.name,
      username: userFromDb.username,
      collegeId: userFromDb.collegeId,
      collegeName: userFromDb.collegeName,
      posts: userFromDb.posts,
    };
    const isAuthorized = await authServices.isAuthorized(req, username);
    return { isAuthorized, user };
  };
}

module.exports = UserServices;
