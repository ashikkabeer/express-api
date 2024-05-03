const router = require("express").Router();

const EventControls = require("../event/eventControl");
const authMiddlewares = require("../middlewares/authMiddleware");
router.post(
  "/create",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isFaculty,
  EventControls.create
);
router.get("/", authMiddlewares.isAuthenticated, EventControls.get);
router.delete(
  "/:id",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isFaculty,
  EventControls.delete
);
router.post(
  "/:eventId/interest",
  authMiddlewares.isAuthenticated,
  EventControls.interested
);
module.exports = router;
