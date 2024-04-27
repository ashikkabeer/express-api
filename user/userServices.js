const authServices = require('../auth/authServices');
const CloudServices = require('../cloud/cloudServices');
const UserModels = require('../models/userModels');


class UserServices {
  static getUsernameFromParams = (req) => {
    return req.params.username;
  };

  /* Anonymous users: no need for profile photo */
  
  // updateCoverPictureService = async () => {};
  // updateProfilePictureService = async (req) => {
  //   const username = this.getUsernameFromParams(req);
  //   const imageUrl = await CloudServices.uploadImagetoCloud(req.file.buffer);
  //   const user =await UserModels.findUserByIdAndUpdateProfilePhoto(
  //     username,
  //     imageUrl
  //   );
  //   return user;
  // };

  updateProfileService = async () => {};
  static updatePostList = async (authorId, tweetDataId) => {
    await UserModels.findUserByIdAndUpdatePostList(authorId, tweetDataId);
    await UserModels.findUserByIdAndUpdatePostList(authorId, tweetDataId);
  };
static getUserByUsername = async (username) => {
    return await UserModels.findUserByUsername(username);
  };
  static userInfoService = async (req) => {
    const username = this.getUsernameFromParams(req);
    let userFromDb = await UserModels.findUserByUsername(username)
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
