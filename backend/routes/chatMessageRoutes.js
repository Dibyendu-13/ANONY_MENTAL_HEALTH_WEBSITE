const express = require('express');
const { sendMessage, getMessages, deleteChatRoom } = require('../controllers/chatMesageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for chat messages
router.post('/message', authMiddleware, sendMessage); // Send a message in a chat room
router.get('/:chatRoomId/messages', authMiddleware, getMessages); // Get all messages for a chat room
router.delete('/:chatRoomId', authMiddleware, deleteChatRoom); // Delete a chat room

module.exports = router;
