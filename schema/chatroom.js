const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mentor: { type: String, required: true },
  author: { type: String, required: true },
  batch: { type: Number, required: true },
  department: { type: String, required: true },
  subject: { type: String, required: true },
  message: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  userChat: [{ type: Schema.Types.ObjectId, ref: "UserChat" }],
  createdAt: { type: Date, default: Date.now },
});

const Chat = model("Chat", ChatSchema);

module.exports = Chat;
