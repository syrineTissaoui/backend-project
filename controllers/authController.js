const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Client = require('../models/client');
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

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
      role,
    });

    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY, // Use a real secret key in production
      { expiresIn: "1h" }
    );

    // Send response with the user data and token
    res.json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        joined: newUser.joined
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
   

  res.json({ token, user: { id: user._id, name: user.name, email: user.email , role:user.role , joined:user.joined , avatar:user.photo } });
};

exports.updateUtilisateur = async (req, res) => {
  try {
    console.log(' req.body', req.body)
    console.log(' req.file', req.file)

    const { nom, email, password  } = req.body;
    const updates = {};

    if (nom) updates.name = nom;
    if (email) updates.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (req.file) {
      updates.photo = req.file.filename;
    }
console.log('updates',updates)
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
console.log('updatedUser',updatedUser)
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.status(200).json({
      message: 'Utilisateur mis à jour avec succès',
      photo: updatedUser.photo
    });
  } catch (error) {
    console.error('Erreur update utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
