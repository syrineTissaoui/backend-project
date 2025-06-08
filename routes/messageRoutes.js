// routes/message.routes.js
const express =require( 'express');
const messageController=require( '../controllers/messageController.js');
const authMiddleware = require("../middleware/authMiddleware"); 
const Message =require( "../models/message.js");

const router = express.Router();

// POST /api/messages - Créer un message
router.post('/', messageController.createMessage);

// GET /api/messages - Obtenir tous les messages
router.get('/all', messageController.getAllMessages);

// GET /api/messages/:id - Obtenir un message par ID
router.get('/:id', messageController.getMessageById);

// DELETE /api/messages/:id - Delete un message par ID
router.delete('/:id', messageController.deleteMessage);
router.get('/', authMiddleware, messageController.getDiscussion);
router.post('/message', authMiddleware, messageController.addMessage);
// routes/messageRoutes.js
router.post('/:id/reply', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const { id: userId, role = 'client' } = req.user || {};

    if (!reply || typeof reply !== 'string') {
      return res.status(400).json({ error: 'Reply content is required' });
    }

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // ✅ Just push the reply — DO NOT create a new message
    message.replies.push({
      sender: role,
      content: reply,
      createdAt: new Date()
    });

    await message.save(); // ✅ This should NOT fail if message is valid
    res.status(200).json(message);
  } catch (err) {
    console.error('❌ Error replying to message:', err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});





module.exports = router;
