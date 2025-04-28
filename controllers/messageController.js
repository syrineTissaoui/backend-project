// controllers/message.controller.js
const Message =require( "../models/message.js");

// Créer un message
exports.createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du message" });
  }
};

// Obtenir tous les messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des messages" });
  }
};

// Obtenir un message par ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message non trouvé" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du message" });
  }
};
exports.deleteMessage = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMessage = await Message.findByIdAndDelete(id);
  
      if (!deletedMessage) {
        return res.status(404).json({ error: "Message non trouvé" });
      }
  
      res.status(200).json({ message: "Message supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression du message" });
    }
  };
