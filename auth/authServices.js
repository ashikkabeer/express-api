require("dotenv").config();
const bcrypt = require("bcrypt");
const { validateUser } = require("../util/dataValidation/validation");
const jwt = require("jsonwebtoken");
const UserModels = require("../models/userModels");

class authServices {
  static isAuthorized = async (req, username) => {
    if (req.session.user.username === username) {
      return true;
    }
    return false;
  };

  //check if the username in the token is same as the username given
  static isAuthorizedToken = async (req, username) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.username === username) {
      return true;
    }
    return false;
  };

  static loginService = async (req) => {
    const user = await UserModels.findUserByUsername(req.body.username);
    await this.comparePassword(req.body.password, user.password);
    
    const token = await this.signToken({
      username: user.username,
      role: user.role,
      batch: user.batch,
      department: user.department,
    });
    return token;
  };

  static signUpService = async (userData) => {
    const salt_rounds = parseInt(process.env.SALT_ROUND);
    const hashedPassword = await this.hashPassword(userData.password, 10);
    let users = {
      name: userData.name,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      gender: userData.gender,
      role: userData.role,
    };

    users = {
      name: userData.name,
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      gender: userData.gender,
      role: userData.role,
      batch: userData.batch,
      department: userData.department,
    };

    const user = await UserModels.createUser(users);
    if (!user) {
      const error = new Error("Signup Failed");
      error.stack = 404;
      throw error;
    }

    const token = await this.signToken({
      username: users.username,
      role: users.role,
      batch: users.batch,
      department: users.department,
    });
    return token;
  };

  static hashPassword = async (password, saltRounds) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  static comparePassword = async (givenPassword, hashedPassword) => {
    const passwordMatch = await bcrypt.compare(givenPassword, hashedPassword);
    if (!passwordMatch) {
      const error = new Error("Password Mismatch. Try again.");
      error.status = 404;
      throw error;
    }
    return passwordMatch;
  };

  static signToken(user) {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }
}

module.exports = authServices;
