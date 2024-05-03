const { User } = require("../schema/user");
const jwt = require("jsonwebtoken");
const UserServices = require("./userServices");
const Course = require("../schema/subject");
class UserControls {
  static addSubjects = async (req, res) => {
    const response = await Course.create(req.body);
    console.log(response);
    return res.send(response);
  };
  static getUsernameFromToken = async (req, res) => {
    const data = await UserServices.getUserFromToken(req);
    return res.send(data);
  };

  static getSubjects = async (req, res) => {
    console.log("in the getSubjects", req.user.department);
    const response = await Course.find({ name: req.user.department });
    console.log(response);
    return res.send(response);
  };
  static getMentorsName = async (req, res) => {
    const department = req.user.department;
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
