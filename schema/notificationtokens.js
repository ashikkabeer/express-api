const mongoose = require('mongoose');
// notificationtokens.js


const notificationTokenSchema = new mongoose.Schema({
    chatroomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
        required: true
    },
    fcmTokens: [{
        type: String,
        required: true,
        unique: true
    }]
});

const NotificationToken = mongoose.model('NotificationToken', notificationTokenSchema);

module.exports = NotificationToken;