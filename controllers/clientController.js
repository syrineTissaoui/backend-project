const Client = require('../models/client');

exports.updateSkinForm = async (req, res) => {
  try {
    const { skinType, message ,sensitivity } = req.body;
    const photo = req.file?.path;
 const concerns = JSON.parse(req.body.concerns); 
    // Sécuriser la récupération de l'utilisateur connecté
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    console.log("📩 Données reçues :", req.body);
    console.log("🖼️ Chemin photo reçu :", photo);

    // Recherche du client lié à cet utilisateur
    let client = await Client.findOne({ userId });

    if (client) {
      // Mise à jour des informations existantes
      client = await Client.findOneAndUpdate(
        { userId },
        {
          skinType,
          concerns,
          sensitivity,
          message,
          ...(photo && { photo })
        },
        { new: true }
      );

      console.log("✅ Client mis à jour :", client);
      return res.json(client);
    } else {
      // Création d'un nouveau client si non existant
      const newClient = new Client({
        userId,
        skinType,
        concerns,
        message,
        ...(photo && { photo })
      });

      await newClient.save();
      console.log("🆕 Nouveau client créé :", newClient);
      return res.status(201).json(newClient);
    }
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour/création du client :", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
  
};
exports.getSkinFormByUser = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Non authentifié" });

    const client = await Client.findOne({ userId });
    if (!client) return res.status(404).json({ error: "Profil non trouvé" });

    res.status(200).json(client);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du profil :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};