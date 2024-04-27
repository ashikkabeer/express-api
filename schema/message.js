const { Schema, model } = require("mongoose");
const MessageSchema = new Schema({
  // chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: String, required: true },
  role: { type: String, required: true },
  
});

const Message = model("Message", MessageSchema);

module.exports = Message;
