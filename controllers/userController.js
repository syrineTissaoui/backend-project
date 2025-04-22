// controllers/skinTypeController.js
const SkinType = require('../models/skinType');

exports.getAllSkinTypes = async (req, res) => {
  try {
    const skinTypes = await SkinType.find();
    res.status(200).json(skinTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur lors de la récupération des types de peau." });
  }
};
