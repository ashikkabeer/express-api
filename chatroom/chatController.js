const Chat = require("../schema/chatroom");
const Message = require("../schema/message");

// create a chatroom
class ChatControls {
    static createRoom = async (req, res) => {
        try {
            const { title, description, mentor, author, batch, department, subject } = req.body;
            const chat = await Chat.create({ title, description, mentor, author, batch, department, subject });
            res.status(201).json({ chat });
        } catch (error) {
            console.error("Error creating chatroom:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ChatControls;