var express = require("express");
const tryCatch = require("../util/tryCatch");

var router = express.Router();
let authControls = require("../auth/authControl");

router.get("/", (req, res) => {
  res.redirect("/post");
});

router.post("/login", tryCatch(authControls.login));
router.post("/signup", tryCatch(authControls.signUp));
router.get("/logout", tryCatch(authControls.logout));

module.exports = router;
