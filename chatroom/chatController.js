const Message = require("../schema/message");
const jwt = require("jsonwebtoken");
const Chat = require("../schema/chatroom");
const NotificationToken = require("../schema/notificationtokens");
// create a chatroom
const UserServices = require("../user/userServices");
const { create } = require("hbs");
class ChatControls {
  static getTokens = async (req, res) => {
    try {
      const id = req.params.roomId;
      const notificationToken = await NotificationToken.findById(id);
      res.send({ notificationToken });
    } catch (error) {
      console.error("Error getting tokens:", error);
      res.status(500).json({ error: error.message });
    }
  };
  static addTokens = async (req, res) => {
    try {
      const { fcmTokens, chatroomId } = req.body;
      const response = await NotificationToken.findByIdAndUpdate(
        chatroomId
      ).push({ fcmTokens });
      res.status(201).send({ response });
    } catch (error) {
      console.error("Error adding tokens:", error);
      res.status(500).json({ error: error.message });
    }
  };
  static createRoom = async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const author = decoded.user.username;
      console.log("decoded:", decoded);
      const batch = decoded.user.batch;
      const department = decoded.user.department;

      const { title, description, mentor, subject } = req.body;

      const chat = await Chat.create({
        title,
        description,
        mentor,
        author,
        batch,
        department,
        subject,
      });
      res.status(201).send({ chat });
    } catch (error) {
      console.error("Error creating chatroom:", error);
      res.status(500).json({ error: error.message });
    }
  };
  static getChatHistory = async (req, res) => {
    try {
      const id = req.params.roomId;
      console.log(id);
      const chatRoom = await Chat.findById(id);
      console.log(chatRoom);
      const messageIds = chatRoom.message;
      console.log("messageId:", messageIds);
      const messages = await Message.find({ _id: { $in: messageIds } });
      console.log("messages", messages);
      res.send({ messages: messages });
    } catch (error) {
      console.log("error on getChatHistory", error);
    }
  };
  static getRooms = async (req, res) => {
    try {
      console.log("in the getRooms function");
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const batch = decoded.user.batch;
      const department = decoded.user.department;
      console.log(batch, department);
      let chat;
      if (!batch) {
        chat = await Chat.find({ department: department });
        console.log('no-batch found')
      } else {
        chat = await Chat.find({ batch: batch, department: department }).sort({createdAt:-1});
      }
      res.status(200).json({ chat });
    } catch (error) {
      console.error("Error getting chatrooms:", error);
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ChatControls;
