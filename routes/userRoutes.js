var express = require("express");
const tryCatch = require("../util/tryCatch");
var router = express.Router();
// var UserControls = require('../controllers/userControl');
const UserControls = require("../user/userControl");
const authMiddlewares = require("../middlewares/authMiddleware");

// router.use(authMiddlewares.isAuthenticated);
router.get(
  "/me",
  authMiddlewares.isAuthenticated,
  tryCatch(UserControls.getUsernameFromToken)
); //get userinfo
router.get(
  "/mentors",
  authMiddlewares.isAuthenticated,
  tryCatch(UserControls.getMentorsName)
); //get mentors
router.get(
  "/:username",
  authMiddlewares.isAuthenticated,
  tryCatch(UserControls.userInfo)
); //get userinfo
router.get(
  "/subjects",
  authMiddlewares.isAuthenticated,
  UserControls.getSubjects
);
router.post("/subject", UserControls.addSubjects);

module.exports = router;
