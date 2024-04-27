const express = require('express');
const Multer = require('multer');

const router = express.Router();
const PostControls = require('../post/postControl');
const authMiddlewares = require('../middlewares/authMiddleware');
const app = express();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 50, // 5 MB
  },
});
const tryCatch = require('../util/tryCatch');

//router.use(authMiddlewares.isAuthenticated);
app.use('/uploads', express.static('uploads'));
router.post('/upload', multer.single('image'), tryCatch(PostControls.create));
router.get('/upload', tryCatch(PostControls.renderUploadForm));
router.get('/:page?', tryCatch(PostControls.retrieveAll));
module.exports = router;
