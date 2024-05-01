const { User } = require("../schema/user");
const jwt = require("jsonwebtoken");
const UserServices = require("./userServices");
class UserControls {
  static updateCoverPicture = async (req, res) => {
    const response = await UserServices.updateCoverPictureService();
  };
  static updateProfilePicture = async (req, res) => {
    const username = await UserServices.getUsernameFromParams(req);
    return res.redirect(`user/${username}/edit/profile`);
  };
  static updateProfile = async (req, res) => {
    return await UserServices.updateProfileService();
  };
  static getUsernameFromToken = async (req, res) => {
    const data = await UserServices.getUserFromToken(req);
    return res.send(data);
  };
  static renderEdit = async (req, res, template) => {
    const username = await UserServices.getUsernameFromParams(req);
    if (template === "editProfile") {
      const college = await collegeServices.getAllCollege();
      return res.render(template, { username, college });
    }
    return res.render(template, { username, loggedIn: true });
  };
  static getMentorsName = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1];
    console.log('getmentors', token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const department = decoded.user.department;
    const response = await UserServices.getMentorsNameService(department);
    return res.send(response);
  };

  static userInfo = async (req, res) => {
    const response = await UserServices.userInfoService(req);
    const isAuthorized = response.isAuthorized;
    const user = response.user;
    return res.render("userProfile", { isAuthorized, user, loggedIn: true });
  };
}

module.exports = UserControls;
