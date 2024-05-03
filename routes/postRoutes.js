const express = require("express");
const Multer = require("multer");

const router = express.Router();
const PostControls = require("../post/postControl");
const authMiddlewares = require("../middlewares/authMiddleware");
const app = express();
const cors = require("cors");
app.use(cors());
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 50, // 5 MB
  },
});
const tryCatch = require("../util/tryCatch");
router.use(cors());
router.get(
  "/",
  authMiddlewares.isAuthenticated,
  tryCatch(PostControls.retrieveAll)
);
router.post(
  "/upload",
  multer.single("image"),
  authMiddlewares.isAuthenticated,
  tryCatch(PostControls.create)
);
router.post(
  "/:postId/like",
  authMiddlewares.isAuthenticated,
  tryCatch(PostControls.likePost)
);
module.exports = router;
