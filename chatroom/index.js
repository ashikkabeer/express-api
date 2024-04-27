const app = require("express")();
import Chat from "../schema/chatroom";
const { io } = require("../app");

io.on("connection", (socket) => {
  console.log("A user connected");
});


module.exports = io