require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const cors = require('cors');
const SkinType = require('./models/skinType');
const authenticateToken = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');

const orderRoutes = require('./routes/orderRoutes.js');
const customerRoutes = require('./routes/userRoutes.js');

const insertDefaultSkinTypes = async () => {
  const count = await SkinType.countDocuments();
  if (count === 0) {
    const types = [
      {
        type: "Peau normale",
        description: "Équilibrée, ni trop grasse ni trop sèche, peu de problèmes."
      },
      {
        type: "Peau sèche",
        description: "Peau rugueuse, terne, tiraillements, manque d'hydratation."
      },
      {
        type: "Peau grasse",
        description: "Brillance, pores dilatés, sujette aux imperfections."
      },
      {
        type: "Peau mixte",
        description: "Zone T grasse et joues sèches ou normales."
      },
      {
        type: "Peau sensible",
        description: "Réagit facilement, rougeurs, picotements, démangeaisons."
      }
    ];
    await SkinType.insertMany(types);
    console.log('✅ Types de peau par défaut insérés avec succès.');
  } else {
    console.log('ℹ️ Types de peau déjà présents.');
  }
};

const app = express();
const path = require('path');
// Middlewares globaux
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir les images uploadées statiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', customerRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Lancement de l’app après connexion à MongoDB
connectDB().then(() => {
  insertDefaultSkinTypes();
  app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
});
