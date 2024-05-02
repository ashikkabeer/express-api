const ChatControls = require("../chatroom/chatController");

const router = require("express").Router();
const authMiddlewares = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddlewares.isAuthenticated,
  ChatControls.createRoom
);
router.get("/get", authMiddlewares.isAuthenticated, ChatControls.getRooms);
router.post("/tokens", authMiddlewares.isAuthenticated, ChatControls.addTokens);
router.get(
  "/tokens/:roomId",
  authMiddlewares.isAuthenticated,
  ChatControls.getTokens
);
router.get(
  "/:roomId",
  authMiddlewares.isAuthenticated,
  ChatControls.getChatHistory
);

module.exports = router;
