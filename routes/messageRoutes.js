// routes/message.routes.js
const express =require( 'express');
const messageController=require( '../controllers/messageController.js');

const router = express.Router();

// POST /api/messages - Créer un message
router.post('/', messageController.createMessage);

// GET /api/messages - Obtenir tous les messages
router.get('/', messageController.getAllMessages);

// GET /api/messages/:id - Obtenir un message par ID
router.get('/:id', messageController.getMessageById);

// DELETE /api/messages/:id - Delete un message par ID
router.delete('/:id', messageController.deleteMessage);


module.exports = router;
