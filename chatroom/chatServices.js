const Message = require("../schema/message");
const NotificationToken = require("../schema/notificationtokens");
const Chat = require("../schema/chatroom");
class ChatServices {
  static getTokens = async (roomId) => {
    const notificationToken = await NotificationToken.findById(roomId);
    return notificationToken;
  };
  static addTokens = async (fcmTokens, chatroomId) => {
    const response = await NotificationToken.findByIdAndUpdate(chatroomId).push(
      { fcmTokens }
    );
    return response;
  };
  static createRoom = async (
    title,
    description,
    mentor,
    author,
    batch,
    department,
    subject
  ) => {
    const chat = await Chat.create({
      title,
      description,
      mentor,
      author,
      batch,
      department,
      subject,
    });
    return chat;
  };
  static getChatHistory = async (roomId) => {
    const chatRoom = await Chat.findById(roomId);
    const messageIds = chatRoom.message;
    const messages = await Message.find({ _id: { $in: messageIds } });
    return messages;
  };
  static getRooms = async (batch, department) => {
    let chat;
    if (!batch) {
      chat = await Chat.find({ department: department }).sort({
        createdAt: -1,
      });
    } else {
      chat = await Chat.find({ batch: batch, department: department }).sort({
        createdAt: -1,
      });
    }
    return chat;
  };
}

module.exports = ChatServices;
