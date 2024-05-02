const ChatServices = require("./chatServices");
class ChatControls {
  static getTokens = async (req, res) => {
    try {
      const id = req.params.roomId;
      const notificationToken = await ChatServices.getTokens(id);
      res.send({ notificationToken });
    } catch (error) {
      console.error("Error getting tokens:", error);
      res.status(500).json({ error: error.message });
    }
  };
  static addTokens = async (req, res) => {
    try {
      const { fcmTokens, chatroomId } = req.body;
      const response = await ChatServices.addTokens(fcmTokens, chatroomId);
      res.status(201).send({ response });
    } catch (error) {
      console.error("Error adding tokens:", error);
      res.status(500).json({ error: error.message });
    }
  };
  static createRoom = async (req, res) => {
    try {
      const response = await ChatServices.createRoom(
        req.body.title,
        req.body.description,
        req.body.mentor,
        req.user.username,
        req.user.batch,
        req.user.department,
        req.body.subject
      );
      res.status(201).send({ response });
    } catch (error) {
      console.error("Error creating chatroom:", error);
      res.status(500).json({ error: error.message });
    }
  };
  static getChatHistory = async (req, res) => {
    try {
      console.log("getChatHistory");
      const id = req.params.roomId;
      console.log("id", id);
      const response = await ChatServices.getChatHistory(id);
      console.log("messages", response);
      res.send({ messages: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  static getRooms = async (req, res) => {
    try {
      const batch = req.user.batch;
      const department = req.user.department;
      const chat = await ChatServices.getRooms(batch, department);
      res.status(200).json({ chat });
    } catch (error) {
      console.error("Error getting chatrooms:", error);
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ChatControls;
