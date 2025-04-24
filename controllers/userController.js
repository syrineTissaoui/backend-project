// controllers/skinTypeController.js
const SkinType = require('../models/skinType');
const User = require('../models/user');
const Client = require('../models/client');

exports.getAllSkinTypes = async (req, res) => {
  try {
    const skinTypes = await SkinType.find();
    res.status(200).json(skinTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur lors de la récupération des types de peau." });
  }
};

exports.getUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.sendStatus(404);

    const client = await Client.findOne({ userId: user._id });
    const userData = { ...user.toObject(), avatar: client?.avatar };

    res.json(userData); // now includes avatar
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
};
