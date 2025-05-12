// controllers/skinTypeController.js
const SkinType = require('../models/skinType');
const User = require('../models/user');
const Client = require('../models/client');
const bcrypt = require('bcryptjs');
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
console.log('req.body',req.body)
   const { name, email,phone, password, role } = req.body;
 
   try {
     // Check if the user already exists
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ msg: "Utilisateur déjà existe" });
     }
 
     // Hash the password before saving
     const hashedPassword = await bcrypt.hash(password, 10);
 
     // Create new user
     const newUser = new User({
       name,
       email,
       password: hashedPassword,
       phone,
       role,
     });
 console.log('newUser',newUser)
     await newUser.save();
 
     // Generate a JWT token
    
   
   } catch (error) {
     console.error(error);
     res.status(500).json({ msg: "Erreur serveur" });
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