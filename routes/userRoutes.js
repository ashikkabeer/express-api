var express = require('express');
const tryCatch = require('../util/tryCatch');
var router = express.Router();
// var UserControls = require('../controllers/userControl');
const UserControls = require('../user/userControl');

// router.use(authMiddlewares.isAuthenticated);
router.get('/me', tryCatch(UserControls.getUsernameFromToken)); //get userinfo
router.get('/:username', tryCatch(UserControls.userInfo)); //get userinfo

module.exports = router;
