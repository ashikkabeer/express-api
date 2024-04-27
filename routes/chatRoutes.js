const ChatControls = require('../chatroom/chatController');

const router = require('express').Router();


router.post('/create', ChatControls.createRoom);

module.exports = router