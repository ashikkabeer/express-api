const ChatControls = require('../chatroom/chatController');

const router = require('express').Router();


router.post('/create', ChatControls.createRoom);
router.get('/get', ChatControls.getRooms);
router.post('/tokens',ChatControls.addTokens);
router.get('/tokens/:roomId',ChatControls.getTokens);
router.get('/:roomId',ChatControls.getChatHistory);


module.exports = router