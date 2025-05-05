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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // ou User.findAll() pour Sequelize
    res.status(200).json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log("Corps de la requête reçue:", req.body); // ← Ajoute ceci

    const newUser = new User(req.body); // ou User.create(req.body)
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Erreur ajout', error: err.message });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Erreur modification', error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(400).json({ message: 'Erreur suppression', error: err.message });
  }
};